import { NotFoundException } from '@nestjs/common';
import { OrganizationFilesService } from './organization.files.service';

describe('OrganizationFilesService', () => {
  const build = () => {
    const cache = {} as any;
    const darkly = {
      subscribeToJsonFlagChanges: jest.fn((_flag, cb) => cb([{ id: 'o1', name: 'Test Org', display_name: 'Test Org' }])),
    } as any;
    const events = {
      sendIntegrationEvent: jest.fn(),
      sendRPCEvent: jest.fn(),
    } as any;
    const integrations = {} as any;
    const s3 = {
      getSignedURL: jest.fn(),
    } as any;
    const mqtt = {
      publishMQTT: jest.fn(),
    } as any;
    const helper = {
      getOrganizationById: jest.fn(),
    } as any;
    const suppliers = {} as any;
    const prisma = {
      service_definitions: { findUnique: jest.fn() },
      organization_files: {
        findMany: jest.fn(),
        update: jest.fn(),
        findUnique: jest.fn(),
      },
    } as any;

    const service = new OrganizationFilesService(cache, darkly, events, integrations, s3, mqtt, helper, suppliers, prisma);
    return { service, darkly, helper, prisma, s3 };
  };

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('subscribes to darkly flag updates on init', async () => {
    const { service, darkly, prisma } = build();
    prisma.service_definitions.findUnique.mockResolvedValue({ id: 'sd1', name: 'cold-platform-openai' });

    await service.onModuleInit();

    expect(darkly.subscribeToJsonFlagChanges).toHaveBeenCalledWith('dynamic-org-white-list', expect.any(Function));
    expect(prisma.service_definitions.findUnique).toHaveBeenCalledWith({ where: { name: 'cold-platform-openai' } });
  });

  it('getFiles throws when organization is missing', async () => {
    const { service, helper } = build();
    helper.getOrganizationById.mockResolvedValue(null);

    await expect(service.getFiles({ user: { id: 'u1' } } as any, 'org_1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getFiles returns db records for organization', async () => {
    const { service, helper, prisma } = build();
    helper.getOrganizationById.mockResolvedValue({ id: 'org_1' });
    prisma.organization_files.findMany.mockResolvedValue([{ id: 'f1' }]);

    const result = await service.getFiles({ user: { id: 'u1' } } as any, 'org_1');

    expect(result).toEqual([{ id: 'f1' }]);
  });

  it('update validates and persists allowed fields', async () => {
    const { service, prisma } = build();
    prisma.organization_files.update.mockResolvedValue({ id: 'f1', type: 'OTHER' });

    const result = await service.update({ organization: { id: 'org_1' } } as any, 'f1', { type: 'OTHER' });

    expect(prisma.organization_files.update).toHaveBeenCalledWith({
      where: { id: 'f1', organization_id: 'org_1' },
      data: { type: 'OTHER' },
    });
    expect(result).toEqual({ id: 'f1', type: 'OTHER' });
  });

  it('update rejects invalid payload fields', async () => {
    const { service } = build();

    await expect(service.update({ organization: { id: 'org_1' } } as any, 'f1', { type: 123 })).rejects.toThrow();
  });

  it('getUrl throws when file is missing', async () => {
    const { service, prisma } = build();
    prisma.organization_files.findUnique.mockResolvedValue(null);

    await expect(service.getUrl({ organization: { id: 'org_1', isTest: true }, user: { coldclimate_claims: { email: 'u@test.com' } } } as any, 'f1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('getUrl returns signed url for existing file', async () => {
    const { service, prisma, s3 } = build();
    prisma.organization_files.findUnique.mockResolvedValue({ id: 'f1', bucket: 'b1', key: 'k1' });
    s3.getSignedURL.mockResolvedValue('https://example.com/signed');

    const result = await service.getUrl({ organization: { id: 'org_1', isTest: true }, user: { coldclimate_claims: { email: 'u@test.com' } } } as any, 'f1');

    expect(s3.getSignedURL).toHaveBeenCalledWith(expect.anything(), 'b1', 'k1', 120);
    expect(result).toBe('https://example.com/signed');
  });
});
