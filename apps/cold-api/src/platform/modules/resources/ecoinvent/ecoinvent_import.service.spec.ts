import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService, S3Service } from '@coldpbc/nest';
import { getQueueToken } from '@nestjs/bull';
import { EcoinventImportService } from './ecoinvent_import.service';

describe('EcoinventImportService', () => {
  let service: EcoinventImportService;
  const handlers: Record<string, Function> = {};

  const s3 = {
    getObject: jest.fn(),
  };

  const prisma = {
    ecoinvent_imports: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      createMany: jest.fn(),
      update: jest.fn(),
    },
  };

  const queue = {
    on: jest.fn((event: string, fn: Function) => {
      handlers[event] = fn;
    }),
    add: jest.fn(),
    getJob: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    for (const k of Object.keys(handlers)) delete handlers[k];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EcoinventImportService,
        { provide: S3Service, useValue: s3 },
        { provide: PrismaService, useValue: prisma },
        { provide: getQueueToken('ecoinvent:import'), useValue: queue },
      ],
    }).compile();

    service = module.get<EcoinventImportService>(EcoinventImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('onModuleInit registers queue handlers', async () => {
    await service.onModuleInit();

    expect(queue.on).toHaveBeenCalledWith('completed', expect.any(Function));
    expect(queue.on).toHaveBeenCalledWith('failed', expect.any(Function));
  });

  it('completed handler updates import row when found', async () => {
    await service.onModuleInit();
    prisma.ecoinvent_imports.findUnique.mockResolvedValue({ id: 'imp_1' });
    const job = {
      id: 'j1',
      data: { jobId: 'imp_1' },
      getState: jest.fn().mockResolvedValue('completed'),
      discard: jest.fn().mockResolvedValue(undefined),
    };

    await handlers.completed(job, {});

    expect(prisma.ecoinvent_imports.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'imp_1' }, data: expect.objectContaining({ processing_status: 'IMPORT_COMPLETE' }) }),
    );
    expect(job.discard).toHaveBeenCalled();
  });

  it('failed handler updates import row when found', async () => {
    await service.onModuleInit();
    prisma.ecoinvent_imports.findUnique.mockResolvedValue({ id: 'imp_2' });
    const job = {
      data: { jobId: 'imp_2' },
      getState: jest.fn().mockResolvedValue('failed'),
    };

    await handlers.failed(job, new Error('boom'));

    expect(prisma.ecoinvent_imports.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'imp_2' }, data: expect.objectContaining({ processing_status: 'PROCESSING_ERROR' }) }),
    );
  });

  it('importCsv returns early when S3 object is missing', async () => {
    s3.getObject.mockResolvedValue(null);

    await expect(service.importCsv({ user: { id: 'u1' } })).resolves.toBeUndefined();
  });

  it('importCsv returns early when csv content is missing', async () => {
    s3.getObject.mockResolvedValue({ Body: { transformToString: jest.fn().mockResolvedValue('') } });

    await expect(service.importCsv({ user: { id: 'u1' } })).resolves.toBeUndefined();
  });

  it('importCsv handles getObject errors', async () => {
    s3.getObject.mockRejectedValue(new Error('s3 down'));

    await expect(service.importCsv({ user: { id: 'u1' } })).resolves.toBeUndefined();
  });

  it('queueImportJobs adds queue jobs and marks records queued', async () => {
    prisma.ecoinvent_imports.findMany.mockResolvedValue([
      {
        id: 'imp_1',
        bucket: 'b',
        key: 'root/datasets/file.xml',
        activity_name: 'A',
        location: 'RoW',
        reference_product: 'p',
      },
    ]);
    queue.add.mockResolvedValue({ data: { jobId: 'imp_1' } });

    await service.queueImportJobs({ user: { id: 'u1' }, organization: { id: 'o1' } }, 'RoW', false, true);

    expect(prisma.ecoinvent_imports.findMany).toHaveBeenCalledWith({ where: { AND: [{ job_status: 'PENDING' }, { location: 'RoW' }] } });
    expect(queue.add).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: 'imp_1', lcia_key: 'root/datasets/file.xml.lcia_data.undefined' }),
      { removeOnComplete: true },
    );
    expect(prisma.ecoinvent_imports.update).toHaveBeenCalledWith({ where: { id: 'imp_1' }, data: { job_status: 'QUEUED' } });
  });

  it('queueImportJobs omits pending filter when reprocess=true', async () => {
    prisma.ecoinvent_imports.findMany.mockResolvedValue([]);

    await service.queueImportJobs({ user: { id: 'u1' }, organization: { id: 'o1' } }, undefined, true, false);

    expect(prisma.ecoinvent_imports.findMany).toHaveBeenCalledWith({ where: { AND: [] } });
  });
});
