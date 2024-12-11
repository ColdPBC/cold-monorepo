import { z } from 'zod';

export const materialInputSchema = z.object({
  id: z.string().describe('The unique identifier for the material'),
  name: z.string().describe('The name of the material'),
  yield: z.number().positive().describe('The yield amount of the material'),
  uom: z.string().describe('Unit of measurement for the yield'),
  description: z.string().optional().describe('Additional description of the material'),
  category: z.string().optional().describe('Category of the material (e.g., Fabric, Trim)'),
  features: z.array(z.string()).optional().describe('Special characteristics of the material'),
});

export const weightEstimationRequestSchema = z.object({
  materials: z.array(materialInputSchema).min(1).describe('Array of materials that make up the product'),
  totalProductWeight: z.number().positive().describe('The total weight of the finished product'),
  weightUnit: z.string().describe('Unit of measurement for the total weight and estimated weights'),
});

export type MaterialInput = z.infer<typeof materialInputSchema>;
export type WeightEstimationRequest = z.infer<typeof weightEstimationRequestSchema>;

export const materialEstimateSchema = z.object({
  weight: z.number().positive().describe('Estimated weight of the material'),
  confidence: z.number().min(0).max(1).describe('Confidence score (0-1) for this material estimate'),
  reasoning: z.string().optional().describe('Explanation for this material\'s weight estimate'),
});

export const weightEstimationResponseSchema = z.object({
  estimates: z.record(materialEstimateSchema).describe('Map of material IDs to their weight estimates'),
  overallConfidence: z.number().min(0).max(1).describe('Overall confidence score for all estimates'),
  reasoning: z.string().optional().describe('Overall explanation of the estimation process'),
  warning: z.string().optional().describe('Warning message if weights do not sum to total'),
  actualTotal: z.number().optional().describe('Actual sum of estimated weights')
});

export type MaterialEstimate = z.infer<typeof materialEstimateSchema>;
export type WeightEstimationResponse = z.infer<typeof weightEstimationResponseSchema>;
