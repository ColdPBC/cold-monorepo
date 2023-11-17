import { z } from 'zod';

export const Category_definitionsScalarFieldEnumSchema = z.enum(['id','name','description','created_at','updated_at','definition']);

export default Category_definitionsScalarFieldEnumSchema;
