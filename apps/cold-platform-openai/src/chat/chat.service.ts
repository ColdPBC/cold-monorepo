import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, CacheService, ColdRabbitService, DarklyService, PrismaService } from '@coldpbc/nest';
import { PineconeService } from '../pinecone/pinecone.service';
import { ConfigService } from '@nestjs/config';
import { PromptsService } from '../prompts/prompts.service';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { set } from 'lodash';
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

  /**
   * Reset the AI responses when re-processing a survey
   * @param user
   * @param survey
   * @param organization
   */
  async resetAIResponses(user, survey: any, organization: any) {
    this.logger.info(`Clearing previous ai_responses for ${organization.name}: ${survey.name}`, {
      user,
      survey: survey.name,
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

  /**
   * This method is used to extract text from a list of documents.
   * It deduplicates matches by URL, joins all the chunks of text together,
   * truncates to the maximum number of tokens, and returns the result.
   *
   * @param {ScoredPineconeRecord<RecordMetadata>[]} qualifyingDocs - An array of documents from which to extract text.
   * @returns {string} - A string containing the extracted text from the documents.
   */
  async extractTextFromDocument(qualifyingDocs: ScoredPineconeRecord<RecordMetadata>[]) {
    // Use a map to deduplicate matches by URL
    const docs = Array.isArray(qualifyingDocs)
      ? qualifyingDocs.map(match => {
          const item = {
            name: match.metadata['file_name'],
            url: match.metadata['url'],
            text: match.metadata.chunk as string,
          };
          // If the text is a string, try to parse it as JSON
          if (typeof item.text === 'string') {
            try {
              item.text = JSON.stringify(JSON.parse(item.text));
            } catch (e) {
              // Do nothing as it is not a JSON string
            }

            // Return the item: string
            const page = `"${item.text} (${item.url})"`;

            const file = `"${item.text} (${item.name})"`;
            return JSON.stringify(item.url ? page : file);
          }
        })
      : [];

    // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
    return docs.join('  \n\n  ').substring(0, 3000);
  }

  async askQuestion(question: any, company_name: string, user: AuthenticatedUser) {
    const organization = await this.prisma.organizations.findUnique({
      where: { name: company_name },
    });
    this.prompts = await new PromptsService(this.darkly, 'chat', organization, this.prisma).initialize();

    const session = (await this.fp.createSession({
      organization: company_name,
      user: user.coldclimate_claims.email,
      survey: 'chat',
    })) as FPSession;

    const vectorSess = (await this.fp.createSession({
      organization: company_name,
      user: user.coldclimate_claims.email,
      survey: 'chat',
    })) as FPSession;

    if (typeof question !== 'string') {
      return await this.askSurveyQuestion(question, company_name, user, session, vectorSess);
    }

    const start = new Date();

    let messages = (await this.cache.get(`openai:thread:${company_name}:${user.coldclimate_claims.email}`)) as ChatCompletionMessageParam[];

    if (!messages) {
      messages = [
        {
          role: 'user',
          content: `{ "prompt": ${question} }`,
        },
      ] as ChatCompletionMessageParam[];
    } else {
      messages.push({
        role: 'user',
        content: `{ "prompt": ${question} }`,
      });
    }

    const context: any = [];
    const openai = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });

    for (const message of messages) {
      context.push(message);
    }
    const { rephrased_question, docs } = await this.getDocumentContent(messages, { prompt: question }, company_name, user, context);

    const vars = {
      component_prompt: '',
      context: context[0] || '',
      question: rephrased_question,
    };

    const sanitized_base = (await this.fp.getPrompt('survey_question_prompt', vars, true)) as FormattedPrompt;

    const response = await openai.chat.completions.create({
      response_format: sanitized_base.promptInfo.model === 'gpt-3.5-turbo-16k-0613' ? undefined : { type: 'json_object' },
      model: sanitized_base.promptInfo.model,
      max_tokens: sanitized_base.promptInfo.modelParameters.max_tokens,
      temperature: sanitized_base.promptInfo.modelParameters.temperature,
      frequency_penalty: sanitized_base.promptInfo.modelParameters.frequency_penalty,
      presence_penalty: sanitized_base.promptInfo.modelParameters.presence_penalty,
      logit_bias: sanitized_base.promptInfo.modelParameters.logit_bias,
      stop: sanitized_base.promptInfo.modelParameters.stop,
      messages: sanitized_base.messages as unknown as ChatCompletionMessageParam[],
      user: user.coldclimate_claims.id,
    });

    const message = {
      role: response.choices[0].message.role,
      content: response.choices[0].message.content,
    };

    sanitized_base.allMessages(message);

    let ai_response: any;
    if (typeof response.choices[0].message.content === 'string') {
      ai_response = JSON.parse(response.choices[0].message.content);
    }

    const references = docs.map(doc => {
      const metadata = {
        text: doc.metadata.chunk,
        score: doc.score,
      };
      if (doc.metadata['file_name']) {
        set(metadata, 'file', doc.metadata['file_name']);
      }
      if (doc.metadata['url']) {
        set(metadata, 'url', doc.metadata['url']);
      }
      return metadata;
    });

    set(ai_response, 'references', references);

    messages.push({
      role: 'assistant',
      content: ai_response,
    });

    // Save the thread to the cache
    await this.cache.set(`openai:thread:${company_name}:${user.coldclimate_claims.email}`, messages, { ttl: 60 * 60 * 24 });

    this.logger.info(`${ai_response.answer !== undefined ? '✅ Answered' : '❌ Did NOT Answer'}`, {
      pinecone_query: rephrased_question,
      document_content: context,
      prompt: question,
      ai_prompt: sanitized_base,
      ai_response,
      session_id: session?.sessionId,
      ...session?.customMetadata,
    });

    const end = new Date();
    const recording = await this.fp.recordCompletion(session, vars, sanitized_base, response, start, end);
    this.logger.info(`Sending ${sanitized_base.promptInfo.templateName} run stats to FreePlay`, recording);

    return ai_response;
  }

  /**
   * Ask a question to the AI model
   * @param question
   * @param company_name
   * @param user
   * @param session
   * @param vectorSession
   * @param additional_context
   */
  async askSurveyQuestion(question: any, company_name: string, user: AuthenticatedUser, session?: FPSession, vectorSession?: FPSession, additional_context?: any): Promise<any> {
    const start = new Date();
    try {
      // Get Chat History
      let messages = (await this.cache.get(`openai:thread:${user.coldclimate_claims.email}`)) as ChatCompletionMessageParam[];

      if (!messages) {
        messages = [] as ChatCompletionMessageParam[];
      }

      const context: any = [];
      const openai = new OpenAI({
        organization: this.config.getOrThrow('OPENAI_ORG_ID'),
        apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
      });

      const { rephrased_question, docs } = await this.getDocumentContent(messages, question, company_name, user, context, vectorSession, additional_context);

      const vars = {
        component_prompt: (await this.prompts.getComponentPrompt(question)) || '',
        context: context[0] || '',
        question: additional_context ? rephrased_question : `${question.prompt} ${question.tooltip || ''}`,
      };

      const sanitized_base = (await this.fp.getPrompt('survey_question_prompt', vars, true)) as FormattedPrompt;

      const response = await openai.chat.completions.create({
        response_format: sanitized_base.promptInfo.model === 'gpt-3.5-turbo-16k-0613' ? undefined : { type: 'json_object' },
        model: sanitized_base.promptInfo.model,
        max_tokens: sanitized_base.promptInfo.modelParameters.max_tokens,
        temperature: sanitized_base.promptInfo.modelParameters.temperature,
        frequency_penalty: sanitized_base.promptInfo.modelParameters.frequency_penalty,
        presence_penalty: sanitized_base.promptInfo.modelParameters.presence_penalty,
        logit_bias: sanitized_base.promptInfo.modelParameters.logit_bias,
        stop: sanitized_base.promptInfo.modelParameters.stop,
        messages: sanitized_base.messages as unknown as ChatCompletionMessageParam[],
        user: user.coldclimate_claims.id,
      });

      let ai_response: any;
      if (typeof response.choices[0].message.content === 'string') {
        ai_response = JSON.parse(response.choices[0].message.content);
      }

      /**
       * This is a temporary fix to sanitize ai_response since function calls are not yet supported in this function.
       * todo: remove this once function calls are supported
       */
      if (ai_response.answer) {
        switch (question.component) {
          case 'select':
          case 'multi_select':
            if (!Array.isArray(ai_response.answer)) {
              if (ai_response.answer.includes(',')) {
                ai_response.answer = ai_response.answer.split(',').map((item: string) => item.trim());
              } else {
                ai_response.answer = [ai_response.answer];
              }
            }
            break;
          case 'yes_no':
            if (typeof ai_response.answer === 'string' && ai_response.answer?.toLowerCase() === 'yes') {
              ai_response.answer = true;
            } else if (typeof ai_response.answer === 'string' && ai_response.answer?.toLowerCase() === 'no') {
              ai_response.answer = false;
            }
            break;
        }
      }

      const references = docs.map(doc => {
        const metadata = {
          text: doc.metadata.chunk,
          score: doc.score,
        };

        if (doc.metadata['file_name']) {
          set(metadata, 'file', doc.metadata['file_name']);
        }
        if (doc.metadata['url']) {
          set(metadata, 'url', doc.metadata['url']);
        }

        return metadata;
      });

      set(ai_response, 'references', references);

      if (ai_response.prompt) {
        delete ai_response.prompt;
      }

      messages.push({
        role: 'assistant',
        content: ai_response.answer || ai_response.justification,
      });

      // Save the thread to the cache
      await this.cache.set(`openai:thread:${user.coldclimate_claims.email}`, messages, { ttl: 1000 * 60 * 60 * 24 });

      this.logger.info(`${ai_response.answer !== 'undefined' ? '✅ Answered' : '❌ Did NOT Answer'} ${question.idx ? question.idx : 'additional_context'}`, {
        pinecone_query: rephrased_question,
        document_content: context,
        survey_question: question.prompt,
        ai_prompt: sanitized_base,
        ai_response,
        session_id: session?.sessionId,
        ...session?.customMetadata,
      });

      this.metrics.increment('openai.questions.answered', 1, { section: session?.customMetadata?.survey });

      if (!session) {
        return ai_response;
      }

      const end = new Date();
      const recording = await this.fp.recordCompletion(session, vars, sanitized_base, response, start, end);

      this.logger.info(`Sending ${sanitized_base.promptInfo.templateName} run stats to FreePlay`, recording);

      return ai_response;
    } catch (error) {
      this.logger.error(`Error asking question ${question.prompt}`, { error, ...session });

      throw error;
    }
  }

  /**
   * Get the document content from the Pinecone index
   * @param messages
   * @param question
   * @param indexName
   * @param user
   * @param context
   * @param vectorSession
   * @param additional_context
   * @private
   */
  async getDocumentContent(
    messages: ChatCompletionMessageParam[],
    question: any,
    indexName: string,
    user: AuthenticatedUser,
    context: any,
    vectorSession?: FPSession,
    additional_context?,
  ) {
    const openai = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });

    /**
     * This prompt is used to condense the chat history and follow-up question into a single standalone question for the purpose
     * of providing context to the AI model to query the vector index for the most relevant information.
     */
    let rephrased_question: string;
    let lastMessage: string = '';

    // If there are messages, get the last message and include it in the prompt
    if (Array.isArray(messages) && messages.length > 0) {
      const prevMessage = messages[messages.length - 1].content;
      if (typeof prevMessage !== 'string') {
        lastMessage = JSON.stringify(prevMessage);
      }
    }

    let vars: any;
    if (additional_context) {
      vars = {
        chat_history: question.prompt ? question.prompt : question,
        question: additional_context.prompt || '',
      };
    } else {
      vars = {
        chat_history: lastMessage || '',
        question: `${question.prompt ? question.prompt : question}. ${question.tooltip ? question.tooltip : ''}`,
      };
    }

    const condense_prompt = (await this.fp.getPrompt('vector_query', vars, true)) as FormattedPrompt;

    const start = new Date();
    const condenseResponse = await openai.chat.completions.create({
      model: condense_prompt.promptInfo.model,
      max_tokens: condense_prompt.promptInfo.modelParameters.max_tokens,
      temperature: condense_prompt.promptInfo.modelParameters.temperature,
      frequency_penalty: condense_prompt.promptInfo.modelParameters.frequency_penalty,
      presence_penalty: condense_prompt.promptInfo.modelParameters.presence_penalty,
      logit_bias: condense_prompt.promptInfo.modelParameters.logit_bias,
      stop: condense_prompt.promptInfo.modelParameters.stop,
      messages: condense_prompt.messages as unknown as ChatCompletionMessageParam[],
      user: user.coldclimate_claims.id,
    });

    const end = new Date();

    const message = {
      role: condenseResponse.choices[0].message.role,
      content: condenseResponse.choices[0].message.content,
    };

    condense_prompt.allMessages(message);

    if (condenseResponse.choices[0].message.content) {
      rephrased_question = condenseResponse.choices[0].message.content;

      this.logger.info(`Generated Pinecone Query`, {
        previous_message: lastMessage,
        current_question: question.prompt,
        pincone_query: rephrased_question,
        session_id: vectorSession?.sessionId,
        ...vectorSession?.customMetadata,
      });
    }

    if (!rephrased_question) {
      rephrased_question = question.prompt;
    }

    // Get the context content from the Pinecone index
    let docs = (await this.pc.getContext(rephrased_question, indexName, indexName, 0.8, false)) as ScoredPineconeRecord[];

    if (docs.length < 1) {
      docs = (await this.pc.getContext(question.prompt, indexName, indexName, 0.6, false)) as ScoredPineconeRecord[];
    }

    const content = await this.extractTextFromDocument(docs as ScoredPineconeRecord<RecordMetadata>[]);

    if (content) {
      context.push(content);
    }

    if (vectorSession) {
      vectorSession.customMetadata = { ...vectorSession.customMetadata, snippets: content };
      const recording = await this.fp.recordCompletion(vectorSession, vars, condense_prompt, condenseResponse, start, end);

      this.logger.info(`Sending ${condense_prompt.promptInfo.templateName} run stats to FreePlay `, recording);
    }

    return { rephrased_question, docs };
  }

  /**
   * This method is used to process a survey.
   *
   * @param {Job} job - The job object containing the survey data.
   * @returns {Promise<void>} - A promise that resolves when the survey processing is complete.
   */
  async process_survey(job: Job) {
    const start = new Date();
    try {
      // Destructure the necessary data from the job
      const { survey, user, compliance, integration, organization, on_update_url } = job.data;

      // Get the list of indexes
      const index = await this.pc.listIndexes();

      // Reset the AI responses for the survey
      await this.resetAIResponses(user, survey, organization);

      // Log the start of the survey processing
      this.logger.info(`✅ Started processing survey ${survey.name}`, {
        survey: survey.name,
        user,
        compliance,
        integration,
        organization,
        on_update_url,
      });

      // Find the index for the organization
      const idx = await this.pc.getIndex(organization.name);

      // If the index does not exist, create it
      if (!idx) {
        this.logger.warn(`Index ${organization.name} not found; creating...`);
        await this.pc.getIndexDetails(organization.name);

        // Clear existing vectors since the index was just created
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

        // Get the files for the organization
        const files = await this.prisma.organization_files.findMany({ where: { organization_id: organization.id } });

        // If no files are found, log a warning
        if (!files || files.length === 0) {
          this.logger.warn(`No files found for organization ${organization.name}`);
        } else if (files.length > 0) {
          // If files are found, ingest the data for each file
          for (const file of files) {
            const cacheKey = this.pc.getCacheKey(file);
            await this.cache.delete(cacheKey);
          }
        }
      }

      // Set the tags for the survey
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

      // Log the start of the survey processing
      this.logger.info(`Processing survey ${survey.definition.title} for compliance ${compliance?.name}`);

      // Initialize the category context
      let category_context;

      // If the survey definition does not have a category description, set the category context to null
      if (!survey.definition.category_description || survey.definition.category_description === 'undefined') {
        category_context = null;
      }

      // Get the survey definition
      const definition = survey.definition;

      // Get the sections of the survey
      const sections = Object.keys(definition.sections);

      // Initialize the section index
      const sdx = 0;

      // Initialize the requests array
      const reqs: any[] = [];

      // Initialize the prompts service with the survey name so that it has the correct context for darkly
      this.prompts = await new PromptsService(this.darkly, survey.name, organization, this.prisma).initialize();

      // Iterate over each section
      for (const section of sections) {
        // Create a session for the survey
        const session = (await this.fp.createSession({
          survey: survey.name,
          organization: organization.name,
          user: user.coldclimate_claims.email,
          section: section,
        })) as FPSession;

        const vectorSession = (await this.fp.createSession({
          survey: survey.name,
          organization: organization.name,
          user: user.coldclimate_claims.email,
          section: section,
        })) as FPSession;

        // Log the creation of the session
        this.logger.info(`Session created for survey ${survey.name}`, session);

        // Create a new thread for each section run
        reqs.push(this.processSection(job, section, sdx, sections, definition, integration, organization, category_context, user, session, vectorSession));
      }

      // Wait for all the sections to be processed
      await Promise.all(reqs);

      this.sendMetrics('survey', 'completed', {
        sendEvent: true,
        start,
        tags: { survey: survey.name, organization: organization.name, user: user.coldclimate_claims.email },
      });

      // Log the end of the survey processing
      this.logger.info(`✅ Finished processing survey ${survey.definition.title}`, {
        survey: survey.definition.title,
        user,
        compliance,
        integration,
        organization,
        on_update_url,
      });
    } catch (e) {
      this.logger.error(`Error processing survey ${job.data.survey.name}`, e);

      this.sendMetrics('survey', 'failed', {
        start,
        sendEvent: true,
        tags: {
          survey: job.data.survey?.name,
          organization: job.data.organization?.name,
          user: job.data.user?.coldclimate_claims?.email,
          error: e.message,
        },
      });
    }
  }

  private sendMetrics(
    resource: string,
    status: string,
    options: {
      start?: Date;
      sendEvent?: boolean;
      tags: { [key: string]: any };
    },
  ) {
    const tags = {
      ...options.tags,
      status,
    };

    this.metrics.increment(`openai.${resource}`, 1, tags);

    if (options.start) {
      this.metrics.histogram(`openai.${resource}.duration`, new Date().getTime() - options.start.getTime(), tags);
    }

    if (options.sendEvent) {
      let alert_type: 'info' | 'error' | 'success' | 'warning' = 'success';
      if (status === 'started') {
        alert_type = 'info';
      }
      if (status === 'failed') {
        alert_type = 'error';
      }

      this.metrics.event(
        `openai.survey.${status}`,
        `${resource} ${status} processing: ${options.tags.survey.name} ${options.tags.error ? ' | ' + options.tags.error.message : ''}`,
        { alert_type: alert_type },
        tags,
      );
    }
  }

  /**
   * Process the section
   * @param job
   * @param section
   * @param sdx
   * @param sections
   * @param definition
   * @param integration
   * @param organization
   * @param category_context
   * @param user
   * @param session
   */
  public async processSection(
    job: Job,
    section: string,
    sdx: number,
    sections: string[],
    definition,
    integration,
    organization,
    category_context,
    user,
    session: FPSession,
    vectorSession: FPSession,
  ) {
    const start = new Date();

    try {
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

          //set(session.customMetadata, 'key', item);

          const idx = parseInt(item.split('-')[1]);

          await job.log(`Question | section: ${section} question: ${item} (${items.indexOf(item)} of ${items.length})`);
          const follow_up = definition.sections[section].follow_up[item];

          if (follow_up?.ai_response?.value) {
            this.logger.info(`Skipping ${section}.${item}: ${follow_up.prompt}; it has already been answered`, {
              survey: job.data.survey?.name,
              section: section,
              key: item,
              question: follow_up.prompt,
              answer: follow_up.value,
              ai_answer: follow_up.ai_response.answer,
              justification: follow_up.ai_response.justification,
              organization,
              user: user.coldclimate_claims.email,
            });
            continue;
          }

          this.logger.info(`Processing Message | ${section}.${item}`, {
            survey: job.data.survey?.name,
            section: section,
            key: item,
          });

          // create a new run for each followup item
          const value = await this.askSurveyQuestion(follow_up, organization.name, job.data.user, session, vectorSession);

          // update the survey with the response
          if (value) {
            definition.sections[section].follow_up[item].ai_response = value;
            definition.sections[section].follow_up[item].ai_answered = typeof value.answer !== 'undefined';

            this.logger.info(`Ai responded: ${section}.${item}`, {
              survey: job.data.survey?.name,
              section: section,
              key: item,
              question: follow_up.prompt,
              answer: follow_up.value,
              ai_answer: follow_up.ai_response.answer,
              justification: follow_up.ai_response.justification,
            });

            this.sendMetrics('survey.question', 'completed', {
              sendEvent: true,
              start,
              tags: {
                survey: job.data.survey?.name,
                section: section,
                key: item,
                ai_answered: typeof value.answer !== 'undefined',
                organization: organization.name,
                user: user.coldclimate_claims.email,
              },
            });
          }

          definition.sections[section].follow_up[item].ai_attempted = true;

          // if there is additional context, create a new run for it
          if (follow_up['additional_context']) {
            if (definition.sections[section].follow_up[item].additional_context.value) {
              this.logger.info(`Skipping ${section}.${item}.additional_context; it has already been answered`, {
                survey: job.data.survey?.name,
                section: section,
                key: item,
                additional_context: definition.sections[section].follow_up[item].additional_context,
              });
              continue;
            }

            this.logger.info(`Processing Question | ${section}.${item}.additional_context: ${follow_up.prompt}`);
            const additionalValue = await this.askSurveyQuestion(follow_up, organization.name, job.data.user, session, vectorSession, follow_up['additional_context']);

            if (additionalValue) {
              definition.sections[section].follow_up[item].additional_context.ai_response = additionalValue;
              definition.sections[section].follow_up[item].additional_context.ai_answered = typeof value.answer !== 'undefined';

              this.logger.info(`Ai responded: ${section}.${item}`, {
                survey: job.data.survey?.name,
                section: section,
                key: item,
                question: follow_up.prompt,
                answer: follow_up.value,
                ai_answer: follow_up.ai_response.answer,
                justification: follow_up.ai_response.justification,
              });

              this.sendMetrics('survey.question', 'completed', {
                sendEvent: true,
                start,
                tags: {
                  survey: job.data.survey?.name,
                  section: section,
                  key: item,
                  ai_answered: typeof value.answer !== 'undefined',
                  organization: organization.name,
                  user: user.coldclimate_claims?.email,
                },
              });
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
          this.sendMetrics('survey.question', `failed`, {
            start,
            sendEvent: true,
            tags: {
              section: section,
              question: item,
              survey: job.data.survey.name,
              organization: job.data.organization.name,
              user: job.data.user?.coldclimate_claims?.email,
              error: error,
            },
          });
          this.logger.error(`Error processing ${section}.${item}: ${error.message}`, error);
        }
      }
      this.sendMetrics('survey.section', 'completed', {
        start,
        sendEvent: true,
        tags: {
          section: section,
          survey: job.data.survey.name,
          organization: job.data.organization.name,
          user: job.data.user.coldclimate_claims.email,
        },
      });

      this.logger.info(`✅ Finished processing ${section}: ${definition.sections[section].title}`, { section });
    } catch (e) {
      this.sendMetrics('survey.section', 'failed', {
        start,
        sendEvent: true,
        tags: {
          section: section,
          survey: job.data.survey.name,
          organization: job.data.organization.name,
          user: job.data.user.coldclimate_claims.email,
          error: e,
        },
      });

      throw e;
    }
  }

  /**
   * Check if the job is a duplicate or has been canceled
   * @param organization
   * @param job
   * @param section
   * @param item
   * @private
   */
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
