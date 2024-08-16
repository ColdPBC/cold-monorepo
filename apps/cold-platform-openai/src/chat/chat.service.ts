import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  AuthenticatedUser,
  BaseWorker,
  CacheService,
  ColdRabbitService,
  ComplianceAiResponsesRepository,
  ComplianceResponsesRepository,
  ComplianceSectionsCacheRepository,
  ComplianceSectionsRepository,
  Cuid2Generator,
  DarklyService,
  FilteringService,
  GuidPrefixes,
  MqttService,
  PrismaService,
} from '@coldpbc/nest';
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
import { compliance_sections, organizations } from '@prisma/client';

@Injectable()
export class ChatService extends BaseWorker implements OnModuleInit {
  openAIapiKey: string;
  prompts: PromptsService;

  constructor(
    @InjectQueue('openai') readonly queue: Queue,
    readonly config: ConfigService,
    readonly pc: PineconeService,
    readonly prisma: PrismaService,
    readonly darkly: DarklyService,
    readonly cache: CacheService,
    readonly rabbit: ColdRabbitService,
    readonly mqtt: MqttService,
    readonly fp: FreeplayService,
    readonly complianceSectionsRepository: ComplianceSectionsRepository,
    readonly complianceSectionsCacheRepository: ComplianceSectionsCacheRepository,
    readonly complianceResponsesRepository: ComplianceResponsesRepository,
    readonly complianceAiResponsesRepository: ComplianceAiResponsesRepository,
    readonly filterService: FilteringService,
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
      compliance: survey.name,
      organization: { id: organization.id, name: organization.name, display_name: organization.display_name },
    });
    const surveyData = (await this.prisma.survey_data.findFirst({
      where: { survey_definition_id: survey.id, organization_id: organization.id },
    })) as { data: any; id: string };

    if (typeof surveyData?.data === 'string') {
      surveyData.data = JSON.parse(surveyData.data);
    }

    if (!surveyData) {
      return;
    }

    // Iterate over each section
    for (const sectionKey in Object.keys(surveyData.data?.sections)) {
      const section = surveyData.data?.sections[sectionKey];
      if (!section?.follow_up) {
        continue;
      }
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

    const compliance = await this.prisma.organization_compliance.findFirst({
      where: { compliance_definition_name: survey.name },
    });

    if (compliance) {
      await this.complianceAiResponsesRepository.deleteAiResponses(organization, compliance.compliance_definition_name, user);
    }
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
          if (!match.metadata) {
            return;
          }
          const item = {
            name: match.metadata['file_name'],
            url: match.metadata['url'],
            text: match.metadata.chunk as string,
          };
          // If the text is a string, try to parse it as JSON
          try {
            item.text = JSON.stringify(JSON.parse(item.text));
          } catch (e) {
            // Do nothing as it is not a JSON string
          }
          const page = `"${item.text} (${item.url})"`;
          const file = `"${item.text} (${item.name})"`;
          return JSON.stringify(item.url ? page : file);
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

    const session = (await this.fp.createComplianceSession({
      organization: company_name,
      user: user.coldclimate_claims.email,
      compliance_set: 'chat',
    })) as FPSession;

    if (typeof question !== 'string') {
      return await this.askSurveyQuestion(question, company_name, user, session);
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

    let response: any;
    try {
      response = await openai.chat.completions.create({
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
      if (!response.choices[0].message.content) {
        this.logger.error('No content found in response', { response });
        return;
      }
    } catch (e) {
      this.logger.error(`Error getting chat response`, e);
    }

    const message = {
      role: response.choices[0].message.role,
      content: response.choices[0].message.content,
    };

    sanitized_base.allMessages(message);

    let ai_response: any;
    // eslint-disable-next-line prefer-const
    ai_response = JSON.parse(response.choices[0].message.content);

    const references = docs.map(doc => {
      if (!doc.metadata) {
        return;
      }

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
    this.logger.info(`Sending ${sanitized_base.promptInfo.templateName} run stats to FreePlay`);
    this.fp.recordCompletion(session, vars, sanitized_base, response, start, end);

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
  async askSurveyQuestion(question: any, company_name: string, user: AuthenticatedUser, session?: FPSession, additional_context?: any): Promise<any> {
    const start = new Date();
    try {
      // Get Chat History
      let messages = (await this.cache.get(
        `openai:organizations:${company_name}:chat:sessions:${session?.sessionId}:question:${question.key}:thread`,
      )) as ChatCompletionMessageParam[];

      if (!messages) {
        messages = [] as ChatCompletionMessageParam[];
      }

      const organization = await this.prisma.organizations.findUnique({
        where: { name: company_name },
      });

      const openai = new OpenAI({
        organization: this.config.getOrThrow('OPENAI_ORG_ID'),
        apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
      });

      const { rephrased_question, docs, context } = await this.getDocumentContent(messages, question, company_name, user, session, additional_context);

      const vars = {
        component_prompt: (await this.prompts.getComponentPrompt(question)) || '',
        context: context[0] || docs,
        organization_name: organization?.display_name || company_name,
        question: additional_context ? `${rephrased_question.toString()} ${question.tooltip}` : `${question.prompt} ${question.tooltip}`,
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
        if (!doc.metadata) {
          return;
        }

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

      messages.push(
        {
          role: 'user',
          content: question.prompt,
        },
        {
          role: 'assistant',
          content: ai_response.answer || ai_response.justification,
        },
      );

      // Save the thread to the cache
      await this.cache.set(`openai:organizations:${company_name}:chat:sessions:${session?.sessionId}:question:${question.key}:thread`, messages, { ttl: 1000 * 60 * 60 });

      this.logger.info(`${ai_response.answer !== 'undefined' ? '✅ Answered' : '❌ Did NOT Answer'} ${question.idx ? question.idx : 'additional_context'}`, {
        pinecone_query: rephrased_question,
        document_content: context,
        survey_question: question.prompt,
        ai_prompt: sanitized_base,
        ai_response,
        session_id: session?.sessionId,
        ...session?.customMetadata,
      });

      if (!session) {
        return ai_response;
      }

      if (!session?.customMetadata) {
        session.customMetadata = { survey: '', organization: user.coldclimate_claims.org_id, user: user.coldclimate_claims.email };
      }

      this.metrics.increment('openai.questions.answered', { section: session.customMetadata.survey });

      const end = new Date();
      this.logger.info(`Sending ${sanitized_base.promptInfo.templateName} run stats to FreePlay`);
      this.fp.recordCompletion(session, vars, sanitized_base, response, start, end);

      return ai_response;
    } catch (error) {
      this.logger.error(`Error asking question ${question.prompt}`, { error: error.message, stack: error.stack, ...session });

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
    vectorSession?: FPSession,
    additional_context?,
  ): Promise<{ rephrased_question: string; docs: ScoredPineconeRecord[]; context: any[] }> {
    const context = [] as any[];
    const openai = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });

    /**
     * This prompt is used to condense the chat history and follow-up question into a single standalone question for the purpose
     * of providing context to the AI model to query the vector index for the most relevant information.
     */
    let rephrased_question: string = '';
    const lastMessage: string = '';

    // If there are messages, get the last message and include it in the prompt

    let vars: any;
    if (additional_context) {
      vars = {
        chat_history: JSON.stringify(messages),
        question: additional_context.prompt,
      };
    } else {
      vars = {
        chat_history: JSON.stringify(messages),
        question: question.prompt,
      };
    }

    const condense_prompt = (await this.fp.getPrompt('vector_query', vars, true)) as FormattedPrompt;

    for (const message of messages) {
      condense_prompt.allMessages({
        role: message.role,
        content: message.content?.toString() || '',
      });
    }

    const start = new Date();
    let condenseResponse: any;
    try {
      condenseResponse = await openai.chat.completions.create({
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
    } catch (e) {
      this.logger.error(`Error getting condensed response`, { error: e.message, stack: e.stack });
    }

    const end = new Date();

    if (!condenseResponse.choices[0].message.content) {
      this.logger.error('No content found in response', { condenseResponse });
      return { rephrased_question, docs: [], context };
    }

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
    let docs = (await this.pc.getContext(rephrased_question, indexName, indexName, 0.2, false)) as ScoredPineconeRecord[];

    if (docs.length < 1) {
      docs = (await this.pc.getContext(question.prompt, indexName, indexName, 0.2, false)) as ScoredPineconeRecord[];
    }

    const content = await this.extractTextFromDocument(docs as ScoredPineconeRecord<RecordMetadata>[]);

    if (content) {
      context.push(content.replace(/"/g, '').replace(/\\n/g, ' '));
    }

    if (vectorSession) {
      vectorSession.customMetadata = Object.assign({}, vectorSession.customMetadata, { snippets: content });
      this.logger.info(`Sending ${condense_prompt.promptInfo.templateName} run stats to FreePlay `);
      this.fp.recordCompletion(vectorSession, vars, condense_prompt, condenseResponse, start, end);
    }

    return { rephrased_question, docs, context };
  }

  async process_compliance(job: Job) {
    const start = new Date();
    try {
      // Destructure the necessary data from the job
      const { user, payload, integration, organization } = job.data;
      const { compliance, base_update_topic } = payload;
      // Reset the AI responses for the survey
      await this.complianceResponsesRepository.deleteAllAiResponsesByName(organization, compliance, user);

      // Log the start of the survey processing
      this.logger.info(`✅ Started processing compliance set ${compliance.compliance_definition_name} for ${organization.name}`, {
        user,
        compliance: compliance.compliance_definition_name,
        integration,
        organization,
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
              this.logger.error(`Error deleting vector ${vector.id}`, { error: e.message, stack: e.stack, job: job.id });
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
        compliance_set: compliance.compliance_definition_name,
        base_update_topic,
        organization: {
          name: organization.name,
          id: organization.id,
        },
        user: {
          email: user.coldclimate_claims.email,
          id: user.id || user.coldclimate_claims.id,
        },
      });

      // Initialize the category context

      // Get the sections of the survey
      const sections = await this.prisma.compliance_sections.findMany({
        where: { compliance_definition_name: compliance.compliance_definition_name },
        select: {
          id: true,
          key: true,
          title: true,
          compliance_section_group_id: true,
          order: true,
          dependency_expression: true,
          compliance_questions: {
            select: {
              id: true,
              key: true,
              prompt: true,
              component: true,
              tooltip: true,
              placeholder: true,
              rubric: true,
              options: true,
              dependency_expression: true,
              question_summary: true,
              additional_context: true,
              order: true,
              compliance_section_id: true,
            },
            orderBy: {
              order: 'asc',
            },
          },
        },
      });

      // Initialize the prompts service with the survey name so that it has the correct context for darkly
      this.prompts = await new PromptsService(this.darkly, compliance.compliance_definition_name, organization, this.prisma).initialize();

      job.data.totalJobs = sections.map(section => section.compliance_questions.length).reduce((a, b) => a + b, 0);
      job.data.currentJob = 0;

      job.update(job.data);

      // Initialize the requests array
      const reqs: any[] = [];

      // Iterate over each section
      for (const section of sections as unknown as compliance_sections[]) {
        // Create a session for the survey
        const session = (await this.fp.createComplianceSession({
          compliance_set: compliance.compliance_definition_name,
          organization: organization.name,
          user: user.coldclimate_claims.email,
          section: section.key,
        })) as FPSession;

        // Log the creation of the session
        this.logger.info(`Session created for compliance_set: ${compliance.compliance_definition_name} section: ${section.key}`, {
          section_key: section.key,
          section_id: section.id,
          section_title: section.title,
          organization: organization.name,
          user: user.coldclimate_claims.email,
          compliance_name: compliance.compliance_definition_name,
        });

        try {
          reqs.push(this.processComplianceSection(job, section, organization, user, session));
        } catch (e) {
          this.logger.error(`Error processing survey ${job.data.survey.name}`, { error: e.message, stack: e.stack, job: job.id });
          this.sendMetrics('organization.compliance.section', 'chat_service.process_compliance', 'process', 'failed', {
            start,

            sendEvent: true,
            tags: {
              compliance_set: job.data.survey?.name,
              organization: job.data.organization?.name,
              user: job.data.user?.coldclimate_claims?.email,
              error: e.message,
            },
          });
        }
      }

      await Promise.all(reqs);

      await this.complianceSectionsCacheRepository.clearCachedActiveSections(organization, job);

      // Log the end of the survey processing
      this.logger.info(`✅ Finished processing survey ${compliance.compliance_definition_name}`, {
        compliance_set: compliance.compliance_definition_name,
        user,
        integration,
        organization,
      });
    } catch (e) {
      this.logger.error(`Error processing survey ${job.data.survey.name}`, { error: e.message, stack: e.stack, job: job.id });
    }
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

      // Reset the AI responses for the survey
      await this.resetAIResponses(user, survey, organization);

      // Log the start of the survey processing
      this.logger.info(`✅ Started processing survey ${survey.name}`, {
        compliance: survey.name,
        user,
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
        compliance_title: survey?.definition?.title,
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
        let session;

        try {
          session = (await this.fp.createComplianceSession({
            compliance_set: survey.name,
            organization: organization.name,
            user: user.coldclimate_claims.email,
            section: section,
          })) as FPSession;
        } catch (e) {
          this.logger.error(`Error creating session for survey ${survey.name}`, { error: e.message, stack: e.stack, job: job.id });
        }

        // Log the creation of the session
        this.logger.info(`Session created for survey ${survey.name}`, session);

        // Create a new thread for each section run
        reqs.push(() => {
          this.processSection(job, section, sdx, sections, definition, integration, organization, category_context, user, session).then(() => {
            this.sendMetrics('organization.compliance.section.question', 'chat_service.process_survey', 'process', 'failed', {
              start,
              sendEvent: true,
              tags: {
                compliance_set: job.data.survey?.name,
                organization: job.data.organization?.name,
                user: job.data.user?.coldclimate_claims?.email,
                section,
                session,
              },
            });
          });
        });
      }

      // Wait for all the sections to be processed
      await Promise.all(reqs);

      // Log the end of the survey processing
      this.logger.info(`✅ Finished processing survey ${survey.definition.title}`, {
        survey: survey.definition.title,
        user,
        integration,
        organization,
        on_update_url,
      });
    } catch (e) {
      this.logger.error(`Error processing survey ${job.data.survey.name}`, { error: e.message, stack: e.stack, job: job.id });

      this.sendMetrics('organization.compliance.section', 'chat_service.process_survey', 'process', 'failed', {
        start,
        sendEvent: true,
        tags: {
          compliance_set: job.data.survey?.name,
          organization: job.data.organization?.name,
          user: job.data.user?.coldclimate_claims?.email,
          error: e.message,
        },
      });
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
  public async processSection(job: Job, section: string, sdx: number, sections: string[], definition, integration, organization, category_context, user, session: FPSession) {
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
          const value = await this.askSurveyQuestion(follow_up, organization.name, job.data.user, session);

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

            this.sendMetrics('organization.compliance.section.question', 'chat_service.process_section', 'process', 'completed', {
              start,
              sendEvent: false,
              tags: {
                compliance_set: job.data.survey?.name,
                organization: job.data.organization?.name,
                user: job.data.user?.coldclimate_claims?.email,
                section,
                question: item,
                session,
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
            const additionalValue = await this.askSurveyQuestion(follow_up, organization.name, job.data.user, session, follow_up['additional_context']);

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
            }

            this.sendMetrics('organization.compliance.section.question', 'chat_service.process_section', 'process', 'completed', {
              start,
              sendEvent: false,
              tags: {
                compliance_set: job.data.survey?.name,
                organization: job.data.organization?.name,
                user: job.data.user?.coldclimate_claims?.email,
                section,
                question: item,
                session,
              },
            });

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
          this.sendMetrics('organization.compliance.section.question', 'chat_service.process_section', 'process', 'failed', {
            start,
            sendEvent: true,
            tags: {
              compliance_set: job.data.survey?.name,
              organization: job.data.organization?.name,
              user: job.data.user?.coldclimate_claims?.email,
              section,
              question: item,
              session,
              error: error,
            },
          });
          this.logger.error(`Error processing ${section}.${item}: ${error.message}`, { error: error.message, stack: error.stack, job: job.id });
        }
      }

      this.logger.info(`✅ Finished processing ${section}: ${definition.sections[section].title}`, { section });
    } catch (e) {
      this.logger.error(`Error processing ${section}: ${e.message}`, { error: e.message, stack: e.stack, job: job.id });

      this.sendMetrics('organization.compliance.section.question', 'chat_service.process_section', 'process', 'failed', {
        start,
        sendEvent: true,
        tags: {
          compliance_set: job.data.survey?.name,
          organization: job.data.organization?.name,
          user: job.data.user?.coldclimate_claims?.email,
          section,
          session,
          error: e,
        },
      });

      throw e;
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
  public async processComplianceSection(job: Job, section: any, organization, user, session: FPSession) {
    const start = new Date();

    try {
      await job.log(`Section | ${section} : ${job.data.totalJobs.length}`);
      this.logger.info(`Processing ${section}: ${section.title}`, { section });

      // get the followup items for the section
      const items = section.compliance_questions;

      // iterate over each followup item
      for (const item of items) {
        try {
          if (await this.isDuplicateOrCanceled(organization, job, section, item)) {
            continue;
          }

          await job.log(`Question | section: ${section} question: ${item} (${items.indexOf(item)} of ${items.length})`);

          this.logger.info(`Processing Question | ${section.key}.${item.key}`, {
            section: section.key,
            key: item.key,
          });
          await this.complianceSectionsCacheRepository.setCachedActiveQuestion(item, section, organization, job);
          // create a new run for each followup item
          const response = await this.askSurveyQuestion(item, organization.name, job.data.user, session);

          // update the survey with the response
          if (response) {
            item.ai_response = response;

            this.logger.info(`Ai responded: ${section.key}.${item.key}`, {
              compliance_set: job.data.payload?.compliance?.compliance_definition_name,
              section: section.title,
              key: item.key,
              question: item.prompt,
              organization: organization.name,
              answer: item.value,
              user: user.coldclimate_claims.email,
              ai_response: response,
            });

            this.sendMetrics('organization.compliance.section.question', 'chat_service.process_compliance_section', 'process', 'completed', {
              start,
              sendEvent: false,
              tags: {
                compliance_set: job.data.survey?.name,
                organization: job.data.organization?.name,
                user: job.data.user?.coldclimate_claims?.email,
                section,
                question: item,
                session,
              },
            });
          }
          // if there is additional context, create a new run for it
          if (item.additional_context && Object.keys(item.additional_context).length > 0) {
            if (item.additional_context.value) {
              this.logger.info(`Skipping ${section.key}.${item.key}.additional_context; it has already been answered`, {
                section: section,
                key: item,
                additional_context: item.additional_context,
              });
              continue;
            }

            this.logger.info(`Processing Question | ${section.key}.${item.key}.additional_context: ${item.prompt}`);
            const additionalValue = await this.askSurveyQuestion(item, organization.name, job.data.user, session, item['additional_context']);

            if (additionalValue) {
              item.additional_context.ai_response = additionalValue;
              item.additional_context.ai_answered = typeof additionalValue.answer !== 'undefined';

              this.logger.info(`Ai responded: ${section.key}.${item.key}`, {
                compliance_set: job.data.payload?.compliance?.compliance_definition_name,
                section: section.title,
                key: item.key,
                question: item.prompt,
                organization: organization.name,
                answer: item.value,
                user: user.coldclimate_claims.email,
                isAdditionalContext: true,
                ai_response: additionalValue,
              });

              this.sendMetrics('organization.compliance.section.question.additional_context', 'chat_service.process_compliance_section', 'process', 'completed', {
                start,
                sendEvent: false,
                tags: {
                  compliance_set: job.data.survey?.name,
                  organization: job.data.organization?.name,
                  user: job.data.user?.coldclimate_claims?.email,
                  section,
                  question: item,
                  session,
                },
              });
            }

            item.additional_context.ai_response = additionalValue;
            item.additional_context.ai_attempted = true;
          }

          const references = await this.filterService.filterReferences(response.references);

          await this.cache.delete(this.complianceResponsesRepository.getCacheKey(organization, job.data.payload?.compliance?.compliance_definition_name), true);

          await this.prisma.organization_compliance_ai_responses.upsert({
            where: {
              orgCompQuestId: {
                organization_compliance_id: job.data.payload?.compliance?.id,
                compliance_question_id: item.id,
              },
            },
            create: {
              id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceAIResponse).scopedId,
              justification: response.justification,
              answer: response.answer,
              references: references,
              sources: response.sources || response.source,
              compliance_question_id: item.id,
              additional_context: item.additional_context,
              organization_id: organization.id,
              organization_compliance_id: job.data.payload.compliance.id,
            },
            update: {
              justification: response.justification,
              answer: response.answer,
              references: references,
              sources: response.sources || response.source,
              additional_context: item.additional_context,
            },
          });
          /*
          for (const file of item.ai_response.references) {
            if (!file.url) {
              const orgFile = await this.prisma.organization_files.findUnique({
                where: {
                  s3Key: {
                    organization_id: organization.id,
                    bucket: 'cold-api-uploaded-files',
                    key: `${process.env.NODE_ENV}/${organization.name}/${file.file}`,
                  },
                },
              });

              if (!orgFile) {
                this.logger.error(`File not found for ${file.file}`, { file });
                continue;
              }

              await this.prisma.organization_compliance_ai_response_files.create({
                data: {
                  id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceAiResponseFile).scopedId,
                  organization_compliance_ai_response_id: ai_response.id,
                  organization_files_id: orgFile?.id,
                  organization_compliance_id: job.data.payload.compliance.id,
                  organization_id: organization.id,
                },
              });
            }
          };
*/
          /*await this.prisma.compliance_responses.upsert({
            where: {
              orgCompQuestId: {
                organization_compliance_id: job.data.payload?.compliance?.id,
                compliance_question_id: item.id,
              },
            },
            create: {
              compliance_question_id: item.id,
              compliance_section_id: section.id,
              compliance_section_group_id: section.compliance_section_group_id,
              organization_id: organization.id,
              compliance_definition_name: job.data.payload?.compliance?.compliance_definition_name,
              organization_compliance_id: job.data.payload.compliance.id,
              organization_compliance_ai_response_id: ai_response.id,
            },
            update: {
              compliance_question_id: item.id,
              compliance_section_id: section.id,
              compliance_section_group_id: section.compliance_section_group_id,
              organization_id: organization.id,
              compliance_definition_name: job.data.payload?.compliance?.compliance_definition_name,
              organization_compliance_id: job.data.payload.compliance.id,
              organization_compliance_ai_response_id: ai_response.id,
            },
          });*/

          // publish the response to the rabbit queue
          await this.rabbit.publish(`cold.core.api.compliance_responses`, {
            event: 'ai_response.updated',
            data: {
              compliance_section_group_id: `${section.compliance_section_group_id}`,
              compliance_section_id: `${section.id}`,
              organization: { id: organization.id },
              user: user,
              compliance_set: job.data.payload?.compliance.compliance_definition_name,
              token: job.data?.payload?.token,
              reply_to: `ui/${process.env.NODE_ENV}/${organization.id}/${job.data?.payload?.compliance?.compliance_definition_name}/${section.compliance_section_group_id}/${section.id}`,
            },
            from: 'cold.platform.openai',
          });

          // report the progress of the job
          job.data.currentJob = job.data.currentJob + 1;
          await job.update(job.data);
          await job.progress(job.data.currentJob / job.data.totalJobs);

          // delete the question from the cache since it's been processed
          await this.complianceSectionsCacheRepository.deleteCachedActiveQuestion(item, section, organization, job);
        } catch (error) {
          this.sendMetrics('organization.compliance.section.question', 'chat_service.process_compliance_section', 'process', 'failed', {
            start,
            sendEvent: true,
            tags: {
              compliance_set: job.data.survey?.name,
              organization: job.data.organization?.name,
              user: job.data.user?.coldclimate_claims?.email,
              section,
              question: item,
              session,
              error: error,
            },
          });

          this.logger.error(`Error processing ${section.key}.${item.key}: ${error.message}`, { message: error.message, stack: error.stack, job: job.id });
          await this.complianceSectionsCacheRepository.deleteCachedActiveQuestion(item, section, organization, job);
        }
      }

      // delete the entire section from the cache since it's been processed
      await this.complianceSectionsCacheRepository.deleteCachedActiveSection(section, organization, job);

      this.logger.info(`✅ Finished processing ${section.key}: ${section.title}`, { section });
    } catch (e) {
      await this.complianceSectionsCacheRepository.deleteCachedActiveSection(section, organization, job);

      this.sendMetrics('organization.compliance.section', 'chat_service.process_compliance_section', 'process', 'failed', {
        start,
        sendEvent: true,
        tags: {
          compliance_set: job.data.survey?.name,
          organization: job.data.organization?.name,
          user: job.data.user?.coldclimate_claims?.email,
          section,
          session,
          error: e,
        },
      });

      this.logger.error(`Error processing ${section.key}: ${e.message}`, { error: e.message, stack: e.stack, job: job.id });
      throw e;
    }

    await this.complianceResponsesRepository.getScoredComplianceQuestionsByName(organization, job.data.payload?.compliance?.compliance_definition_name, user, { onlyCounts: true });

    return true;
  }

  /**
   * Check if the job is a duplicate or has been canceled
   * @param organization
   * @param job
   * @param section
   * @param item
   * @private
   */
  private async isDuplicateOrCanceled(organization: organizations, job: Job, section: any, item: any) {
    const exists = await this.queue.getJob(job.id);
    const sectionKey = typeof section === 'string' ? section : section['key'];
    const itemKey = typeof item === 'string' ? item : item['key'];

    if (!exists || !exists.data.payload.compliance) {
      this.logger.warn(`Job ${job.id} no longer found in queue; will not process question ${sectionKey}:${itemKey}`);
      //await this.cache.delete(`jobs:${job.name}:${organization.id}:${job.data.payload.compliance.compliance_id}`);
      return true;
    }

    const jobs = (await this.cache.get(`organizations:${organization.id}:jobs:${job.name}:${job.data.payload.compliance.compliance_id}`)) as number[];

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

    return false;
  }
}
