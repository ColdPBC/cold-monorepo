import { BaseWorker, DarklyService, PrismaService } from '@coldpbc/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptsService extends BaseWorker {
  organization: any;
  compliance_set: string;
  private yes_no_prompt: string;
  private multi_select_prompt: string;
  private text_prompt: string;
  private text_area_prompt: string;
  private multi_text_prompt: string;
  private select_prompt: string;
  private percent_slider_prompt: string;
  private number_prompt: string;
  private base_prompt: string;
  private nodocs_prompt: string;
  instructions_prompt: string;
  model: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  stop: string;
  has_docs = false;
  is_rag = false;

  condense_template: string;

  constructor(readonly darkly: DarklyService, compliance_set: string, organization: any, readonly prisma: PrismaService) {
    super(PromptsService.name);

    this.compliance_set = compliance_set;
    this.organization = organization;
    // this is used by the new RAG Chat Service
    this.condense_template = `
    Given the chat history and a follow-up question, rephrase the follow-up question to be a standalone question that
    encompasses all necessary context from the chat history.

    Chat History:
    {chat_history}

    Follow-up input: {question}

    Make sure your standalone question is self-contained, clear, and specific. Rephrased standalone question:

    `;
  }

  async initialize() {
    await this.initializeFlagValues();

    const documents = await this.prisma.organization_files.findMany({
      where: {
        organization_id: this.organization.id,
      },
    });

    const documentNames: string[] = [];

    if (documents && documents.length > 0) {
      for (const doc of documents) {
        documentNames.push(doc['original_name']);
      }
    }

    // If documents are present, set the has_docs flag to true and replace the {documents} placeholder in the base prompt
    if (documentNames && documentNames.length > 0) {
      this.has_docs = true;
      // Embed Component Prompt
      this.base_prompt = this.base_prompt.replace(`{{documents}}`, ` based on the following documents: ${documents}.`);
    }

    return this;
  }

  private async initializeFlagValues() {
    // Retrieve the GPT model, temperature, and other settings
    this.model = await this.darkly.getStringFlag('dynamic-gpt-assistant-model', 'gpt-4o', {
      kind: 'org-compliance-set',
      key: this.organization.name,
      name: this.compliance_set,
    });

    this.is_rag = await this.darkly.getBooleanFlag('dynamic-enable-rag-processing', false, {
      kind: 'org-compliance-set',
      key: this.organization.name,
      name: this.compliance_set,
    });

    this.max_tokens = await this.darkly.getNumberFlag('dynamic-gpt-max-tokens', 4096, {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set,
    });

    /** Frequency_penalty:
     * This parameter is used to discourage the model from repeating the same words or phrases
     * too frequently within the generated text. It is a value that is added to the log-probability
     * of a token each time it occurs in the generated text. A higher frequency_penalty value will
     * result in the model being more conservative in its use of repeated tokens
     */
    this.frequency_penalty = await this.darkly.getNumberFlag('dynamic-gpt-frequency-penalty', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set,
    });

    /** Presence_penalty:
     * This parameter is used to encourage the model to include a diverse range of tokens in the generated text.
     * It is a value that is subtracted from the log-probability of a token each time it is generated.
     * A higher presence_penalty value will result in the model being more likely to generate tokens that have
     * not yet been included in the generated text.
     */
    this.presence_penalty = await this.darkly.getNumberFlag('dynamic-gpt-presence-penalty', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set,
    });

    /** Top_p:
     * used to determine how many possible words to consider. A high “top_p” value means the model
     * looks at more possible words, even the less likely ones, which makes the generated text more diverse.
     */
    this.top_p = await this.darkly.getJSONFlag('dynamic-gpt-top-p', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set,
    });

    /** Temperature:
     *  controls randomness when picking words during text creation. Low values of temperature make the
     *  text more predictable and consistent, while high values let more freedom and creativity into the
     *  mix, but can also make things less consistent
     */
    this.temperature = await this.darkly.getJSONFlag('dynamic-gpt-model-temp', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });

    this.yes_no_prompt = await this.darkly.getStringFlag('dynamic-yes-no-component-prompt', '', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });
    this.select_prompt = await this.darkly.getStringFlag('dynamic-select-component-prompt', '', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });
    this.multi_select_prompt = await this.darkly.getStringFlag('dynamic-multi-select-component-prompt', '', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });
    this.text_prompt = await this.darkly.getStringFlag('dynamic-text-component-prompt', '', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });
    this.text_area_prompt = await this.darkly.getStringFlag('dynamic-text-area-component-prompt', '', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });
    this.multi_text_prompt = await this.darkly.getStringFlag('dynamic-multi-text-component-prompt', '', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });
    this.percent_slider_prompt = await this.darkly.getStringFlag('dynamic-percent-slider-component-prompt', '', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });
    this.number_prompt = await this.darkly.getStringFlag('dynamic-number-component-prompt', '', {
      kind: 'model-compliance-set',
      key: this.model,
      name: this.compliance_set || 'default',
    });

    this.nodocs_prompt = await this.darkly.getStringFlag('ai-no-documents-prompt', '', {
      kind: 'org-compliance-set',
      key: this.organization.name,
      name: this.compliance_set || 'default',
    });

    this.base_prompt = await this.darkly.getJSONFlag('dynamic-ai-base-prompt', {
      kind: 'org-compliance-set',
      key: this.organization.name,
      name: this.compliance_set || 'default',
    });
    this.instructions_prompt = await this.darkly.getJSONFlag('dynamic-open-ai-assistant-instructions', {
      kind: 'org-compliance-set',
      key: this.organization.name,
      name: this.compliance_set || 'default',
    });
  }

  async getComponentPrompt(item: any) {
    switch (item.component) {
      case 'yes_no':
        return this.yes_no_prompt;
      case 'multi_select':
        return this.multi_select_prompt.replace('{{options}}', item.options.join(', '));
      case 'text':
        return this.text_prompt;
      case 'textarea':
        return this.text_area_prompt;
      case 'multi_text':
        return this.multi_text_prompt;
      case 'select':
        return this.select_prompt.replace('{{options}}', item.options.join(', '));
      case 'number':
        return this.number_prompt;
      case 'percent_slider':
        return this.percent_slider_prompt;
      default: {
        this.logger.warn(`Unknown component ${item.component} found in survey section item.`, item);
        return '';
        break;
      }
    }
  }

  //Returns the prompt for the OpenAI assistant
  async getPrompt(question: any, context?: any, has_docs?: boolean) {
    await this.initializeFlagValues();

    if (!has_docs && !this.has_docs) {
      return this.nodocs_prompt;
    }

    const component_prompt = await this.getComponentPrompt(question);

    const sanitized_base = this.base_prompt.replace('{{component_prompt}}', component_prompt).replace('{{question}}', question.prompt);

    /**
     * @description This action retrieves the base prompt for the OpenAI assistant.
     */
    // If instructions are present, include them with the base prompt
    if (!this.is_rag && this.instructions_prompt.length > 0) {
      return `${this.instructions_prompt} ${sanitized_base}`;
    }

    // If no instructions are present, return just the base prompt
    return sanitized_base;
  }
}
