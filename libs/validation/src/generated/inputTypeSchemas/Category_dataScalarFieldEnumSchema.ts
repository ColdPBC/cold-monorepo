import { z } from 'zod';

export const Category_dataScalarFieldEnumSchema = z.enum(['id','category_definition_id','organization_id','data','created_at','updated_at']);

export default Category_dataScalarFieldEnumSchema;
