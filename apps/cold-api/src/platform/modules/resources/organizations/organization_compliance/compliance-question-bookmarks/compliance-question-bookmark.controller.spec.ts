import { ComplianceQuestionBookmarkController } from './compliance-question-bookmark.controller';

describe('ComplianceQuestionBookmarkController', () => {
  const build = () => {
    const service = {
      upsert: jest.fn(),
      findAllByEmail: jest.fn(),
      findByQuestionIdAndEmail: jest.fn(),
      findAllOrgBookmarks: jest.fn(),
      remove: jest.fn(),
    } as any;

    const controller = new ComplianceQuestionBookmarkController(service);
    return { controller, service };
  };

  it('should be defined', () => {
    const { controller } = build();
    expect(controller).toBeDefined();
  });

  it('delegates createBookmark', async () => {
    const { controller, service } = build();
    const req = { user: { id: 'u1' } } as any;
    const body = { bookmarked: true } as any;

    await controller.createBookmark('b_corp_2024', 'cq_1', body, req);

    expect(service.upsert).toHaveBeenCalledWith('b_corp_2024', 'cq_1', body, req);
  });

  it('delegates getBookmarks', async () => {
    const { controller, service } = build();
    const req = { user: { id: 'u1' } } as any;

    await controller.getBookmarks('b_corp_2024', req);

    expect(service.findAllByEmail).toHaveBeenCalledWith('b_corp_2024', req);
  });

  it('delegates getBookmarkByQuestionId', async () => {
    const { controller, service } = build();
    const req = { user: { id: 'u1' } } as any;

    await controller.getBookmarkByQuestionId('b_corp_2024', 'cq_1', req);

    expect(service.findByQuestionIdAndEmail).toHaveBeenCalledWith('b_corp_2024', 'cq_1', req);
  });

  it('delegates getAllBookmarkByQuestionId', async () => {
    const { controller, service } = build();
    const req = { user: { id: 'u1' } } as any;

    await controller.getAllBookmarkByQuestionId('b_corp_2024', req);

    expect(service.findAllOrgBookmarks).toHaveBeenCalledWith('b_corp_2024', req);
  });

  it('delegates deleteBookmark', async () => {
    const { controller, service } = build();
    const req = { user: { id: 'u1' } } as any;

    await controller.deleteBookmark('cq_1', req);

    expect(service.remove).toHaveBeenCalledWith('cq_1', req);
  });
});
