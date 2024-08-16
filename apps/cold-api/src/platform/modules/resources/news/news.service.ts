import { Injectable, NotFoundException } from '@nestjs/common';
import { news } from '@prisma/client';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, CacheService, IRequest, MqttService, PrismaService } from '@coldpbc/nest';
import { CreateArticleDto } from './dto/news-article.dto';

@Span()
@Injectable()
export class NewsService extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cache: CacheService, readonly mqtt: MqttService) {
    super('PolicyContentService');
  }

  /***
   * This action creates a new policy definition
   * @param req
   * @param payload CreateArticleDto
   */
  async create(req: IRequest, payload: CreateArticleDto): Promise<CreateArticleDto> {
    const { url } = req;
    try {
      payload.created_at = new Date();

      const article = await this.prisma.news.create({
        data: payload,
      });

      this.logger.info('created news article', article);

      //rebuild cache async
      await this.getArticles(req, 3, 0, true, true);

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          ...article,
        },
      });

      return article;
    } catch (e) {
      this.logger.error(e, { payload });

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          payload,
          error: e.message,
        },
      });
      throw e;
    }
  }

  /***
   * This action deletes a policy definition
   * @param req
   * @param id string
   */
  async delete(req: IRequest, id: string): Promise<void> {
    const { url } = req;
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

    this.mqtt.publishMQTT('public', {
      swr_key: url,
      action: 'delete',
      status: 'complete',
      data: {},
    });

    //rebuild cache async
    await this.getArticles(req, 3, 0, true, true);
  }

  async getArticles(req: IRequest, take: number, skip: number, bpc: boolean, published = true): Promise<news[]> {
    const { user } = req;
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
