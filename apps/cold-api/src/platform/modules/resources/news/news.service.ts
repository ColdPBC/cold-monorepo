import { Injectable, NotFoundException } from '@nestjs/common';
import { news } from '@prisma/client';
import { Span } from 'nestjs-ddtrace';
import { AuthenticatedUser } from '../../../primitives/interfaces/user.interface';
import { BaseWorker } from '../../../worker/worker.class';
import { CacheService } from '../../cache/cache.service';
import { PrismaService } from '../../vendor/prisma/prisma.service';
import { CreateArticleDto } from './dto/news-article.dto';

@Span()
@Injectable()
export class NewsService extends BaseWorker {
  constructor(private prisma: PrismaService, private readonly cache: CacheService) {
    super('PolicyContentService');
  }

  /***
   * This action creates a new policy definition
   * @param user AuthenticatedUser
   * @param payload CreateArticleDto
   */
  async create(user: AuthenticatedUser, payload: CreateArticleDto): Promise<CreateArticleDto> {
    try {
      payload.created_at = new Date();

      const article = await this.prisma.news.create({
        data: payload,
      });

      this.logger.info('created news article', article);

      //rebuild cache async
      await this.getArticles(user, 3, 0, true, true);

      return article;
    } catch (e) {
      this.logger.error(e, { payload });
      throw e;
    }
  }

  /***
   * This action deletes a policy definition
   * @param user AuthenticatedUser
   * @param id string
   */
  async delete(user: AuthenticatedUser, id: string): Promise<void> {
    const article = await this.prisma.news.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new NotFoundException(`Article ${id} not found`);
    }

    await this.prisma.news.delete({
      where: {
        id,
      },
    });

    this.logger.info(`deleted article ${id}`, article);

    //rebuild cache async
    await this.getArticles(user, 3, 0, true, true);
  }

  async getArticles(user: AuthenticatedUser, take: number, skip: number, bpc: boolean, published = true): Promise<news[]> {
    if (bpc) {
      const cached = await this.cache.get(`organizations:${user.coldclimate_claims.org_id}:news:${take}${skip}`);
      if (Array.isArray(cached) && cached.length == take) {
        return cached;
      }
    }

    try {
      await this.cache.delete(`organizations:${user.coldclimate_claims.org_id}:news:${take}${skip}`);

      const news = await this.prisma.news.findMany({
        orderBy: {
          created_at: 'desc',
        },
        take: take,
        skip: skip,
        where: {
          publish: (published = !!'true'),
        },
      });

      if (published) {
        await this.cache.set(`organizations:${user.coldclimate_claims.org_id}:news:${take}${skip}`, news, { ttl: 1000 * 60 * 60 * 24 });
      }

      return news;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
