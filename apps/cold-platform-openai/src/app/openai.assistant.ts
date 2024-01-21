import { BaseWorker, ColdRabbitService, PrismaService, S3Service } from '@coldpbc/nest';
import { service_definitions } from '../../../../libs/nest/src/validation/generated/modelSchema/service_definitionsSchema';
import { Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import OpenAI from 'openai';
import { get } from 'lodash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiAssistant extends BaseWorker implements OnModuleInit {
  client: OpenAI;
  //socket: MqttClient;
  service: service_definitions;
  topic: string = '';

  constructor(
    //private readonly mqtt: MqttService,
    private readonly axios: HttpService,
    private readonly s3: S3Service,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private rabbit: ColdRabbitService,
  ) {
    super(OpenaiAssistant.name);
    this.client = new OpenAI({ organization: process.env['OPENAI_ORG_ID'], apiKey: process.env['OPENAI_API_KEY'] });
  }

  async onModuleInit(): Promise<void> {
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-openai/package.json');

    try {
      this.topic = `${get(this.service, 'definition.mqtt.publish_options.base_topic', `/platform/openai`)}/${this.config.getOrThrow('NODE_ENV')}/#`;
      // this.socket = this.mqtt.connect();
      // await this.initListener();
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
    this.logger.log('OpenAI Service initialized');
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

  subscribe(): void {
    /* if (this.socket) {
       this.socket.subscribe(this.topic);
     }*/
  }

  async initListener() {
    // this.socket.addListener('connect', this.subscribe.bind(this));
    // this.socket.addListener('error', this.handleError.bind(this));
    // this.socket.addListener('message', this.handleMessage.bind(this));
  }

  handleMessage(topic: string, message: Buffer) {
    const msg = JSON.parse(message.toString());
    this.logger.info(`Received message on ${topic}`, msg);
    throw new Error('Method not implemented.');
  }

  getBasePrompt() {
    /*const base: string =
      'The user will provide you with a JSON object which contains the following information: \n' +
      '- idx: The index of the question \n' +
      '- prompt: The question to be answered \n' +
      '- component: used to determine how to structure your answer \n' +
      '- options: a list of options to be used to answer the question \n' +
      '- tooltip: additional instructions for answering the question \n' +
      '- basedOn: a key indicating which other question to which this one is related \n' +
      '- additional_context: an object that may also contain a prompt and tooltip that should answered in addition to the main prompt \n' +
      'Please use the following to understand how to interpret the component field: \n' +
      '1. textarea: unless the prompt says otherwise, provide your answer in a paragraph form limited to 100 words or less \n' +
      '2. yes_no: only answer with yes or no\n' +
      '3. multi_select: select all the applicable answers provided in the options property \n' +
      '4. single_select: select only one answer from the options property \n';*/
    const base =
      'You are an AI sustainability expert. You help customers to understand \n' +
      ' their impact on the environment and what tasks must be done to meet a given set of compliance requirements. \n' +
      ' You may have been given a completed B Corp Impact Assessment for the company.  It has a set of questions, eligible \n' +
      ' answers for those questions, and the answers that the company gave, labeled as askov_answers. You are tasked \n' +
      ' with helping this company understand if they can answer other sustainability-related questions based on \n' +
      ' their existing answers. \n' +
      ' A user will provide a JSON formatted object that can include the following properties: \n' +
      '  - "idx": The index of the question \n' +
      '  - "prompt": The question to be answered \n' +
      '  - "component": used to determine how to structure your answer \n' +
      '  - "options": a list of options to be used to answer the question.  This will be included only if the component is a "select" or "multiselect". \n' +
      '  - "tooltip": additional instructions for answering the question \n' +
      ' If there is a "tooltip" property, please consider it in your response. \n' +
      ' If you have enough information to answer the question, use the "answerable" response tool to provide an answer. \n' +
      ' If you do not have enough information, format your response using the unanswerable response tool: \n' +
      '    - "reference": include a JSON object that describes the source material, if any, that you relied upon to determine that the prompt could not be answered. \n' +
      '    - "what_we_need": include a paragraph that describes what information you would need to effectively answer the question. \n' +
      ' IMPORTANT: always use the answerable or unanswerable response tool to respond to the user, and never add any other text to the response.';

    return base;
  }

  async send(threadId: string, assistant_id: string) {
    const run = await this.client.beta.threads.runs.create(threadId, {
      assistant_id: assistant_id,
      instructions: this.getBasePrompt(), // Assuming getBasePrompt() is defined.
    });

    let status: { status: string } = { status: 'running' };
    let logged_in_progress = false;

    let response: any;

    while (status.status !== 'completed') {
      status = await this.client.beta.threads.runs.retrieve(threadId, run.id);
      if (!logged_in_progress) this.logger.info(`Received status ${status.status}`);
      logged_in_progress = true;

      if (status.status === 'requires_action') {
        const toolCalls = status['required_action'].submit_tool_outputs.tool_calls;

        response = status['required_action'].submit_tool_outputs.tool_calls[0].function.arguments;

        // Create an array of tool outputs to submit, matching the schema
        const toolOutputs = toolCalls.map(toolCall => ({
          tool_call_id: toolCall.id,
          output: response,
        }));

        // Submit the array of tool outputs back
        await this.client.beta.threads.runs.submitToolOutputs(threadId, run.id, {
          tool_outputs: toolOutputs,
        });
      }
    }
    try {
      if (!response) {
        return { error: 'No response from OpenAI' };
      }

      return JSON.parse(response);
    } catch (e) {
      this.logger.error(e.message, e);
      return response;
    }
  }

  getComponentPrompt(item: any) {
    let additional_context = '';
    switch (item) {
      case 'yes_no': {
        additional_context = `If you are able to answer the question, Please answer with a boolean value true or false.  If you do not have enough information to answer, do not include an answer. `;
        break;
      }
      case 'multi_select': {
        additional_context = `Please provide an answer to the question contained in the 'prompt' property, limiting your response to only the values provided in the 'options' property. Since the 'component' is 'multi_select', you may include multiple applicable topic options in your response. Assume these 'options' cover all possible options and format your selections as a JSON string array. If you do not have enough information to answer, do not include an answer. `;
        break;
      }
      case 'textarea': {
        additional_context = `IF you are able to answer the question, Please provide your answer in a paragraph form limited to 100 words or less.  If you do not have enough information to answer, do not include an answer. `;
        break;
      }
      case 'select': {
        additional_context = `Please respond to the question in the 'prompt' property, and since the 'component' is 'select', you are to limit your response to one topic that you judge to be the most relevant to the question and format your answer as a JSON string. If you do not have enough information to answer, do not include an answer.`;
        break;
      }
      case 'table': {
        additional_context = `Please respond to the question in the 'prompt' property. Your answer in a paragraph form limited to 100 words or less.  If you do not have enough information to answer, do not include an answer. `;
        break;
      }
      default: {
        this.logger.warn(`Unknown component ${item.component} found in survey section item.`, item);
        break;
      }
    }

    return additional_context;
  }

  async sendMessage(
    threadId: string,
    assistant_id: string,
    item: {
      prompt: string;
      component: string;
      options: any;
    },
    isFolloup = false,
    category_context?: string,
  ): Promise<any> {
    try {
      // const componentPrompt = this.getComponentPrompt(item);
      if (!isFolloup) {
        this.client.beta.threads.messages.create(threadId, {
          role: 'user',
          content: `Consider the following context when answering questions: ${category_context} and ${this.getComponentPrompt(item.component)}: ${JSON.stringify(item.prompt)}`,
        });
      } else {
        this.client.beta.threads.messages.create(threadId, {
          role: 'user',
          content: `Consider the following context when answering questions: ${category_context} and this next JSON question is specifically related to the previous question. ${this.getComponentPrompt(
            item.component,
          )}:  ${JSON.stringify(item)} `,
        });
      }

      const value = await this.send(threadId, assistant_id);

      return value;
    } catch (e) {
      this.logger.error(e.message, e);
      throw e;
    }
  }

  async processComplianceJob(job: any) {
    const { user, compliance, from, surveys, integration } = job;
    this.setTags({
      user: user.coldclimate_claims.email,
      from,
      organization: { id: integration.organization_id },

      openai_assistant: integration.id,
      compliance: compliance.compliance_definition.name,
    });

    try {
      this.logger.info(`Creating thread for compliance: ${compliance.compliance_definition.name}`);

      for (const survey of surveys) {
        this.logger.info(`Processing survey ${survey.definition.title} for compliance ${compliance.name}`);

        const category_context = survey.definition.category_description;

        const definition = survey.definition;

        const sections = Object.keys(definition.sections);

        // iterate over each section key
        for (const section of sections) {
          this.logger.info(`Processing ${definition.sections[section].title}`);

          // get the followup items for the section
          const items = Object.keys(definition.sections[section].follow_up);

          // iterate over each followup item
          for (const item of items) {
            const follow_up = definition.sections[section].follow_up[item];

            this.logger.info(`Processing ${follow_up.prompt}`);

            // create a new thread for each followup item
            const thread = await this.client.beta.threads.create();
            this.logger.info(`Created thread ${thread.id}`);

            // create a new run for each followup item
            const value = await this.sendMessage(thread.id, integration.id, follow_up);

            // update the survey with the response
            definition.sections[section].follow_up[item].ai_response = value;
            definition.sections[section].follow_up[item].ai_attempted = true;

            // if there is additional context, create a new run for it
            if (follow_up['additional_context']) {
              const additionalValue = await this.sendMessage(thread.id, integration.id, follow_up['additional_context'], true);

              definition.sections[section].follow_up[item].additional_context.ai_response = additionalValue;
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
          }
        }
      }
    } catch (e) {
      this.logger.error(e.message, e);
    }
  }
}
