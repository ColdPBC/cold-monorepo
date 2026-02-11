import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import { PrismaService, S3Service } from '@coldpbc/nest';
import { file_types, processing_status } from '@prisma/client';
import { LinearService } from './linear.service';

describe('LinearService', () => {
  const build = () => {
    const configService = {
      getOrThrow: jest.fn().mockReturnValue('test-key'),
    } as unknown as ConfigService;

    const s3 = {
      client: {
        send: jest.fn(),
      },
    } as unknown as S3Service;

    const prisma = {
      organization_files: {
        updateMany: jest.fn(),
        update: jest.fn(),
      },
      organizations: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    } as unknown as PrismaService;

    const service = new LinearService(configService, s3, prisma);

    (service as any).client = {
      archiveIssue: jest.fn(),
      createIssue: jest.fn(),
      createAttachment: jest.fn(),
      fileUpload: jest.fn(),
      createWebhook: jest.fn(),
    };

    return { service, s3: s3 as any, prisma: prisma as any, client: (service as any).client as any };
  };

  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('updateFileStatus updates matching files and archives in staging/development', async () => {
    const { service, prisma, client } = build();
    process.env.NODE_ENV = 'staging';
    prisma.organization_files.updateMany.mockResolvedValue({ count: 2 });

    const result = await service.updateFileStatus(processing_status.MANUAL_REVIEW, {
      id: 123,
      state: { name: 'Done' },
    } as any);

    expect(prisma.organization_files.updateMany).toHaveBeenCalledWith({
      where: {
        metadata: {
          path: ['linear_issue_id'],
          equals: '123',
        },
      },
      data: { processing_status: processing_status.MANUAL_REVIEW },
    });
    expect(client.archiveIssue).toHaveBeenCalledWith('123');
    expect(result).toEqual({ count: 2 });
  });

  it('updateFileStatus does not archive in production', async () => {
    const { service, prisma, client } = build();
    process.env.NODE_ENV = 'production';
    prisma.organization_files.updateMany.mockResolvedValue({ count: 1 });

    await service.updateFileStatus(processing_status.IMPORT_COMPLETE, { id: 'abc', state: { name: 'Done' } } as any);

    expect(client.archiveIssue).not.toHaveBeenCalled();
  });

  it('getFile throws when bucket or key is missing', async () => {
    const { service } = build();

    await expect(service.getFile({ bucket: null, key: null } as any)).rejects.toThrow('Bucket or Key not found');
  });

  it('getFile throws when S3 body is missing', async () => {
    const { service, s3 } = build();
    s3.client.send.mockResolvedValue({ ContentType: 'text/plain', Body: undefined });

    await expect(service.getFile({ bucket: 'b', key: 'k', original_name: 'x.txt' } as any)).rejects.toThrow('S3 response Body is undefined');
  });

  it('getFile returns a File from S3 response', async () => {
    const { service, s3 } = build();
    s3.client.send.mockResolvedValue({
      ContentType: 'text/plain',
      Body: Readable.from(Buffer.from('hello world')),
    });

    const file = await service.getFile({ bucket: 'b', key: 'k', original_name: 'hello.txt' } as any);

    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('hello.txt');
    expect(file.type).toBe('text/plain');
  });

  it('uploadFileToLinear throws when upload URL request fails', async () => {
    const { service, client } = build();
    client.fileUpload.mockResolvedValue({ success: false });

    await expect(service.uploadFileToLinear(new File(['x'], 'x.txt', { type: 'text/plain' }))).rejects.toThrow('Failed to request upload URL');
  });

  it('uploadFileToLinear uploads via PUT and returns assetUrl', async () => {
    const { service, client } = build();
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as any);
    client.fileUpload.mockResolvedValue({
      success: true,
      uploadFile: {
        uploadUrl: 'https://upload.example.com',
        assetUrl: 'https://asset.example.com/x.txt',
        headers: [{ key: 'x-amz-acl', value: 'private' }],
      },
    });

    const file = new File(['content'], 'x.txt', { type: 'text/plain' });
    const asset = await service.uploadFileToLinear(file);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://upload.example.com',
      expect.objectContaining({ method: 'PUT', body: file }),
    );
    expect(asset).toBe('https://asset.example.com/x.txt');

    global.fetch = originalFetch;
  });

  it('getLabel returns mapped labels and default fallback', () => {
    const { service } = build();

    expect(service.getLabel(file_types.PURCHASE_ORDER)).toBe(service.ingestion_po_label_id);
    expect(service.getLabel(file_types.BILL_OF_MATERIALS)).toBe(service.ingestion_bom_label_id);
    expect(service.getLabel('UNKNOWN' as any)).toBe(service.ingestion_other_label_id);
  });

  it('createIngestionIssue delegates with computed label', async () => {
    const { service } = build();
    const createIssueSpy = jest.spyOn(service, 'createIssue').mockResolvedValue({} as any);
    const data = { orgFile: { type: file_types.PURCHASE_ORDER } } as any;

    await service.createIngestionIssue(data);

    expect(createIssueSpy).toHaveBeenCalledWith([service.ingestion_po_label_id], data);
  });

  it('createIngestionFailedIssue includes failed label and file label', async () => {
    const { service } = build();
    const createIssueSpy = jest.spyOn(service, 'createIssue').mockResolvedValue({} as any);
    const data = { orgFile: { type: file_types.BILL_OF_MATERIALS } } as any;

    await service.createIngestionFailedIssue(data);

    expect(createIssueSpy).toHaveBeenCalledWith([service.ai_processing_failed_label_id, service.ingestion_bom_label_id], data);
  });

  it('createIssue builds payload, persists metadata, and attaches file', async () => {
    const { service, client, prisma } = build();
    process.env.NODE_ENV = 'production';
    client.createIssue.mockResolvedValue({ issue: Promise.resolve({ id: 'iss_1' }) });
    client.createAttachment.mockResolvedValue({});
    prisma.organization_files.update.mockResolvedValue({});
    jest.spyOn(service as any, 'createWebhook').mockResolvedValue({ id: 'wh_1' });
    jest.spyOn(service, 'getFile').mockResolvedValue(new File(['a'], 'a.txt', { type: 'text/plain' }));
    jest.spyOn(service, 'uploadFileToLinear').mockResolvedValue('https://asset.example.com/a.txt');

    const data = {
      organization: { id: 'org_1', display_name: 'Org', linear_webhook_id: null },
      user: { coldclimate_claims: { email: 'user@example.com' } },
      orgFile: {
        id: 'file_1',
        original_name: 'a.txt',
        size: 1,
        type: file_types.PURCHASE_ORDER,
        mimetype: 'text/plain',
        metadata: {},
      },
    } as any;

    const issue = await service.createIssue(['label_1'], data);

    expect(issue).toEqual({ id: 'iss_1' });
    expect(client.createIssue).toHaveBeenCalledWith(
      expect.objectContaining({
        teamId: service.customer_success_team_id,
        projectId: service.ingestion_project_id,
        stateId: service.initial_workflow_state_id,
        labelIds: ['label_1'],
      }),
    );
    expect(prisma.organization_files.update).toHaveBeenCalledWith({
      where: { id: 'file_1' },
      data: expect.objectContaining({ processing_status: processing_status.MANUAL_REVIEW }),
    });
    expect(client.createAttachment).toHaveBeenCalledWith(
      expect.objectContaining({ issueId: 'iss_1', url: 'https://asset.example.com/a.txt' }),
    );
  });

  it('createIssue throws when created issue has no id', async () => {
    const { service, client } = build();
    process.env.NODE_ENV = 'development';
    client.createIssue.mockResolvedValue({ issue: Promise.resolve({}) });
    jest.spyOn(service as any, 'createWebhook').mockResolvedValue({ id: 'wh_1' });

    await expect(
      service.createIssue(['label_1'], {
        organization: { id: 'org_1', display_name: 'Org', linear_webhook_id: 'wh_1' },
        user: { coldclimate_claims: { email: 'user@example.com' } },
        orgFile: { id: 'file_1', original_name: 'a.txt', size: 1, type: file_types.OTHER, mimetype: 'text/plain', metadata: {} },
      } as any),
    ).rejects.toThrow('Failed to create issue');
  });

  it('createWebhook provisions org and stores webhook id', async () => {
    const { service, prisma, client } = build();
    process.env.NODE_ENV = 'staging';
    prisma.organizations.findUnique.mockResolvedValue({
      id: 'org_1',
      display_name: 'Org',
      linear_secret: null,
    });
    prisma.organizations.update.mockResolvedValue({});
    client.createWebhook.mockResolvedValue({ webhook: Promise.resolve({ id: 'wh_1' }) });

    const webhook = await (service as any).createWebhook({
      organization: null,
      user: { coldclimate_claims: { email: 'user@example.com' } },
      orgFile: { organization_id: 'org_1' },
    });

    expect(webhook).toEqual({ id: 'wh_1' });
    expect(prisma.organizations.findUnique).toHaveBeenCalledWith({ where: { id: 'org_1' } });
    expect(client.createWebhook).toHaveBeenCalled();
    expect(prisma.organizations.update).toHaveBeenCalledWith({
      where: { id: 'org_1' },
      data: { linear_webhook_id: 'wh_1' },
    });
  });

  it('createWebhook returns undefined when webhook creation fails', async () => {
    const { service, client } = build();
    client.createWebhook.mockResolvedValue({ webhook: Promise.resolve({}) });

    const result = await (service as any).createWebhook({
      organization: { id: 'org_1', display_name: 'Org', linear_secret: 'sec' },
      user: { coldclimate_claims: { email: 'user@example.com' } },
      orgFile: { organization_id: 'org_1' },
    });

    expect(result).toBeUndefined();
  });
});
