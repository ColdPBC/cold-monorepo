import { z } from 'zod';

export const NewsScalarFieldEnumSchema = z.enum(['id','title','url','image_url','publish','published_at','source_name','created_at','updated_at']);

export default NewsScalarFieldEnumSchema;
