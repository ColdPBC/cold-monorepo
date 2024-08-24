import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser, PrismaService, S3Service } from '@coldpbc/nest';
import z from 'zod';
import { organization_files, organizations } from '@prisma/client';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { zodResponseFormat } from 'openai/helpers/zod';
import {
  defaultExtractionSchema,
  defaultTestSchema,
  classifySchema,
  defaultCertificateSchema,
  defaultPolicySchema,
  defaultStatementSchema,
  sgs,
  intertek,
  wrap,
  tuv_rhineland,
  bluesign,
} from './schemas';
import { FileTypes } from '@coldpbc/enums';

@Injectable()
export class ExtractionService extends BaseWorker {
  private openAi;

  constructor(readonly config: ConfigService, private readonly prisma: PrismaService, readonly s3: S3Service) {
    super(ExtractionService.name);
    this.openAi = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });
  }

  contentIsUrl(content: any[] | string) {
    return typeof content === 'string' && z.string().url().safeParse(content).success;
  }

  /**
   * Use Ai to classify content
   * @param content
   * @param user
   * @param orgFile
   * @param organization
   */
  async classifyContent(content: any[] | string, user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
    const start = new Date();

    const classifyPrompt = `You are a helpful assistant for ${
      organization.display_name
    } and you help users classify and extract data from documents that they upload.  Classify this content using the following rules:
    - if the content is an RSL (Restricted Substance List), classify it as a policy
    - if the content is a certificate, classify it as a certificate
    - if the content is a test result, classify it as a test
    - if the content is a statement, classify it as a statement
    - if the content is an impact assessment from ${organization.display_name}, classify it as a statement
     ${this.contentIsUrl(content) ? 'from the following image' : `from the following context: ${Array.isArray(content) ? content.join(' ') : content}`}:`;

    const messageContent: { type: string; text?: string; image_url?: { url: string } }[] = [
      {
        type: 'text',
        text: classifyPrompt,
      },
    ];

    const imageContent: any = [
      {
        type: 'text',
        text: classifyPrompt,
      },
      {
        type: 'image_url',
        image_url: { url: this.contentIsUrl(content) ? content : '' },
      },
    ];

    const classifyResponse = await this.openAi.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'user',
          content: this.contentIsUrl(content) ? imageContent : messageContent,
        },
      ],
      response_format: zodResponseFormat(classifySchema, 'content_classification'),
    });

    this.logger.info('content_classification response', { classification: classifyResponse, user, file: orgFile });

    this.sendMetrics('organization.files', 'cold-openai', 'classify', 'completed', {
      start,
      sendEvent: false,
      tags: {
        organization_name: organization?.name,
        organization_id: organization?.id,
        user_email: user?.coldclimate_claims?.email,
        file_name: orgFile.original_name,
        file_type: orgFile.type,
        file_id: orgFile.id,
      },
    });

    return classifyResponse;
  }

  /**
   * Use Ai to extract text from an image
   * @param content
   * @param user
   * @param orgFile
   * @param organization
   */
  async extractDataFromContent(content: any[] | string, user: IAuthenticatedUser, orgFile: organization_files, organization: organizations) {
    const start = new Date();
    try {
      // map over content to extract pageContent if content is an array of langchain documents
      content = Array.isArray(content) ? content.map(c => c.pageContent) : content;

      // classify content and generate a prompt for the extraction
      const { choices } = await this.classifyContent(content, user, orgFile, organization);

      if (!Array.isArray(choices) || choices.length === 0) {
        throw new Error('No choices found in classify response');
      }

      const parsedClassification = choices[0].message.parsed;

      const prompt = `${parsedClassification.prompt} Please use the response_format to properly extract the content ${Array.isArray(content) ? content.join(' ') : content}`;

      /*const prompt = `You are a helpful assistant and you help users extract unstructured data from documents that they upload.  Please use the response_format to properly extract the content ${
        this.contentIsUrl(content) ? 'from the following image' : `from the following context: ${Array.isArray(content) ? content.join(' ') : content}`
      }:`;*/

      const messageContent: { type: string; text?: string; image_url?: { url: string } }[] = [
        {
          type: 'text',
          text: prompt,
        },
      ];

      const imageContent: any = [
        {
          type: 'text',
          text: prompt,
        },
        {
          type: 'image_url',
          image_url: { url: this.contentIsUrl(content) ? content : '' },
        },
      ];

      let schema;
      let extraction_name: string = 'default_extraction';

      // determine the extraction schema and extraction name to use based on the classification
      switch (parsedClassification.type) {
        case 'test':
          extraction_name = `test_${parsedClassification.testing_company}`;
          switch (parsedClassification.testing_company) {
            case 'tuvRheinland':
              schema = tuv_rhineland;
              break;
            case 'intertek':
              schema = intertek;
              break;
            case 'SGS':
              schema = sgs;
              break;
            default:
              schema = defaultTestSchema;
              break;
          }
          break;
        case 'certificate':
          extraction_name = `certificate_${parsedClassification.certifying_authority}`;
          switch (parsedClassification.certificate_authority) {
            case 'bluesign':
              schema = bluesign;
              break;
            case 'wrap':
              schema = wrap;
              break;
            default:
              schema = defaultCertificateSchema;
              break;
          }
          break;
        case 'policy':
          extraction_name = `policy_extraction`;
          schema = defaultPolicySchema;
          break;
        case 'statement':
          extraction_name = `statement_extraction`;
          schema = defaultStatementSchema;
          break;
        default:
          extraction_name = `default_extraction`;
          schema = defaultExtractionSchema;
          break;
      }

      const response = await this.openAi.beta.chat.completions.parse({
        model: 'gpt-4o-2024-08-06',
        messages: [
          {
            role: 'user',
            content: this.contentIsUrl(content) ? imageContent : messageContent,
          },
        ],
        response_format: zodResponseFormat(schema, extraction_name),
      });

      const parsedResponse = response.choices[0].message.parsed;

      this.logger.info(`${extraction_name} response`, { response, user, file: orgFile });

      let fileType: FileTypes;

      switch (parsedClassification.type) {
        case 'test':
          fileType = FileTypes.TEST_RESULTS;
          break;
        case 'certificate':
          fileType = FileTypes.CERTIFICATE;
          break;
        case 'policy':
          fileType = FileTypes.POLICY;
          break;
        case 'statement':
          fileType = FileTypes.STATEMENT;
          break;
        default:
          fileType = FileTypes.OTHER;
          break;
      }

      const updateData: any = {
        type: fileType,
        metadata: {
          ...response.choices[0].message.parsed,
        },
      };

      if (parsedResponse.effective_start_date || parsedResponse.effective_end_date) {
        try {
          updateData.effective_start_date = parsedResponse.effective_start_date ? new Date(parsedResponse.effective_start_date).toISOString() : undefined;
        } catch (e) {
          this.logger.error('Error parsing effective_start_date', { error: e });
        }
        try {
          updateData.effective_end_date = parsedResponse.effective_end_date ? new Date(parsedResponse.effective_end_date).toISOString() : undefined;
        } catch (e) {
          this.logger.error('Error parsing effective_start_date', { error: e });
        }
      }

      const updatedFile = await this.prisma.organization_files.update({
        where: {
          id: orgFile.id,
        },
        data: updateData,
      });

      this.logger.info('file metadata updated', { file: updatedFile });

      this.sendMetrics('organization.files', 'cold-openai', 'extraction', 'completed', {
        start,
        sendEvent: false,
        tags: {
          organization_name: organization?.name,
          organization_id: organization?.id,
          user_email: user?.coldclimate_claims?.email,
          file_name: orgFile.original_name,
          file_type: orgFile.type,
          file_id: orgFile.id,
        },
      });

      return typeof parsedResponse === 'string' ? parsedResponse : JSON.stringify(parsedResponse);
    } catch (e) {
      this.logger.info('Error extracting data from content', { error: e });
      this.sendMetrics('organization.files', 'cold-openai', 'extraction', 'completed', {
        start,
        sendEvent: true,
        tags: {
          organization_name: organization?.name,
          organization_id: organization?.id,
          user_email: user?.coldclimate_claims?.email,
          file_name: orgFile.original_name,
          file_type: orgFile.type,
          file_id: orgFile.id,
          error: e.message,
        },
      });
      throw e;
    }
  }
}
