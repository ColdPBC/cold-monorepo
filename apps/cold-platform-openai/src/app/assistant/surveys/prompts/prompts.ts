import { BaseWorker } from '@coldpbc/nest';

export class Prompts extends BaseWorker {
  constructor() {
    super(Prompts.name);
  }

  getComponentPrompt(item: any) {
    let additional_context = '';
    switch (item) {
      case 'yes_no': {
        additional_context = `If you are able to answer the question, Please answer with a boolean value true or false.  If you do not have enough information to answer, do not include an answer. `;
        break;
      }
      case 'multi_select': {
        additional_context = `Please provide an answer to the question contained in the 'prompt' property which must conform to the following rules: limit your answer to only the values provided in the 'options' property in the provided JSON.  You may select as many values from the "options" property as are applicable however they MUST match the selected values exactly. If you are able to provide a precise answer, then format it as a JSON string array. Assume these 'options' cover all possible options and format your selections as a JSON string array. If you do not have enough information to answer, do not include an answer. `;
        break;
      }
      case 'textarea': {
        additional_context = `IF you are able to answer the question, Please provide your answer in a paragraph form limited to 100 words or less.  If you do not have enough information to answer, do not include an answer. `;
        break;
      }
      case 'multi_text': {
        additional_context = `If you are able to provide a precise answer, then format it as a JSON string array.  If you do not have enough information to answer, do not include an answer. `;
        break;
      }
      case 'select': {
        additional_context = `Please respond to the question in the 'prompt' property, and since the 'component' is 'select', you are to limit your response to one topic that you judge to be the most relevant to the question it MUST match the selected values exactly. If you are able to provide a precise answer, then format it as a JSON string array. If you do not have enough information to answer, do not include an answer.`;
        break;
      }
      default: {
        this.logger.warn(`Unknown component ${item.component} found in survey section item.`, item);
        break;
      }
    }

    return additional_context;
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
