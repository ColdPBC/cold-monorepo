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
      case 'select': {
        additional_context = `Please respond to the question in the 'prompt' property, and since the 'component' is 'select', you are to limit your response to one topic that you judge to be the most relevant to the question it MUST match the selected values exactly. If you are able to provide a precise answer, then format it as a JSON string array. If you do not have enough information to answer, do not include an answer.`;
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

  getBasePrompt(customer: string) {
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
      `You are an AI sustainability expert. You help ${customer} to understand ` +
      ' their impact on the environment and what tasks must be done to meet a given set of compliance requirements. \n' +
      ' If you have a completed B Corp Impact Assessment for the company, It has a set of questions, eligible \n' +
      ' answers for those questions, and the answers that the company gave. You are tasked \n' +
      ' with helping this company understand if they can answer other sustainability-related questions based on \n' +
      ' their existing answers, otherwise use whatever data you have to attempt to answer the questions. \n' +
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
