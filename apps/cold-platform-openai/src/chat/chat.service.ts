import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, CacheService, ColdRabbitService, DarklyService, PrismaService } from '@coldpbc/nest';
import { PineconeService } from '../pinecone/pinecone.service';
import { LangchainService } from '../langchain/langchain.service';
import { ConfigService } from '@nestjs/config';
import { PromptsService } from '../prompts/prompts.service';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { has, set } from 'lodash';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

@Injectable()
export class ChatService extends BaseWorker implements OnModuleInit {
  openAIapiKey: string;

  constructor(
    private readonly config: ConfigService,
    private readonly pc: PineconeService,
    private readonly lc: LangchainService,
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

  async askQuestion(indexName: string, question: any, prompts: PromptsService, company_name: string): Promise<any> {
    const vectorStore = await this.pc.getVectorStore(indexName);

    const sanitized_base = await prompts.getPrompt(question);

    // Create Template from base prompt
    const baseTemplate = PromptTemplate.fromTemplate(sanitized_base);

    const formattedPromptTemplate = await baseTemplate.format({
      question: JSON.stringify(question),
      company: company_name,
      chat_history: [],
      context: vectorStore,
    });

    const model = new OpenAI({
      temperature: 0.5,
      modelName: prompts.model,
      openAIApiKey: this.openAIapiKey,
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
      qaTemplate: sanitized_base,
      questionGeneratorTemplate: prompts.condense_template,
      returnSourceDocuments: true,
    });

    const response = await chain.invoke({
      query: formattedPromptTemplate,
      question: formattedPromptTemplate,
      includeSourceDocuments: true,
      chat_history: [],
    });

    const answer = JSON.parse(response.text);
    this.logger.info(`Answered ${question.prompt} with ${answer.answer}`, {
      answer,
      formattedPromptTemplate,
    });

    set(answer, 'reference', response.sourceDocuments);

    return answer;
  }

  async process_survey(job: Job) {
    const { survey, user, compliance, integration, organization, on_update_url } = job.data;
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
    const prompts = await new PromptsService(this.darkly, survey.name, organization, this.prisma).initialize();

    // iterate over each section key
    for (const section of sections) {
      // create a new thread for each section run
      reqs.push(this.processSection(job, section, sdx, sections, definition, integration, organization, category_context, user, survey, prompts));
      //await this.processSection(job, section, sdx, sections, definition, thread, integration, organization, category_context, user, survey);
    }

    await Promise.all(reqs);
  }

  public async processSection(job: Job, section: string, sdx: number, sections: string[], definition, integration, organization, category_context, user, survey, prompts) {
    await job.log(`Section | ${section}:${sdx + 1} of ${sections.length}`);
    this.setTags({ section });
    this.logger.info(`Processing ${section}: ${definition.sections[section].title}`);

    // get the followup items for the section
    const items = Object.keys(definition.sections[section].follow_up);

    // iterate over each followup item
    for (const item of items) {
      if (await this.isDuplicateOrCanceled(organization, job, section, item)) {
        continue;
      }

      const idx = parseInt(item.split('-')[1]);

      await job.log(`Question | section: ${section} question: ${item} (${items.indexOf(item)} of ${items.length})`);
      const follow_up = definition.sections[section].follow_up[item];
      this.setTags({ question: { key: item, prompt: follow_up.prompt } });

      if (follow_up?.ai_response?.answer && !has(follow_up, 'ai_response.what_we_need')) {
        this.logger.info(`Skipping ${section}.${item}: ${follow_up.prompt}; it has already been answered`, {
          section_item: definition.sections[section].follow_up[item],
        });
        continue;
      }

      this.logger.info(`Sending Message | ${section}.${item}: ${follow_up.prompt}`);
      // create a new run for each followup item
      const value = await this.askQuestion(organization.name, follow_up, prompts, organization.display_name);

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
        const additionalValue = await this.askQuestion(organization.name, follow_up['additional_context'], prompts, organization.display_name);

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
    }
  }

  private async isDuplicateOrCanceled(organization, job: Job, section: string, item: string) {
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
