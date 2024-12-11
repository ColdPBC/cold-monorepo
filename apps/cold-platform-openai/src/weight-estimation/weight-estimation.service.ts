// src/weight-estimation/weight-estimation.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, PrismaService, IAuthenticatedUser } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  WeightEstimationRequest,
  WeightEstimationResponse,
  weightEstimationRequestSchema,
  weightEstimationResponseSchema,
  MaterialInput
} from '../schemas';

@Injectable()
export class WeightEstimationService extends BaseWorker implements OnModuleInit {
  private openAIClient: OpenAI;

  constructor(
    readonly config: ConfigService,
    readonly prisma: PrismaService,
  ) {
    super(WeightEstimationService.name);
    this.openAIClient = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async onModuleInit() {
    this.logger.info('Weight Estimation Service Initialized');
  }

  private validateMaterial(material: MaterialInput): void {
    if (!material.yield || material.yield <= 0) {
      throw new Error(`Invalid yield for material ${material.id}: ${material.yield}`);
    }
    if (!material.uom) {
      throw new Error(`Missing unit of measurement for material ${material.id}`);
    }
  }

  private buildPrompt(request: WeightEstimationRequest): string {
    // Validate each material before building the prompt
    request.materials.forEach(this.validateMaterial);

    const materialsDescription = request.materials
      .map(m => {
        const features = m.features?.length
          ? `Additional features: ${m.features.join(', ')}`
          : '';
        return `
- Material ID: ${m.id}
  Name: ${m.name}
  Yield: ${m.yield} ${m.uom}
  ${m.category ? `Category: ${m.category}` : ''}
  ${m.description ? `Description: ${m.description}` : ''}
  ${features}`;
      })
      .join('\n');

    return `You are an expert in apparel materials and manufacturing. Please estimate the weight of each material in a product based on the following information:

Total product weight: ${request.totalProductWeight} ${request.weightUnit}

Materials:
${materialsDescription}

Requirements:
1. The sum of individual material weights MUST EXACTLY equal the total product weight (${request.totalProductWeight} ${request.weightUnit})
2. Each weight estimate should consider:
   - Material type and properties
   - Yield and unit of measurement
   - Typical weight per area/volume for this material type
   - Standard material thicknesses in apparel
   - Relative proportion expectations (e.g., main fabric usually dominates)
3. Estimates should be realistic for apparel manufacturing

Please provide:
1. For each material:
   - Weight estimate (in ${request.weightUnit})
   - Confidence score (0-1) specific to this material
   - Brief reasoning for this material's estimate
2. Overall confidence score (0-1)
3. Overall explanation of your reasoning process

Return the response in the following JSON format:
{
  "estimates": {
    "materialId": {
      "weight": number,
      "confidence": number,
      "reasoning": "string"
    }
  },
  "overallConfidence": number,
  "reasoning": "string"
}`;
  }

  async estimateWeights(
    request: WeightEstimationRequest,
    user: IAuthenticatedUser,
  ): Promise<WeightEstimationResponse> {
    try {
      // Validate request using Zod schema
      const parsedRequest = weightEstimationRequestSchema.parse(request);
      const prompt = this.buildPrompt(parsedRequest);

      const completion = await this.openAIClient.chat.completions.create({
        model: 'gpt-4o-2024-08-06',
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

      const response = weightEstimationResponseSchema.parse(
        JSON.parse(cleanContent)
      );

      // Calculate total and add warning if weights don't sum correctly
      const totalEstimated = Object.values(response.estimates)
        .reduce((sum, est) => sum + est.weight, 0);

      if (Math.abs(totalEstimated - request.totalProductWeight) > 0.0001) {
        this.logger.warn('Weight mismatch', {
          estimated: totalEstimated,
          actual: request.totalProductWeight,
          difference: Math.abs(totalEstimated - request.totalProductWeight)
        });

        return {
          ...response,
          warning: `Estimated weights sum to ${totalEstimated}${request.weightUnit}, which differs from the total product weight of ${request.totalProductWeight}${request.weightUnit} by ${Math.abs(totalEstimated - request.totalProductWeight).toFixed(2)}${request.weightUnit}`,
          actualTotal: totalEstimated
        };
      }

      return response;
    } catch (error) {
      this.logger.error(`Error estimating weights`, {
        error: error.message,
        stack: error.stack,
        request
      });
      throw error;
    }
  }
}
