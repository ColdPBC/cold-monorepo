import { z } from 'zod';

export const materialInputSchema = z.object({
  id: z.string().describe('The unique identifier for the material'),
  name: z.string().describe('The name of the material'),
  yield: z.number().positive().optional().describe('The yield amount of the material, if known'),
  uom: z.string().optional().describe('Unit of measurement for the yield, if known'),
  description: z.string().optional().describe('Additional description of the material'),
  category: z.string().optional().describe('Category of the material (e.g., Fabric, Trim)'),
  placement: z.string().optional().describe('The placement of the material within the product'),
});

export const yieldEstimationRequestSchema = z.object({
  materials: z.array(materialInputSchema).min(1).describe('Array of materials that make up the product'),
  productName: z.string().describe('The name of the product'),
  productCategory: z.string().optional().describe('Category of the product (e.g., Jackets, Bags)'),
});

export type MaterialInput = z.infer<typeof materialInputSchema>;
export type YieldEstimationRequest = z.infer<typeof yieldEstimationRequestSchema>;

export const materialEstimateSchema = z.object({
  yield: z.number().positive().describe('Estimated yield of the material'),
  uom: z.string().optional().describe('Unit of measurement for the estimated yield'),
  confidence: z.number().min(0).max(1).describe('Confidence score (0-1) for this material estimate'),
  reasoning: z.string().optional().describe('Explanation for this material\'s yield estimate'),
});

export const yieldEstimationResponseSchema = z.object({
  estimates: z.record(materialEstimateSchema).describe('Map of material IDs to their yield estimates'),
  overallConfidence: z.number().min(0).max(1).describe('Overall confidence score for all estimates'),
  reasoning: z.string().optional().describe('Overall explanation of the estimation process')
});

export type MaterialEstimate = z.infer<typeof materialEstimateSchema>;
export type YieldEstimationResponse = z.infer<typeof yieldEstimationResponseSchema>;
