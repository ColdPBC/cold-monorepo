import { NotFoundException } from '@nestjs/common';
import { NewsService } from './news.service';
import { fullReqExample } from '../_global/global.examples';

describe('NewsService', () => {
  const buildService = () => {
    const prisma = {
      news: {
        create: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
      },
    } as any;

    const cache = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    } as any;

    const mqtt = {
      publishMQTT: jest.fn(),
    } as any;

    return {
      service: new NewsService(prisma, cache, mqtt),
      prisma,
      cache,
      mqtt,
    };
  };

  it('should be defined', () => {
    const { service } = buildService();
    expect(service).toBeDefined();
  });

  it('create persists article and publishes completion event', async () => {
    const { service, prisma, mqtt } = buildService();
    prisma.news.create.mockResolvedValue({ id: 'n1', title: 'hello' });
    jest.spyOn(service, 'getArticles').mockResolvedValue([] as any);

    const result = await service.create(fullReqExample as any, { title: 'hello' } as any);

    expect(prisma.news.create).toHaveBeenCalled();
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'create', status: 'complete' }));
    expect(result).toEqual({ id: 'n1', title: 'hello' });
  });

  it('delete throws when article is missing', async () => {
    const { service, prisma } = buildService();
    prisma.news.findUnique.mockResolvedValue(null);

    await expect(service.delete(fullReqExample as any, 'missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('returns cached articles when bypass cache is enabled and cache is full', async () => {
    const { service, cache, prisma } = buildService();
    const cached = [{ id: '1' }, { id: '2' }, { id: '3' }];
    cache.get.mockResolvedValue(cached);

    const result = await service.getArticles(fullReqExample as any, 3, 0, true, true);

    expect(prisma.news.findMany).not.toHaveBeenCalled();
    expect(result).toEqual(cached);
  });
});
