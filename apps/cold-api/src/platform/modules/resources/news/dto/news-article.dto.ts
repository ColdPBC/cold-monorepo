import { news } from '@prisma/client';

export class CreateArticleDto implements news {
  id: string;
  image_url: string;
  published_at: Date;
  source_name: string;
  title: string;
  url: string;
  publish: boolean;
  created_at: Date;
  updated_at: Date;
}
