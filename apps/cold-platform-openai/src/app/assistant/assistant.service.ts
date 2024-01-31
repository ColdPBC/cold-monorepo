import { BaseWorker, ColdRabbitService, PrismaService } from '@coldpbc/nest';
import { Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import OpenAI from 'openai';
import { get, has, pick } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { integrations, organizations, service_definitions } from '@prisma/client';
import { Job } from 'bull';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, OnQueueProgress } from '@nestjs/bull';
import { OpenAIResponse } from './validator/validator';
import { Prompts } from './surveys/prompts/prompts';

@Injectable()
export class AssistantService extends BaseWorker implements OnModuleInit {
  client: OpenAI;
  service: service_definitions;
  topic: string = '';
  prompts = new Prompts();

  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService, private rabbit: ColdRabbitService) {
    super(AssistantService.name);
    this.client = new OpenAI({ organization: process.env['OPENAI_ORG_ID'], apiKey: process.env['OPENAI_API_KEY'] });
  }

  async onModuleInit(): Promise<void> {
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-openai/package.json');

    try {
      this.topic = `${get(this.service, 'definition.mqtt.publish_options.base_topic', `/platform/openai`)}/${this.config.getOrThrow('NODE_ENV')}/#`;
    } catch (e) {
      this.logger.error(e.message, e);
      try {
        this.service = await this.prisma.service_definitions.findUnique({
          where: {
            name: pkg.name,
          },
        });

        this.logger.warn('Unable to register service with RabbitMQ, retrieved service definition from database.');
      } catch (e) {
        this.handleError(e);
      }
    }
    //this.logger.log('OpenAI Service initialized');
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

  async send(thread: OpenAI.Beta.Threads.Thread, integration: integrations, org: organizations) {
    const run = await this.client.beta.threads.runs.create(thread.id, {
      assistant_id: integration.id,
      instructions: this.prompts.getBasePrompt(org.display_name), // Assuming getBasePrompt() is defined.
    });

    this.logger.info(`Created run ${run.id} for thread ${thread.id}`, {
      run,
      thread,
      organization: integration['organization'],
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

        response = new OpenAIResponse(response);

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
        } else {
          return response;
        }
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
    item: {
      prompt: string;
      component: string;
      options: any;
    },
    isFolloup = false,
    org: organizations,
    category_context?: string,
  ): Promise<any> {
    try {
      if (category_context) {
        category_context = `Consider the following context when answering questions: ${category_context} and `;
      } else {
        category_context = '';
      }

      let message;
      if (!isFolloup) {
        message = await this.client.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: `${category_context}${this.prompts.getComponentPrompt(item.component)}.  Here is the "question" JSON object: \`\`\`json ${JSON.stringify(item)}\`\`\``,
        });
      } else {
        message = await this.client.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: `${category_context} this next JSON question is specifically related to the previous question and answer. ${this.prompts.getComponentPrompt(
            item.component,
          )}.  Here is the "question" JSON object: \`\`\`json ${JSON.stringify(item)}\`\`\``,
        });
      }

      this.logger.info(`Created message for ${item.prompt}`, { ...item, message });
      return await this.send(thread, integration, org);
    } catch (e) {
      this.logger.error(e.message, e);
      throw e;
    }
  }

  async process_survey(job: Job) {
    const { survey, user, compliance, integration, organization } = job.data;
    this.setTags({
      survey: survey.definition.title,
      organization: {
        name: organization.name,
        id: organization.id,
      },
      user: {
        email: user.coldclimate_claims.email,
        id: user.id,
      },
    });
    this.logger.info(`Processing survey ${survey.definition.title} for compliance ${compliance.name}`);

    let category_context;

    if (!survey.definition.category_description || survey.definition.category_description === 'undefined') {
      category_context = null;
    }

    const definition = survey.definition;

    const sections = Object.keys(definition.sections);

    const sdx = 0;

    // iterate over each section key
    for (const section of sections) {
      await job.log(`Section | ${section}:${sdx + 1} of ${sections.length}`);
      this.setTags({ section });
      this.logger.info(`Processing ${section}: ${definition.sections[section].title}`);

      // get the followup items for the section
      const items = Object.keys(definition.sections[section].follow_up);

      // iterate over each followup item
      for (const item of items) {
        const idx = parseInt(item.split('-')[1]);

        await job.log(`Question | section: ${section} question: ${item} of ${items.length}`);
        const follow_up = definition.sections[section].follow_up[item];
        this.setTags({ question: { key: item, prompt: follow_up.prompt } });

        if (has(item, 'ai_response.answer') && !has(item, 'ai_response.what_we_need')) {
          this.logger.info(`Skipping ${section}.${item}: ${follow_up.prompt}; it has already been answered`, {
            section_item: definition.sections[section].follow_up[item],
          });
          continue;
        }

        // create a new thread for each followup item
        const thread = await this.client.beta.threads.create();
        this.setTags({ thread: thread.id });

        this.logger.info(`Created Thread | thread.id: ${thread.id} for ${section}.${item}`, {
          thread,
          section_item: item,
          section,
        });

        this.logger.info(`Creating Message | ${section}.${item}: ${follow_up.prompt}`);
        // create a new run for each followup item
        let value = await this.createMessage(thread, integration, follow_up, false, organization, category_context);

        value = this.clearValuesOnError(value);

        // update the survey with the response
        definition.sections[section].follow_up[item].ai_response = value;
        definition.sections[section].follow_up[item].ai_answered = !!has(value, 'answer');
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
          let additionalValue = await this.createMessage(thread, integration, follow_up['additional_context'], true, organization, category_context);

          additionalValue = this.clearValuesOnError(additionalValue);

          definition.sections[section].follow_up[item].additional_context.ai_response = additionalValue;
          definition.sections[section].follow_up[item].additional_context.ai_answered = !!additionalValue.answer;
          definition.sections[section].follow_up[item].additional_context.ai_attempted = true;
        }

        // publish the response to the rabbit queue
        await this.rabbit.publish(
          `cold.core.api.survey_data`,
          {
            data: {
              organization: { id: integration.organization_id },
              user,
              survey,
            },
            from: 'cold.platform.openai',
          },
          'survey_data.updated',
          {
            exchange: 'amq.direct',
            timeout: 5000,
          },
        );

        await job.progress(idx / items.length);
      }
    }
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
    if (job.finishedOn) {
      return `Duration: ${this.getDuration(job)} seconds`;
    } else {
      return `Elapsed: ${(new Date().getTime() - job.processedOn) / 1000} seconds`;
    }
  }

  getDuration(job: Job) {
    return (job.finishedOn - job.processedOn) / 1000;
  }

  @OnQueueActive()
  async onActive(job: Job) {
    const message = `Processing ${job.name} | id: ${job.id} title: ${job.data.survey.definition.title} | started: ${new Date(job.processedOn).toUTCString()}`;
    await job.log(message);
  }

  @OnQueueFailed()
  async onFailed(job: Job) {
    await job.log(`${job.name} Job FAILED | id: ${job.id} reason: ${job.failedReason} | ${this.getTimerString(job)}`);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    await job.log(`${job.name} Job COMPLETED | id: ${job.id} completed_on: ${new Date(job.finishedOn).toUTCString()} | ${this.getTimerString(job)}`);
  }

  @OnQueueProgress()
  async onProgress(job: Job) {
    await job.log(`${job.name} Job PROGRESS | id: ${job.id} progress: ${(await job.progress()) * 100}% | ${this.getTimerString(job)}`);
  }
}
