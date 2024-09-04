import { BaseWorker, CacheService, ColdRabbitService, DarklyService, PrismaService } from '@coldpbc/nest';
import { Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import OpenAI from 'openai';
import { get, has, pick } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { integrations, organizations, service_definitions } from '@prisma/client';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { OpenAIResponse } from './validator/validator';
import { PromptsService } from '../prompts/prompts.service';

@Injectable()
export class AssistantService extends BaseWorker implements OnModuleInit {
  client: OpenAI;
  service: service_definitions;
  topic = '';
  model: string;

  constructor(
    readonly config: ConfigService,
    readonly prisma: PrismaService,
    readonly rabbit: ColdRabbitService,
    readonly cache: CacheService,
    readonly darkly: DarklyService,
    @InjectQueue('openai') readonly queue: Queue,
  ) {
    super(AssistantService.name);
    this.client = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onModuleInit(): Promise<void> {
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-openai/package.json');

    try {
      this.topic = `${get(this.service, 'definition.mqtt.publish_options.base_topic', `/platform/openai`)}/${this.config.getOrThrow('NODE_ENV')}/#`;
    } catch (e) {
      this.logger.error(e.message, e);
      try {
        this.service = (await this.prisma.service_definitions.findUnique({
          where: {
            name: pkg.name,
          },
        })) as service_definitions;

        this.logger.warn('Unable to register service with RabbitMQ, retrieved service definition from database.');
      } catch (e) {
        this.handleError(e);
      }
    }

    this.model = await this.darkly.getStringFlag('dynamic-gpt-assistant-model', 'gpt-3.5');
  }

  handleError(e, meta?) {
    if (e.status === 404) {
      throw new NotFoundException(e.message);
    }
    if (e.status > 399 && e.status < 500) {
      this.logger.error(e.message, meta);
      throw new UnprocessableEntityException(e.message);
    }
  }

  handleMessage(topic: string, message: Buffer) {
    const msg = JSON.parse(message.toString());
    this.logger.info(`Received message on ${topic}`, msg);
    throw new Error('Method not implemented.');
  }

  async send(thread: OpenAI.Beta.Threads.Thread, integration: integrations, org: organizations, prompts: PromptsService, item: any): Promise<any> {
    const run = await this.client.beta.threads.runs.create(thread.id, {
      assistant_id: integration.id,
      model: this.model,
      instructions: await prompts.getPrompt(item, null, true),
    });

    this.logger.info(`Created run ${run.id} for thread ${thread.id}`, {
      run,
      thread,
      organization: org,
    });

    let status: { status: string } = { status: 'running' };
    let in_progress_logged = false; //only log the first time in_progress is received

    let response: any;

    while (status.status !== 'completed' && status.status !== 'failed') {
      status = await this.client.beta.threads.runs.retrieve(thread.id, run.id);

      if (!in_progress_logged) this.logger.info(`Received status ${status.status}`, { ...status });
      in_progress_logged = true;

      if (status.status === 'requires_action') {
        this.logger.info(`Thread: ${thread.id} | Status: ${status.status}`);

        const toolCalls = status['required_action'].submit_tool_outputs.tool_calls;

        response = status['required_action'].submit_tool_outputs.tool_calls[0].function.arguments;

        //response = new OpenAIResponse(response);

        // Create an array of tool outputs to submit, matching the schema
        const toolOutputs = toolCalls.map(toolCall => ({
          tool_call_id: toolCall.id,
          output: JSON.stringify(response),
        }));

        // Submit the array of tool outputs back
        await this.client.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
          tool_outputs: toolOutputs,
        });
      }
    }

    try {
      if (status.status === 'failed') {
        this.logger.error(`OpenAI failed to process the request.`, {
          ...pick(status, ['id', 'status', 'created', 'modified', 'assistant_id', 'thread_id', 'file_ids', 'last_error']),
        });

        return {
          error: {
            message: 'OpenAI failed to process the request.',
            ...pick(status, ['id', 'status', 'created', 'modified', 'assistant_id', 'thread_id', 'file_ids', 'last_error']),
          },
        };
      }

      try {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }

        return response;
      } catch (e) {
        return { error: { message: 'failed to process response JSON', response } };
      }
    } catch (e) {
      this.logger.error(e.message, e);
      return response;
    }
  }

  async createMessage(
    thread: OpenAI.Beta.Threads.Thread,
    integration: integrations,
    questionKey: string,
    item: {
      prompt: string;
      component: string;
      options: any;
    },
    isFollowUp = false, // this is a follow-up question that should only be presented if the previous question was answered
    org: organizations,
    prompts: PromptsService,
    category_context?: string,
  ): Promise<any> {
    try {
      if (category_context) {
        category_context = `Consider the following context when answering questions: ${category_context} `;
      } else {
        category_context = '';
      }

      let message;
      let prompt = await prompts.getPrompt(item);
      if (!isFollowUp) {
        message = await this.client.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: prompt,
        });
      } else {
        //append category and followup prompt to component prompt
        prompt = `${category_context} this next question is specifically related to your previous answer. ${prompt}`;
        message = await this.client.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: prompt,
        });
      }

      this.logger.info(`Created message for ${item.prompt}`, { ...item, message, prompt });

      return await this.send(thread, integration, org, prompts, item);
    } catch (e) {
      this.logger.error(e.message, e);
      throw e;
    }
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

    //initialize prompts service with survey name so that it has the correct context for darkly
    const prompts = await new PromptsService(this.darkly, survey.name, organization, this.prisma).initialize();

    // iterate over each section key
    for (const section of sections) {
      // create a new thread for each section run
      const thread = await this.client.beta.threads.create();

      await this.sleep((Math.floor(Math.random() * 8) + 3) * 2000);

      await this.processSection(job, section, sdx, sections, definition, thread, integration, organization, category_context, user, survey, prompts);
      //reqs.push(this.processSection(job, section, sdx, sections, definition, thread, integration, organization, category_context, user, survey, prompts));
      //await this.processSection(job, section, sdx, sections, definition, thread, integration, organization, category_context, user, survey);
    }

    // await Promise.all(reqs);
  }

  public async processSection(
    job: Job,
    section: string,
    sdx: number,
    sections: string[],
    definition,
    thread: OpenAI.Beta.Threads.Thread,
    integration,
    organization,
    category_context,
    user,
    survey,
    prompts: PromptsService,
  ) {
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

      this.setTags({ thread: thread.id });

      this.logger.info(`Created Thread | thread.id: ${thread.id} for ${section}.${item}`, {
        thread,
        section_item: item,
        section,
      });

      this.logger.info(`Creating Message | ${section}.${item}: ${follow_up.prompt}`);
      // create a new run for each followup item
      //await this.sleep((Math.floor(Math.random() * 8) + 3) * 500);

      let value = await this.createMessage(thread, integration, item, follow_up, false, organization, prompts, category_context);

      value = this.clearValuesOnError(value);

      if (value) {
        // update the survey with the response
        definition.sections[section].follow_up[item].ai_response = value;
        //definition.sections[section].follow_up[item].ai_answered = typeof value.answer !== 'undefined';
      }

      definition.sections[section].follow_up[item].ai_attempted = true;

      // if there is additional context, create a new run for it
      if (follow_up['additional_context']) {
        this.logger.info(`Creating Message | ${section}.${item}.additional_context: ${follow_up.prompt}`);

        // await this.sleep((Math.floor(Math.random() * 8) + 3) * 1000);

        let additionalValue = await this.createMessage(thread, integration, item, follow_up['additional_context'], true, organization, prompts, category_context);

        additionalValue = this.clearValuesOnError(additionalValue);

        if (additionalValue) {
          definition.sections[section].follow_up[item].additional_context.ai_response = additionalValue;

          //definition.sections[section].follow_up[item].additional_context.ai_answered = has(additionalValue, 'answer');
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
    const jobs = (await this.cache.get(`organizations:${job.data.organization.id}:jobs:${job.name}:${job.data.payload.compliance.compliance_id}`)) as number[];

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

  clearValuesOnError(value: any) {
    if (!value) return value;

    if (typeof value === 'string') {
      value = JSON.parse(value);
    }

    if (value?.error) {
      value.answer = null;
      value.justification = null;
      value.what_we_need = null;
    } else if (value?.what_we_need && value?.answer) {
      value.answer = null;
    }

    return value;
  }

  getTimerString(job: Job) {
    if (!job.processedOn) {
      return 'Waiting to process';
    }

    if (job.finishedOn) {
      return `Duration: ${this.getDuration(job)} seconds`;
    } else {
      return `Elapsed: ${(new Date().getTime() - job.processedOn) / 1000} seconds`;
    }
  }

  getDuration(job: Job) {
    if (!job.finishedOn || !job.processedOn) {
      return 0;
    }

    return (job.finishedOn - job.processedOn) / 1000;
  }
}
