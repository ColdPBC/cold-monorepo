import { z } from 'zod';

export const Survey_dataScalarFieldEnumSchema = z.enum(['id','organization_id','data','created_at','updated_at','survey_definition_id']);

export default Survey_dataScalarFieldEnumSchema;
