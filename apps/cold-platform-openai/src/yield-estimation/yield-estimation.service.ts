// src/yield-estimation/yield-estimation.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, PrismaService, IAuthenticatedUser } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  YieldEstimationRequest,
  YieldEstimationResponse,
  yieldEstimationRequestSchema,
  yieldEstimationResponseSchema,
  MaterialInput
} from '../schemas';

@Injectable()
export class YieldEstimationService extends BaseWorker implements OnModuleInit {
  private openAIClient: OpenAI;

  constructor(
    readonly config: ConfigService,
    readonly prisma: PrismaService,
  ) {
    super(YieldEstimationService.name);
    this.openAIClient = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async onModuleInit() {
    this.logger.info('Yield Estimation Service Initialized');
  }

  private buildPrompt(request: YieldEstimationRequest): string {
    const materialsDescription = request.materials
      .map(m => {
        return `
- Material ID: ${m.id}
  Name: ${m.name}
  ${m.yield ? `Yield: ${m.yield} ${m.uom}` : ''}
  ${m.category ? `Category: ${m.category}` : ''}
  ${m.placement ? `Placement: ${m.placement}` : ''}
  ${m.description ? `Description: ${m.description}` : ''}`;
      })
      .join('\n');

    return `You are an expert in apparel materials and manufacturing. Please estimate the yield of each material in a product based on the following information:

The materials are used in a product ${request.productName} ${request.productCategory ? `in the category ${request.productCategory}` : ''}.

Materials:
${materialsDescription}

Requirements:
1. Each yield estimate should consider:
   - Material type and properties
   - Placement information, when available
   - Yields of other materials in the product
   - Relative proportion expectations (e.g., main fabric usually dominates)
2. Estimates should be realistic for apparel manufacturing

Please provide:
1. For each material:
   - Yield estimate (use up to two decimal places for length or area, but must be an integer if unit is in pieces)
   - Unit of measure for the yield estimate
   - Confidence score (0-1) specific to this material
   - Brief reasoning for this material's estimate
2. Overall confidence score (0-1)
3. Overall explanation of your reasoning process

Return the response in the following JSON format:
{
  "estimates": {
    "materialId": {
      "yield": number,
      "uom": string,
      "confidence": number,
      "reasoning": "string"
    }
  },
  "overallConfidence": number,
  "reasoning": "string"
}`;
  }

  async estimateYields(
    request: YieldEstimationRequest,
    user: IAuthenticatedUser,
  ): Promise<YieldEstimationResponse> {
    try {
      // Validate request using Zod schema
      const parsedRequest = yieldEstimationRequestSchema.parse(request);
      const prompt = this.buildPrompt(parsedRequest);

      const completion = await this.openAIClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert assistant in apparel materials and manufacturing. Return only raw JSON without any markdown formatting or additional text.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        user: user.coldclimate_claims.id,
      });

      if (!completion.choices[0].message.content) {
        this.logger.error('No content found in response', { completion });
        throw new Error('No content received from OpenAI');
      }

      // Clean the response content of any markdown formatting
      const cleanContent = completion.choices[0].message.content
        .replace(/```json\n/, '')  // Remove opening markdown
        .replace(/```/, '')        // Remove closing markdown
        .trim();                   // Remove any extra whitespace

      return yieldEstimationResponseSchema.parse(
        JSON.parse(cleanContent)
      );
    } catch (error) {
      this.logger.error(`Error estimating yields`, {
        error: error.message,
        stack: error.stack,
        request
      });
      throw error;
    }
  }
}
