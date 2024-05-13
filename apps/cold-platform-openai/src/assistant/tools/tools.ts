import { BaseWorker, DarklyService } from '@coldpbc/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Tools extends BaseWorker {
  constructor(readonly darkly: DarklyService) {
    super(Tools.name);
  }

  async onModuleInit(): Promise<void> {
    await super.onModuleInit();
  }

  async unanswerable(organization: any) {
    return await this.darkly.getStringFlag(
      'static-open-ai-unanswerable-tool',
      {
        type: 'function',
        function: {
          name: 'unanswerable',
          description: 'Used when a question is NOT answerable by the assistant',
          parameters: {
            type: 'object',
            required: ['justification', 'reference', 'what_we_need'],
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
          },
        },
      },
      {
        kind: 'organization',
        name: organization.display_name,
        key: organization.name,
      },
    );
  }

  async answerable(organization: any) {
    return await this.darkly.getStringFlag(
      'static-open-ai-answerable-tool',
      {
        type: 'function',
        function: {
          name: 'answerable',
          description: 'Used when a question is answerable by the assistant',
          parameters: {
            type: 'object',
            required: ['answer', 'justification', 'reference'],
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
                description:
                  'A paragraph justifying the answer provided.  If citations are used, they should be included in the justification, and they should include the name of the source material used.',
              },
              reference: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description:
                  'a string array that that lists the source material that you relied upon to answer the question.  If the answer was sourced from one of the files supplied to you, the array should contain the file name.  If the answer was sourced from web content, the array should contain the URL of the source material.',
              },
            },
          },
        },
      },
      {
        kind: 'organization',
        name: organization.display_name,
        key: organization.name,
      },
    );
  }
}
