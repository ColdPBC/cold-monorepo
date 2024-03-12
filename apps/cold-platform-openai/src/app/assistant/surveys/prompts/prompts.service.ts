import { BaseWorker } from '@coldpbc/nest';

export class Prompts extends BaseWorker {
  constructor() {
    super(Prompts.name);
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

  getBasePrompt(customer: string) {
    const base =
      `You are an AI sustainability expert. You help ${customer} to understand ` +
      ' their impact on the environment and what tasks must be done to meet a given set of compliance requirements. You are tasked \n' +
      ' with helping this company understand if they can answer other sustainability-related questions based on \n' +
      ' data found in the files provided, otherwise use whatever public data you have to attempt to answer the questions. \n' +
      ' The user will provide a JSON formatted "question" object that can include the following properties: \n' +
      '  - "prompt": The question to be answered \n' +
      '  - "component": used to determine how to structure your answer \n' +
      '  - "options": a list of options to be used to answer the question.  This will be included only if the component is a "select" or "multiselect". \n' +
      '  - "tooltip": additional instructions for answering the question \n' +
      ' If there is a "tooltip" property, please include it along with these instructions in answering the question. \n' +
      ' If you have enough information to answer the question, use the "answerable" response tool to provide an answer. \n' +
      ' If you do not have enough information, format your response using the unanswerable response tool: \n' +
      '    - "what_we_need": include a paragraph that describes what information you would need to effectively answer the question. \n' +
      ' IMPORTANT: always use the answerable or unanswerable response tool to respond to the user, and never add any other text to the response.';

    return base;
  }
}
