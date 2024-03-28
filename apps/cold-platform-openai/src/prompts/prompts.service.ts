import { BaseWorker, DarklyService } from '@coldpbc/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptsService extends BaseWorker {
  organization: any;
  compliance_set: string;
  yes_no_prompt: string;
  multi_select_prompt: string;
  text_prompt: string;
  text_area_prompt: string;
  multi_text_prompt: string;
  select_prompt: string;
  percent_slider_prompt: string;
  number_prompt: string;
  base_prompt: string;
  instructions_prompt: string;
  model: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  stop: string;

  prompt_template: string;
  condense_template: string;

  constructor(private readonly darkly: DarklyService, compliance_set: string, organization: any) {
    super(PromptsService.name);
    this.compliance_set = compliance_set;
    this.organization = organization;
    // this is used by the new RAG Chat Service
    this.condense_template = `Given the chat history and a follow-up question, rephrase the follow-up question to be a standalone question that encompasses all necessary context.

    Chat History: {chat_history}
      Follow-up input:
      {question}

    Make sure your standalone question is self-contained, clear, and specific. Rephrased standalone question:\`;
    `;
    this.prompt_template = `
  System: You are an AI sustainability expert tasked with helping our customer interpret and answer questions based on relating to sustainability and corporate governance and instructions based on specific provided documents. The context from these documents has been processed and made accessible to you.  Your mission is to generate answers that are accurate, succinct, and comprehensive, drawing upon the information contained in the context of the documents. If the answer isn't readily found in the documents, you should make use of your training data and understood context to infer and provide the most plausible response.
 You are also capable of evaluating, comparing the content of these documents. Hence, if asked to compare or analyze the documents, use your AI understanding to deliver an insightful response.  You are also free to use any content from the company's website to provide a more comprehensive answer.  You must provide references to any sources that you relied upon in answering all questions.
 You are tasked with helping this company understand if they can answer the following sustainability-related question based on the information provided in the documents.

 The user will provide a JSON formatted "question" object that can include the following properties:
  - "prompt": The question to be answered
  - "component": used to determine how to structure your answer
  - "options": a list of options to be used to answer the question.  This will be included only if the component is a "select" or "multiselect".
  - "tooltip": additional instructions for answering the question

 If you have enough information to answer the question, format your response as JSON containing only the following properties:
 "answer": which should contain your answer to the question,
 "justification": a short paragraph that explains how you arrived at your answer,
 "source": a list of sources you used to arrive at your answer.  This can include any uploaded documents, the company's website, or other public sources.

 If you do not have enough information, format your response as JSON containing only the following properties:
  "what_we_need": include a paragraph that describes what information you would need to effectively answer the question.
  "justification": a short paragraph that explains why you need this information.

 IMPORTANT:
 - always follow these instructions anytime you respond to the user, and never add any other text to the response.
 - {component_prompt}

 ---
 Context: {context}

Here is the user's json object:
{question}
`;
  }

  async initialize() {
    await this.initializeFlagValues();
    await this.subscribeToFlagUpdates();

    return this;
  }

  private async initializeFlagValues() {
    // Retrieve the GPT model, temperature, and other settings
    this.model = await this.darkly.getStringFlag('dynamic-gpt-model', 'gpt-3.5-turbo', {
      kind: 'organization',
      key: this.organization.name,
      name: this.organization.display_name,
    });

    this.max_tokens = await this.darkly.getNumberFlag('dynamic-gpt-max-tokens', 4096, {
      kind: 'compliance-set',
      key: this.model,
      name: this.organization.display_name,
    });

    /** Frequency_penalty:
     * This parameter is used to discourage the model from repeating the same words or phrases
     * too frequently within the generated text. It is a value that is added to the log-probability
     * of a token each time it occurs in the generated text. A higher frequency_penalty value will
     * result in the model being more conservative in its use of repeated tokens
     */
    this.frequency_penalty = await this.darkly.getNumberFlag('dynamic-gpt-frequency-penalty', {
      kind: 'compliance-set',
      key: this.model,
      name: this.organization.display_name,
    });

    /** Presence_penalty:
     * This parameter is used to encourage the model to include a diverse range of tokens in the generated text.
     * It is a value that is subtracted from the log-probability of a token each time it is generated.
     * A higher presence_penalty value will result in the model being more likely to generate tokens that have
     * not yet been included in the generated text.
     */
    this.presence_penalty = await this.darkly.getNumberFlag('dynamic-gpt-presence-penalty', {
      kind: 'compliance-set',
      key: this.model,
      name: this.organization.display_name,
    });

    /** Top_p:
     * used to determine how many possible words to consider. A high “top_p” value means the model
     * looks at more possible words, even the less likely ones, which makes the generated text more diverse.
     */
    this.top_p = await this.darkly.getJSONFlag('dynamic-gpt-top-p', {
      kind: 'compliance-set',
      key: this.model,
      name: this.organization.display_name,
    });

    /** Temperature:
     *  controls randomness when picking words during text creation. Low values of temperature make the
     *  text more predictable and consistent, while high values let more freedom and creativity into the
     *  mix, but can also make things less consistent
     */
    this.temperature = await this.darkly.getJSONFlag('dynamic-gpt-model-temp', {
      kind: 'compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });

    this.yes_no_prompt = await this.darkly.getStringFlag('dynamic-yes-no-component-prompt', '', {
      kind: 'compliance-survey-prompt',
      key: 'yes_no',
      name: this.compliance_set || 'default',
    });
    this.select_prompt = await this.darkly.getStringFlag('dynamic-select-component-prompt', '', {
      kind: 'compliance-survey-prompt',
      key: 'select',
      name: this.compliance_set || 'default',
    });
    this.multi_select_prompt = await this.darkly.getStringFlag('dynamic-multi-select-component-prompt', '', {
      kind: 'compliance-survey-prompt',
      key: 'multi_select',
      name: this.compliance_set || 'default',
    });
    this.text_prompt = await this.darkly.getStringFlag('dynamic-text-component-prompt', '', {
      kind: 'compliance-survey-prompt',
      key: 'text',
      name: this.compliance_set || 'default',
    });
    this.text_area_prompt = await this.darkly.getStringFlag('dynamic-text-area-component-prompt', '', {
      kind: 'compliance-survey-prompt',
      key: 'text_area',
      name: this.compliance_set || 'default',
    });
    this.multi_text_prompt = await this.darkly.getStringFlag('dynamic-multi-text-component-prompt', '', {
      kind: 'compliance-survey-prompt',
      key: 'multi_text',
      name: this.compliance_set || 'default',
    });
    this.percent_slider_prompt = await this.darkly.getStringFlag('dynamic-percent-slider-component-prompt', '', {
      kind: 'compliance-survey-prompt',
      key: 'percent_slider',
      name: this.compliance_set || 'default',
    });
    this.number_prompt = await this.darkly.getStringFlag('dynamic-number-component-prompt', '', {
      kind: 'compliance-survey-prompt',
      key: 'number',
      name: this.compliance_set || 'default',
    });

    this.base_prompt = await this.darkly.getJSONFlag('dynamic-ai-base-prompt', {
      kind: 'compliance-survey-prompt',
      key: 'compliance_set',
      name: this.compliance_set || 'default',
    });
    this.instructions_prompt = await this.darkly.getJSONFlag('dynamic-open-ai-assistant-instructions', {
      kind: 'compliance-survey-prompt',
      key: 'compliance_set',
      name: this.compliance_set || 'default',
    });
  }

  //TODO: finish adding all the langchain variants
  private async subscribeToFlagUpdates() {
    /**
     * @description This action retrieves the instructions for the OpenAI assistant.
     */
    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-open-ai-assistant-instructions',
      value => {
        this.instructions_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'compliance_set',
        name: this.compliance_set || 'default',
      },
    );

    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-ai-base-prompt',
      value => {
        this.base_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'compliance_set',
        name: this.compliance_set || 'default',
      },
    );

    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-yes-no-component-prompt',
      value => {
        this.logger.info('Yes/No prompt updated');
        this.yes_no_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'compliance_set',
        name: this.compliance_set || 'default',
      },
    );

    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-multi-select-component-prompt',
      value => {
        this.logger.info('Multi-select prompt updated');
        this.multi_select_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'multi_select',
        name: this.compliance_set || 'default',
      },
    );

    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-text-area-component-prompt',
      value => {
        this.logger.info('Text area prompt updated');
        this.text_area_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'text_area',
        name: this.compliance_set || 'default',
      },
    );

    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-multi-text-component-prompt',
      value => {
        this.logger.info('Multi-text prompt updated');
        this.multi_text_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'multi_text',
        name: this.compliance_set || 'default',
      },
    );

    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-select-component-prompt',
      value => {
        this.logger.info('Select prompt updated');
        this.select_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'select',
        name: this.compliance_set || 'default',
      },
    );

    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-percent-slider-component-prompt',
      value => {
        this.logger.info('Percent slider prompt updated');
        this.percent_slider_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'percent_slider',
        name: this.compliance_set || 'default',
      },
    );

    await this.darkly.subscribeToStringFlagChanges(
      'dynamic-number-component-prompt',
      value => {
        this.logger.info('Number prompt updated');
        this.number_prompt = value;
      },
      {
        kind: 'compliance-survey-prompt',
        key: 'number',
        name: this.compliance_set || 'default',
      },
    );
  }

  async getComponentPrompt(item: any) {
    switch (item.component) {
      case 'yes_no':
        return this.yes_no_prompt;
      case 'multi_select':
        return this.multi_select_prompt;
      case 'text':
        return this.text_area_prompt;
      case 'textarea':
        return this.text_area_prompt;
      case 'multi_text':
        return this.multi_text_prompt;
      case 'select':
        return this.select_prompt;
      case 'number':
        return this.number_prompt;
      case 'percent_slider':
        return this.percent_slider_prompt;
      default: {
        this.logger.warn(`Unknown component ${item.component} found in survey section item.`, item);
        break;
      }
    }
  }

  //This is only used by the AssistantService
  async getBasePrompt(organization: any) {
    /**
     * @description This action retrieves the base prompt for the OpenAI assistant.
     */
    this.logger.info('Retrieving base prompt for OpenAI assistant', organization);
    // If instructions are present, include them with the base prompt
    if (this.instructions_prompt.length > 0) {
      return `${this.instructions_prompt} ${this.base_prompt}`;
    }

    // If no instructions are present, return just the base prompt
    return this.base_prompt;
  }
}
