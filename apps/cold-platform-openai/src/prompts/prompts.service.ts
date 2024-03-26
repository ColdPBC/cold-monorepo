import { BaseWorker, DarklyService } from '@coldpbc/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptsService extends BaseWorker {
  constructor(private readonly darkly: DarklyService) {
    super(PromptsService.name);
  }

  //TODO: finish adding all the langchain variants
  async getComponentPrompt(key: string, item: any) {
    let component_prompt = '';
    switch (item.component) {
      case 'yes_no': {
        component_prompt = await this.darkly.getJSONFlag('dynamic-yes-no-component-prompt', {
          kind: 'compliance-survey-prompt',
          key: item.component,
          name: key,
        });
        break;
      }
      case 'multi_select': {
        component_prompt = await this.darkly.getJSONFlag('dynamic-multi-select-component-prompt', {
          kind: 'compliance-survey-prompt',
          key: item.component,
          name: key,
        });
        break;
      }
      case 'textarea': {
        component_prompt = component_prompt = await this.darkly.getJSONFlag('dynamic-text-area-component-prompt', {
          kind: 'compliance-survey-prompt',
          key: item.component,
          name: key,
        });
        break;
      }
      case 'multi_text': {
        component_prompt = component_prompt = await this.darkly.getJSONFlag('dynamic-multi-text-component-prompt', {
          kind: 'compliance-survey-prompt',
          key: item.component,
          name: key,
        });
        break;
      }
      case 'select': {
        component_prompt = component_prompt = await this.darkly.getJSONFlag('dynamic-select-component-prompt', {
          kind: 'compliance-survey-prompt',
          key: item.component,
          name: key,
        });
        break;
      }
      default: {
        this.logger.warn(`Unknown component ${item.component} found in survey section item.`, item);
        break;
      }
    }

    return component_prompt;
  }

  //TODO: make this compliant with langChain
  async getBasePrompt(organization: any) {
    /**
     * @description This action retrieves the instructions for the OpenAI assistant.
     */
    const instructions = await this.darkly.getStringFlag('dynamic-open-ai-assistant-instructions', '', {
      kind: 'organization',
      name: organization.display_name,
      key: organization.name,
    });

    /**
     * @description This action retrieves the base prompt for the OpenAI assistant.
     */
    const base = await this.darkly.getJSONFlag('dynamic-ai-base-prompt', {
      kind: 'organization',
      key: organization.name,
      name: organization.display_name,
    });

    // If instructions are present, include them with the base prompt
    if (instructions.length > 0) {
      return `${instructions} ${base}`;
    }

    // If no instructions are present, return just the base prompt
    return base;
  }
}
