import { BaseWorker, DarklyService } from '@coldpbc/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptsService extends BaseWorker {
  constructor(private readonly darkly: DarklyService) {
    super(PromptsService.name);
  }

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

  async getBasePrompt(organization: any) {
    const base = await this.darkly.getJSONFlag('dynamic-ai-base-prompt', {
      kind: 'organization',
      key: organization.name,
      name: organization.display_name,
    });
    return base;
  }
}
