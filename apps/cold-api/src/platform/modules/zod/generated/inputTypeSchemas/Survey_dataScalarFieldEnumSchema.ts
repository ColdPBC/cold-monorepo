import { z } from 'zod';

export const Survey_dataScalarFieldEnumSchema = z.enum(['id','survey_definition_id','organization_id','data','created_at','updated_at']);

export default Survey_dataScalarFieldEnumSchema;
