import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, CacheService, ColdRabbitService, DarklyService, PrismaService } from '@coldpbc/nest';
import { PineconeService } from '../pinecone/pinecone.service';
import { ConfigService } from '@nestjs/config';
import { PromptsService } from '../prompts/prompts.service';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { has, set } from 'lodash';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { RecordMetadata, ScoredPineconeRecord } from '@pinecone-database/pinecone';

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
  ) {
    super(ChatService.name);
    this.openAIapiKey = this.config.getOrThrow('OPENAI_API_KEY');
  }

  async onModuleInit() {}

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

  async askQuestion(indexName: string, question: any, company_name: string, user: AuthenticatedUser, tags): Promise<any> {
    try {
      this.setTags(tags);

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

      /**
       * This prompt is used to condense the chat history and follow-up question into a single standalone question for the purpose
       * of providing context to the AI model to query the vector index for the most relevant information.
       */

      let condense_prompt = `Given the chat history and a follow-up question, rephrase the follow-up question to be a standalone question that encompasses all necessary context from the chat history.
        Chat History:
        {chat_history}

        Follow-up input:
        {question}

        Make sure your standalone question is self-contained, clear, and specific. Rephrased standalone question:
      `;

      // If there are messages, get the last message and rephrase the current question to be a standalone question
      let rephrased_question: string;
      if (Array.isArray(messages) && messages.length > 0) {
        let lastMessage = messages[messages.length - 1].content;
        if (typeof lastMessage !== 'string') {
          lastMessage = JSON.stringify(lastMessage);
        }
        //const parsed = JSON.parse(lastMessage);
        const chat_history_prompt = condense_prompt.replace('{chat_history}', lastMessage || '');
        if (chat_history_prompt) {
          condense_prompt = chat_history_prompt;
        }

        const question_prompt = condense_prompt.replace('{question}', question.prompt);
        if (question_prompt) {
          condense_prompt = question_prompt;
        }

        // Define the system message
        const systemMessage: ChatCompletionMessageParam = {
          role: 'system',
          content: condense_prompt,
        };

        const response = await openai.chat.completions.create({
          model: await this.darkly.getStringFlag('dynamic-gpt-assistant-model', 'gpt-3.5-turbo', {
            kind: 'org-compliance-set',
            key: indexName,
            name: tags['survey'],
          }),
          messages: [systemMessage], // only send the last two
          temperature: 0.5,
          user: user.coldclimate_claims.id,
        });

        if (response.choices[0].message.content) {
          rephrased_question = response.choices[0].message.content;

          this.logger.info(`Generated Pinecone Query`, {
            previous_message: lastMessage,
            current_question: question.promp,
            pincone_query: rephrased_question,
          });
        }
      }

      if (!rephrased_question) {
        rephrased_question = question.prompt;
      }

      // Get the context content from the Pinecone index
      const docs = (await this.pc.getContext(rephrased_question, indexName, indexName, 0.8, false)) as ScoredPineconeRecord[];

      const content = await this.extractTextFromDocument(docs as ScoredPineconeRecord<RecordMetadata>[]);

      context.push(content);

      const with_context = await this.prompts.getPrompt(question, JSON.stringify(context), docs.length > 0);

      const sanitized_base = with_context.replace('{question}', JSON.stringify(question));

      // Define the system message
      const systemMessage: ChatCompletionMessageParam = {
        role: 'system',
        content: sanitized_base,
      };

      messages.push(systemMessage);

      // Ask OpenAI for a streaming chat completion given the prompt
      const response = await openai.chat.completions.create({
        response_format: { type: 'json_object' },
        model: await this.darkly.getStringFlag('dynamic-gpt-assistant-model', 'gpt-3.5-turbo', {
          kind: 'org-compliance-set',
          key: indexName,
          name: tags['survey'],
        }),
        messages: [systemMessage], // only send the last two
        temperature: 0.5,
        user: user.coldclimate_claims.id,
      });

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
      });

      return ai_response;
    } catch (error) {
      this.logger.error(`Error asking question ${question.prompt}`, error);
      throw error;
    }
  }

  async process_survey(job: Job) {
    const { survey, user, compliance, integration, organization, on_update_url } = job.data;
    const index = await this.pc.listIndexes();

    if (!index.includes(organization.name)) {
      this.logger.warn(`Index ${organization.name} not found; creating...`);
      await this.pc.createIndex(organization.name);

      const files = await this.prisma.organization_files.findMany({ where: { organization_id: organization.id } });

      if (!files || files.length === 0) {
        this.logger.warn(`No files found for organization ${organization.name}`);
      } else if (files.length > 0) {
        for (const file of files) {
          await this.pc.ingestData(user, organization, file, organization.id);
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
      reqs.push(this.processSection(job, section, sdx, sections, definition, integration, organization, category_context, user, survey));
      //await this.processSection(job, section, sdx, sections, definition, thread, integration, organization, category_context, user, survey);
    }

    await Promise.all(reqs);
  }

  public async processSection(job: Job, section: string, sdx: number, sections: string[], definition, integration, organization, category_context, user, survey) {
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
        const value = await this.askQuestion(organization.name, follow_up, organization.name, job.data.user, {
          question: {
            survey: job.data['survey'].definition.title,
            section: section,
            key: item,
            text: follow_up.prompt,
          },
        });

        // update the survey with the response
        definition.sections[section].follow_up[item].ai_response = value;
        if (value) {
          definition.sections[section].follow_up[item].ai_answered = !!value.answer;
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
          const additionalValue = await this.askQuestion(organization.name, follow_up['additional_context'], organization.display_name, job.data.user, {
            question: {
              key: item,
              text: follow_up.prompt,
            },
          });

          definition.sections[section].follow_up[item].additional_context.ai_response = additionalValue;

          if (additionalValue) {
            definition.sections[section].follow_up[item].additional_context.ai_answered = has(additionalValue, 'answer');
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
            survey,
          },
          from: 'cold.platform.openai',
        });

        await job.progress(idx / items.length);
      } catch (error) {
        this.logger.error(`Error processing ${section}.${item}: ${error.message}`, error);
      }
    }
  }

  private async isDuplicateOrCanceled(organization, job: Job, section: string, item: string) {
    const exists = await this.queue.getJob(job.id);
    if (!exists) {
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
