import { z } from 'zod';

export const ActionsScalarFieldEnumSchema = z.enum(['id','action','action_template_id','organization_id','created_at','updated_at']);

export default ActionsScalarFieldEnumSchema;
