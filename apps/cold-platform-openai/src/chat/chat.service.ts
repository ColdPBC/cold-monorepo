import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, CacheService, ColdRabbitService, DarklyService, PrismaService } from '@coldpbc/nest';
import { PineconeService } from '../pinecone/pinecone.service';
import { ConfigService } from '@nestjs/config';
import { PromptsService } from '../prompts/prompts.service';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { find, has, set } from 'lodash';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { RecordMetadata, ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { FPSession, FreeplayService } from '../freeplay/freeplay.service';
import { FormattedPrompt } from 'freeplay/thin';

@Injectable()
export class ChatService extends BaseWorker implements OnModuleInit {
  openAIapiKey: string;
  prompts: PromptsService;

  constructor(
    private readonly config: ConfigService,
    private readonly pc: PineconeService,
    private readonly prisma: PrismaService,
    private readonly darkly: DarklyService,
    private cache: CacheService,
    @InjectQueue('openai') private queue: Queue,
    private rabbit: ColdRabbitService,
    private fp: FreeplayService,
  ) {
    super(ChatService.name);
    this.openAIapiKey = this.config.getOrThrow('OPENAI_API_KEY');
  }

  async onModuleInit() {}

  async resetAIResponses(user, survey: any, organization: any) {
    this.logger.info(`✅ Started processing survey ${survey.definition.title}`, {
      survey: survey.definition.title,
      user,
      survey_name: survey.definition.title,
      organization: { id: organization.id, name: organization.name, display_name: organization.display_name },
    });
    const surveyData = await this.prisma.survey_data.findFirst({
      where: { survey_definition_id: survey.id, organization_id: organization.id },
    });

    if (!surveyData) {
      return;
    }

    // Iterate over each section
    for (const sectionKey in surveyData.data['sections']) {
      const section = surveyData.data['sections'][sectionKey];

      // Iterate over each follow_up item in the section
      for (const followUpKey in section.follow_up) {
        const followUpItem = section.follow_up[followUpKey];

        // If the followUpItem has an 'ai_response' property, set it to null
        if ('ai_response' in followUpItem) {
          delete followUpItem.ai_response;
          delete followUpItem.ai_answered;
          delete followUpItem.ai_attempted;
        }
      }
    }

    await this.prisma.survey_data.update({
      where: { id: surveyData.id },
      data: { data: surveyData.data },
    });
  }

  async extractTextFromDocument(qualifyingDocs: ScoredPineconeRecord<RecordMetadata>[]) {
    // Use a map to deduplicate matches by URL
    const docs = Array.isArray(qualifyingDocs)
      ? qualifyingDocs.map(match => {
          const item = {
            name: match.metadata['file_name'],
            text: match.metadata.chunk as string,
          };
          if (typeof item.text === 'string') {
            try {
              item.text = JSON.parse(item.text);
            } catch (e) {
              this.logger.warn(`Unable to parse snippet to Object due to trunacting`, { ...e, item });
            }

            return JSON.stringify(item);
          }
        })
      : [];

    // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
    return docs.join('\n\n').substring(0, 3000);
  }

  async askQuestion(indexName: string, question: any, company_name: string, user: AuthenticatedUser, session): Promise<any> {
    try {
      // Get Chat History
      let messages = (await this.cache.get(`openai:thread:${user.coldclimate_claims.id}`)) as ChatCompletionMessageParam[];

      if (!messages) {
        messages = [] as ChatCompletionMessageParam[];
      }

      const context: any = [];
      const openai = new OpenAI({
        organization: this.config.getOrThrow('OPENAI_ORG_ID'),
        apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
      });

      const { rephrased_question, docs } = await this.getDocumentContent(messages, question, openai, indexName, session, user, context);

      const vars = {
        component_prompt: (await this.prompts.getComponentPrompt(question)) || '',
        context: JSON.stringify(context),
        question: question.prompt,
      };
      const sanitized_base = (await this.fp.getPrompt('survey_question_prompt', vars, true)) as FormattedPrompt;

      const start = new Date();

      const response = await openai.chat.completions.create({
        response_format: { type: 'json_object' },
        model: await this.darkly.getStringFlag('dynamic-gpt-assistant-model', 'gpt-3.5-turbo', {
          kind: 'org-compliance-set',
          key: indexName,
          name: session['survey'],
        }),
        messages: sanitized_base.messages as unknown as ChatCompletionMessageParam[],
        user: user.coldclimate_claims.id,
      });

      const message = {
        role: response.choices[0].message.role,
        content: response.choices[0].message.content,
      };

      const fpMessages = sanitized_base.allMessages(message);

      this.logger.info('FPMessages', fpMessages);

      let ai_response: any;
      if (typeof response.choices[0].message.content === 'string') {
        ai_response = JSON.parse(response.choices[0].message.content);
      }

      const references = docs.map(doc => {
        return {
          name: doc.metadata['file_name'],
          score: doc.score,
          text: doc.metadata.chunk,
        };
      });

      set(ai_response, 'references', references);

      if (ai_response.prompt) {
        delete ai_response.prompt;
      }

      messages.push({
        role: 'assistant',
        content: ai_response,
      });

      // Save the thread to the cache
      await this.cache.set(`openai:thread:${user.coldclimate_claims.id}`, messages, { ttl: 60 * 60 * 24 });

      this.logger.info(`${ai_response.answer ? '✅ Answered' : '❌ Did NOT Answer'} ${question.idx ? question.idx : 'additional_context'}`, {
        pinecone_query: rephrased_question,
        document_content: context,
        survey_question: question.prompt,
        ai_prompt: sanitized_base,
        ai_response,
        session_id: session.sessionId,
        ...session.customMetadata,
      });

      const end = new Date();
      const recording = await this.fp.recordCompletion(session, vars, sanitized_base, response, start, end);

      this.logger.info('Recording', recording);

      return ai_response;
    } catch (error) {
      this.logger.error(`Error asking question ${question.prompt}`, { error, ...session });
      throw error;
    }
  }

  private async getDocumentContent(
    messages: ChatCompletionMessageParam[],
    question: any,
    openai: OpenAI,
    indexName: string,
    session: { [x: string]: any },
    user: AuthenticatedUser,
    context: any,
  ) {
    /**
     * This prompt is used to condense the chat history and follow-up question into a single standalone question for the purpose
     * of providing context to the AI model to query the vector index for the most relevant information.
     */

    // If there are messages, get the last message and include it in the prompt
    let rephrased_question: string;
    let lastMessage: string = '';
    if (Array.isArray(messages) && messages.length > 0) {
      const prevMessage = messages[messages.length - 1].content;
      if (typeof prevMessage !== 'string') {
        lastMessage = JSON.stringify(prevMessage);
      }
    }

    const vars = {
      chat_history: lastMessage || '',
      question: `${question.prompt}. ${question.tooltip}`,
    };
    const condense_prompt = (await this.fp.getPrompt('vector_query', vars, true)) as FormattedPrompt;

    const start = new Date();
    const condenseResponse = await openai.chat.completions.create({
      model: await this.darkly.getStringFlag('dynamic-gpt-assistant-model', 'gpt-3.5-turbo', {
        kind: 'org-compliance-set',
        key: indexName,
        name: session['survey'],
      }),
      messages: condense_prompt.messages as unknown as ChatCompletionMessageParam[],
      user: user.coldclimate_claims.id,
    });

    const end = new Date();

    const message = {
      role: condenseResponse.choices[0].message.role,
      content: condenseResponse.choices[0].message.content,
    };
    const fpMessages = condense_prompt.allMessages(message);

    this.logger.info('FPMessages', fpMessages);

    const recording = await this.fp.recordCompletion(session, vars, condense_prompt, condenseResponse, start, end);

    this.logger.info('Recording', recording);

    if (condenseResponse.choices[0].message.content) {
      rephrased_question = condenseResponse.choices[0].message.content;

      this.logger.info(`Generated Pinecone Query`, {
        previous_message: lastMessage,
        current_question: question.promp,
        pincone_query: rephrased_question,
        ...session,
      });
    }

    if (!rephrased_question) {
      rephrased_question = question.prompt;
    }

    // Get the context content from the Pinecone index
    const docs = (await this.pc.getContext(rephrased_question, indexName, indexName, 0.8, false)) as ScoredPineconeRecord[];

    const content = await this.extractTextFromDocument(docs as ScoredPineconeRecord<RecordMetadata>[]);

    context.push(content);
    return { rephrased_question, docs };
  }

  async process_survey(job: Job) {
    const { survey, user, compliance, integration, organization, on_update_url } = job.data;
    const index = await this.pc.listIndexes();

    await this.resetAIResponses(user, survey, organization);

    this.logger.info(`✅ Started processing survey ${survey.definition.title}`, {
      survey: survey.definition.title,
      user,
      compliance,
      integration,
      organization,
      on_update_url,
    });
    // create a session
    const session = (await this.fp.createSession({
      survey: survey.definition.title,
      organization: organization.name,
      user: user.coldclimate_claims.email,
    })) as FPSession;

    this.logger.info(`Session created for survey ${survey.definition.title}`, session);
    const idx = find(index, { name: organization.name });
    if (!idx) {
      this.logger.warn(`Index ${organization.name} not found; creating...`);
      await this.pc.createIndex(organization.name);
      // clear existing vectors since the index was just created
      const vectors = await this.prisma.vector_records.findMany({ where: { organization_id: organization.id } });
      if (Array.isArray(vectors)) {
        for (const vector of vectors) {
          try {
            await this.prisma.vector_records.delete({ where: { id: vector.id } });
          } catch (e) {
            this.logger.error(`Error deleting vector ${vector.id}`, e);
          }
        }
      }

      const files = await this.prisma.organization_files.findMany({ where: { organization_id: organization.id } });

      if (!files || files.length === 0) {
        this.logger.warn(`No files found for organization ${organization.name}`);
      } else if (files.length > 0) {
        for (const file of files) {
          const cacheKey = this.pc.getCacheKey(file);
          await this.cache.delete(cacheKey);
          await this.pc.ingestData(user, organization, file, organization.name);
        }
      }
    }

    this.setTags({
      survey: survey?.definition?.title,
      url: on_update_url,
      organization: {
        name: organization.name,
        id: organization.id,
      },
      user: {
        email: user.coldclimate_claims.email,
        id: user.id || user.coldclimate_claims.id,
      },
    });
    this.logger.info(`Processing survey ${survey.definition.title} for compliance ${compliance?.name}`);

    let category_context;

    if (!survey.definition.category_description || survey.definition.category_description === 'undefined') {
      category_context = null;
    }

    const definition = survey.definition;

    const sections = Object.keys(definition.sections);

    const sdx = 0;

    const reqs: any[] = [];

    //initialize prompts service with survey name so that it has the correct context for darkly
    this.prompts = await new PromptsService(this.darkly, survey.name, organization, this.prisma).initialize();

    // iterate over each section key
    for (const section of sections) {
      // create a new thread for each section run
      reqs.push(this.processSection(job, section, sdx, sections, definition, integration, organization, category_context, user, session));
      //await this.processSection(job, section, sdx, sections, definition, thread, integration, organization, category_context, user, survey);
    }

    await Promise.all(reqs);

    this.logger.info(`✅ Finished processing survey ${survey.definition.title}`, {
      survey: survey.definition.title,
      user,
      compliance,
      integration,
      organization,
      on_update_url,
    });
  }

  public async processSection(job: Job, section: string, sdx: number, sections: string[], definition, integration, organization, category_context, user, session: FPSession) {
    await job.log(`Section | ${section}:${sdx + 1} of ${sections.length}`);
    this.logger.info(`Processing ${section}: ${definition.sections[section].title}`, { section });

    // get the followup items for the section
    const items = Object.keys(definition.sections[section].follow_up);

    // iterate over each followup item
    for (const item of items) {
      try {
        if (await this.isDuplicateOrCanceled(organization, job, section, item)) {
          continue;
        }

        const idx = parseInt(item.split('-')[1]);

        await job.log(`Question | section: ${section} question: ${item} (${items.indexOf(item)} of ${items.length})`);
        const follow_up = definition.sections[section].follow_up[item];

        if (follow_up?.ai_response?.answer && !has(follow_up, 'ai_response.what_we_need')) {
          this.logger.info(`Skipping ${section}.${item}: ${follow_up.prompt}; it has already been answered`, {
            section_item: definition.sections[section].follow_up[item],
          });
          continue;
        }

        this.logger.info(`Sending Message | ${section}.${item}: ${follow_up.prompt}`);

        // create a new run for each followup item
        const value = await this.askQuestion(organization.name, follow_up, organization.name, job.data.user, session);

        // update the survey with the response
        definition.sections[section].follow_up[item].ai_response = value;
        if (value) {
          definition.sections[section].follow_up[item].ai_answered = typeof value.answer != 'undefined';
        }
        definition.sections[section].follow_up[item].ai_attempted = true;

        // if there is additional context, create a new run for it
        if (follow_up['additional_context']) {
          if (definition.sections[section].follow_up[item].additional_context.ai_answered) {
            this.logger.info(`Skipping ${section}.${item}.additional_context: ${follow_up.prompt}; it has already been answered`, {
              section_item: definition.sections[section].follow_up[item],
            });
            continue;
          }

          this.logger.info(`Creating Message | ${section}.${item}.additional_context: ${follow_up.prompt}`);
          const additionalValue = await this.askQuestion(organization.name, follow_up['additional_context'], organization.display_name, job.data.user, session);

          definition.sections[section].follow_up[item].additional_context.ai_response = additionalValue;

          if (additionalValue) {
            definition.sections[section].follow_up[item].additional_context.ai_answered = typeof value.answer != 'undefined';
          }

          definition.sections[section].follow_up[item].additional_context.ai_attempted = true;
        }

        // publish the response to the rabbit queue
        await this.rabbit.publish(`cold.core.api.survey_data`, {
          event: 'survey_data.updated',
          data: {
            organization: { id: integration.organization_id },
            user,
            on_update_url: job.data.on_update_url,
            survey: job.data.survey,
          },
          from: 'cold.platform.openai',
        });

        await job.progress(idx / items.length);
      } catch (error) {
        this.logger.error(`Error processing ${section}.${item}: ${error.message}`, error);
      }
    }

    this.logger.info(`✅ Finished processing ${section}: ${definition.sections[section].title}`, { section });
  }

  private async isDuplicateOrCanceled(organization, job: Job, section: string, item: string) {
    const exists = await this.queue.getJob(job.id);
    if (!exists || !exists.data.survey) {
      this.logger.warn(`Job ${job.id} no longer found in queue; will not process question ${section}:${item}`);
      await this.cache.delete(`jobs:${job.name}:${organization.id}:${job.data.payload.compliance.compliance_id}`);
      return true;
    }

    const jobs = (await this.cache.get(`jobs:${job.name}:${organization.id}:${job.data.payload.compliance.compliance_id}`)) as number[];

    if (!jobs) {
      return false;
    }

    const newestJob = jobs.sort().reverse()[0];
    const currentJobId = typeof job.id === 'number' ? job.id : parseInt(job.id);

    if (currentJobId < newestJob) {
      await job.log(`Job replaced by ${newestJob}, will not process question ${section}:${item}`);
      this.logger.warn(`Job replaced by ${newestJob}, will not process question ${section}:${item}`);

      return true;
    }

    const currentJob = await this.queue.getJob(job.id);
    if (!currentJob) {
      this.logger.warn(`Job ${job.id} no longer found in queue; will not process question ${section}:${item}`);
      return true;
    }
  }
}
