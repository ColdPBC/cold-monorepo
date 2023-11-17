import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import * as z from 'zod';
import Survey_typesSchema from '../generated/inputTypeSchemas/survey_typesSchema';

export const FollowUpSchema = extendApi(
  z.object({
    idx: z.number().int().min(0),
    value: z.any().optional().nullable(),
    prompt: z.string(),
    options: z.array(z.string()).nullable().optional(),
    component: z.string().nullable(),
    tooltip: z.string().nullable().optional(),
    placeholder: z.string().nullable().optional(),
  }),
);

export type ZodFollowUp = z.infer<typeof FollowUpSchema>;
export class ZodFollowUpDto extends createZodDto(FollowUpSchema) {}

export const SurveySectionSchema = extendApi(
  z.object({
    title: z.string(),
    value: z.any().optional().nullable(),
    prompt: z.string(),
    component: z.string().nullable(),
    follow_up: z.record(FollowUpSchema),
  }),
);

export type ZodSurveySection = z.infer<typeof SurveySectionSchema>;
export class ZodSurveySectionDto extends createZodDto(SurveySectionSchema) {}

export const SurveyDefinitionSchema = extendApi(
  z
    .object({
      title: z.string(),
      sections: z.record(SurveySectionSchema),
      image_url: z.string().url(),
      intro_markdown: z.string(),
    })
    .strip(),
);

export type ZodSurveyDefinition = z.infer<typeof SurveyDefinitionSchema>;
export class ZodSurveyDefinitionDto extends createZodDto(SurveyDefinitionSchema) {}

export const SurveyResponseSchema = extendApi(
  z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      type: Survey_typesSchema,
      definition: SurveyDefinitionSchema,
      description: z.string().optional().nullable(),
      created_at: z.date(),
      updated_at: z.date().optional(),
    })
    .strip(),
);

export type ZodSurveyResponse = z.infer<typeof SurveyResponseSchema>;
export class ZodSurveyResponseDto extends createZodDto(SurveyResponseSchema) {}
