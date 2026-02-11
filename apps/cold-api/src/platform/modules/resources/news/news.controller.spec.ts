import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { fullReqExample } from '../_global/global.examples';

describe('NewsController', () => {
  let controller: NewsController;
  let service: jest.Mocked<Pick<NewsService, 'getArticles' | 'create' | 'delete'>>;

  beforeEach(() => {
    service = {
      getArticles: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    controller = new NewsController(service as unknown as NewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('uses defaults when take/skip/bpc are not provided', async () => {
    await controller.getArticles(fullReqExample as any, undefined as any, undefined as any, undefined as any, true);
    expect(service.getArticles).toHaveBeenCalledWith(fullReqExample, 3, 0, false, true);
  });

  it('delegates create', async () => {
    const payload = { title: 'news-title' } as any;
    await controller.create(payload, fullReqExample as any);
    expect(service.create).toHaveBeenCalledWith(fullReqExample, payload);
  });

  it('delegates delete', async () => {
    await controller.Delete('n1', fullReqExample as any);
    expect(service.delete).toHaveBeenCalledWith(fullReqExample, 'n1');
  });
});
