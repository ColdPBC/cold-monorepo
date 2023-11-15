import { z } from 'zod';

/////////////////////////////////////////
// NEWS SCHEMA
/////////////////////////////////////////

/**
 * @namespace News
 * @describe News is a way to share climate information with users of the app.
 */
export const newsSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  url: z.string().url(),
  image_url: z.string().url(),
  publish: z.boolean(),
  published_at: z.coerce.date(),
  source_name: z.string(),
  /**
   * @DtoUpdateHidden
   */
  created_at: z.date().optional(),
  /**
   * @DtoUpdateHidden
   * @DtoCreateHidden
   * @DtoReadOnly
   */
  updated_at: z.date().optional(),
})

export type news = z.infer<typeof newsSchema>

export default newsSchema;
