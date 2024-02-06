import { BaseWorker } from '@coldpbc/nest';

export class Tools extends BaseWorker {
  constructor() {
    super(Tools.name);
  }

  unanswerable = {
    type: 'function',
    function: {
      name: 'unanswerable',
      description: 'Used when a question is NOT answerable by the assistant',
      parameters: {
        type: 'object',
        properties: {
          justification: {
            type: 'string',
            description: 'A paragraph justifying the answer provided',
          },
          what_we_need: {
            type: 'string',
            description: 'a paragraph describing in detail the information you would need to answer the question.',
          },
          reference: {
            type: 'object',
            description: 'a JSON object that describes the source material, if any, that you relied upon to answer the question.',
          },
        },
        required: [],
      },
    },
  };
  answerable = {
    type: 'function',
    function: {
      name: 'answerable',
      description: 'Used when a question is answerable by the assistant',
      parameters: {
        type: 'object',
        required: ['answer'],
        properties: {
          answer: {
            type: ['boolean', 'string', 'array'],
            items: {
              type: 'string',
            },
            description: 'The answer to the prompt.',
          },
          justification: {
            type: 'string',
            description: 'A paragraph justifying the answer provided',
          },
          reference: {
            type: 'object',
            description: 'a JSON object that describes the source material, if any, that you relied upon to answer the question.',
          },
        },
      },
    },
  };
}
