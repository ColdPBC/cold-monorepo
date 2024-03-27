export const unanswerable = {
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
      source: {
        type: 'object',
        description: 'a JSON object that describes the source material, if any, that you relied upon to answer the question.',
      },
    },
  },
};
