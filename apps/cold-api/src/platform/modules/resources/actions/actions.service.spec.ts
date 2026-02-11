import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { fullReqExample } from '../_global/global.examples';

jest.mock('uuid', () => ({ v4: () => 'uuid-1' }));

describe('ActionsService', () => {
  const buildService = () => {
    const prisma = {
      actions: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      action_templates: {
        findUnique: jest.fn(),
        delete: jest.fn(),
      },
    } as any;

    const cacheService = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    } as any;

    const surveys = {
      findOne: jest.fn(),
    } as any;

    const mqtt = {
      publishMQTT: jest.fn(),
    } as any;

    return {
      service: new ActionsService(prisma, cacheService, surveys, mqtt),
      prisma,
      cacheService,
      surveys,
      mqtt,
    };
  };

  const req = () => JSON.parse(JSON.stringify(fullReqExample));

  it('should be defined', () => {
    const { service } = buildService();
    expect(service).toBeDefined();
  });

  it('returns actions for authorized user and filters dependent surveys', async () => {
    const { service, prisma, surveys, cacheService } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    prisma.actions.findMany.mockResolvedValue([
      {
        id: 'a1',
        action: { dependent_surveys: [{ name: 's1' }] },
      },
      { id: 'a2', action: null },
    ]);
    surveys.findOne.mockResolvedValue({ name: 's1', definition: { title: 'Survey 1', submitted: true } });

    const result = await service.getActions(r, 'org-1', false);

    expect(result[0].action.dependent_surveys).toEqual([{ name: 's1', title: 'Survey 1', submitted: true }]);
    expect(cacheService.set).toHaveBeenCalledWith('organizations:org-1:actions', expect.any(Array), expect.any(Object));
  });

  it('returns unauthorized exception object for getActions when org mismatch', async () => {
    const { service } = buildService();
    const r = req();
    r.user.isColdAdmin = false;
    r.user.coldclimate_claims.org_id = 'org-other';

    const result = await service.getActions(r, 'org-1', false);

    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('getActions tolerates dependent survey resolution failures', async () => {
    const { service, prisma, surveys } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    prisma.actions.findMany.mockResolvedValue([{ id: 'a1', action: { dependent_surveys: [{ name: 'missing' }] } }]);
    surveys.findOne.mockRejectedValue(new Error('not found'));

    const result = await service.getActions(r, 'org-1');

    expect(result[0].action.dependent_surveys).toEqual([]);
  });

  it('returns cached action when present', async () => {
    const { service, cacheService } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    cacheService.get.mockResolvedValue({ id: 'cached-action' });

    const result = await service.getAction(r, 'org-1', 'a1', false);

    expect(cacheService.get).toHaveBeenCalledWith('organizations:org-1:actions:a1');
    expect(result).toEqual({ id: 'cached-action' });
  });

  it('loads action from prisma and caches when not in cache', async () => {
    const { service, prisma, cacheService, surveys } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    cacheService.get.mockResolvedValue(null);
    prisma.actions.findUnique.mockResolvedValue({ id: 'a1', action: { dependent_surveys: [] } });
    surveys.findOne.mockResolvedValue({});

    const result = await service.getAction(r, 'org-1', 'a1', false);

    expect(prisma.actions.findUnique).toHaveBeenCalled();
    expect(cacheService.set).toHaveBeenCalledWith('organizations:org-1:actions:a1', expect.any(Object), expect.any(Object));
    expect(result.id).toBe('a1');
  });

  it('getAction throws NotFoundException when action does not exist', async () => {
    const { service, prisma, cacheService } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    cacheService.get.mockResolvedValue(null);
    prisma.actions.findUnique.mockResolvedValue(null);

    await expect(service.getAction(r, 'org-1', 'a1', true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('createActionFromTemplate creates merged assignment using prisma template fallback', async () => {
    const { service, cacheService, prisma, mqtt } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    cacheService.get.mockResolvedValue(null);
    prisma.action_templates.findUnique.mockResolvedValue({ id: 'tmpl_1', template: { x: 1 } });
    prisma.actions.create.mockResolvedValue({ id: 'created_1' });
    jest.spyOn(service, 'getActions').mockResolvedValue([] as any);

    const result = await service.createActionFromTemplate(r, 'org-1', 'tmpl_1', { template: { y: 2 } } as any, false);

    expect(prisma.actions.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ id: 'uuid-1', organization_id: 'org-1' }) }),
    );
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'create' }));
    expect(result).toEqual({ id: 'created_1' });
  });

  it('createActionFromTemplate throws when template is missing', async () => {
    const { service, cacheService, prisma } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    cacheService.get.mockResolvedValue(null);
    prisma.action_templates.findUnique.mockResolvedValue(null);

    await expect(service.createActionFromTemplate(r, 'org-1', 'tmpl_1', { template: {} } as any, false)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updateAction updates action and publishes mqtt complete', async () => {
    const { service, prisma, mqtt } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    prisma.actions.findUnique.mockResolvedValue({ id: 'a1', action: { x: 1 } });
    prisma.actions.update.mockResolvedValue({ id: 'a1', action: { x: 1, action: { y: 2 } } });
    jest.spyOn(service, 'getActions').mockResolvedValue([] as any);

    const result = await service.updateAction(r, 'org-1', 'a1', { action: { y: 2 } } as any, false);

    expect(prisma.actions.update).toHaveBeenCalled();
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'update', status: 'complete' }));
    expect(result).toEqual({ id: 'a1', action: { x: 1, action: { y: 2 } } });
  });

  it('updateAction returns error object when unauthorized', async () => {
    const { service } = buildService();
    const r = req();
    r.user.isColdAdmin = false;
    r.user.coldclimate_claims.org_id = 'other';

    const result = await service.updateAction(r, 'org-1', 'a1', { action: {} } as any, false);

    expect(result).toBeInstanceOf(UnauthorizedException);
  });

  it('updateAction returns error when action is missing', async () => {
    const { service, prisma } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    prisma.actions.findUnique.mockResolvedValue(null);

    const result = await service.updateAction(r, 'org-1', 'a1', { action: {} } as any, false);

    expect(result).toBeInstanceOf(NotFoundException);
  });

  it('deleteAction deletes template and refreshes cache', async () => {
    const { service, prisma, cacheService, mqtt } = buildService();
    const r = req();
    r.user.isColdAdmin = true;
    prisma.action_templates.delete.mockResolvedValue({ id: 'a1' });
    jest.spyOn(service, 'getActions').mockResolvedValue([] as any);

    const result = await service.deleteAction(r, 'org-1', 'a1');

    expect(cacheService.delete).toHaveBeenCalledWith('organizations:org-1:actions', true);
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'delete', status: 'complete' }));
    expect(result).toEqual({ id: 'a1' });
  });

  it('deleteAction returns unauthorized exception object on org mismatch', async () => {
    const { service } = buildService();
    const r = req();
    r.user.isColdAdmin = false;
    r.user.coldclimate_claims.org_id = 'other';

    const result = await service.deleteAction(r, 'org-1', 'a1');

    expect(result).toBeInstanceOf(UnauthorizedException);
  });
});
