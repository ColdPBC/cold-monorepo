import { z } from 'zod';

export const survey_typesSchema = z.enum(['JOURNEY','FOOTPRINT','ENRICHMENT','SOLUTION','TEST']);

export type survey_typesType = `${z.infer<typeof survey_typesSchema>}`

export default survey_typesSchema;
