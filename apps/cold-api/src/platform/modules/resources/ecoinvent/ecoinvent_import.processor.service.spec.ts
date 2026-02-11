import { Test, TestingModule } from '@nestjs/testing';
import { EventService, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import { parseStringPromise } from 'xml2js';
import { EcoinventImportProcessorService } from './ecoinvent_import.processor.service';

jest.mock('xml2js', () => ({
  parseStringPromise: jest.fn(),
}));

const mockParse = parseStringPromise as jest.Mock;

const makeParsedXML = () => ({
  ecoSpold: {
    childActivityDataset: {
      activityDescription: {
        activity: {
          id: 'act_1',
          activityName: { _: 'Activity One' },
          parentActivityId: 'parent_1',
          includedActivitiesStart: { _: 'start' },
          includedActivitiesEnd: { _: 'end' },
          generalComment: { text: { _: 'note' } },
        },
        geography: {
          shortname: { _: 'RoW' },
        },
      },
    },
  },
});

const makeParsedLCIA = () => ({
  ecoSpold: {
    childActivityDataset: {
      activityDescription: {
        classification: [
          {
            classificationId: 'c_1',
            classificationValue: { _: 'Class One' },
            classificationSystem: { _: 'sys' },
          },
        ],
      },
      flowData: {
        impactIndicator: [
          {
            impactMethodName: 'Not EF',
            impactCategoryId: 'skip',
            name: 'Skip Cat',
            impactCategoryName: 'Skip Indicator',
            amount: '1',
            unitName: 'kg',
          },
          {
            impactMethodName: 'EF v3.1',
            impactCategoryId: 'ic_1',
            name: 'Climate Change',
            impactCategoryName: 'GWP',
            amount: '12.34',
            unitName: 'kg CO2e',
          },
        ],
      },
    },
  },
});

const makeParsedXMLActivityDatasetFallback = () => ({
  ecoSpold: {
    activityDataset: {
      activityDescription: {
        activity: {
          id: 'act_2',
          activityName: { _: 'Activity Two' },
          parentActivityId: 'parent_2',
          includedActivitiesStart: { _: 'a' },
          includedActivitiesEnd: { _: 'b' },
          generalComment: { text: [{ _: 'c1' }, { _: 'c2' }] },
        },
      },
    },
    childActivityDataset: {
      activityDescription: {
        geography: {
          shortname: { _: 'RoW' },
        },
      },
    },
  },
});

describe('EcoinventImportProcessorService', () => {
  let service: EcoinventImportProcessorService;

  const s3 = {
    getObject: jest.fn(),
  };

  const prisma = {
    ecoinvent_data: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
    ecoinvent_activities: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
    ecoinvent_classifications: {
      upsert: jest.fn(),
    },
    ecoinvent_activity_classifications: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    ecoinvent_impact_categories: {
      upsert: jest.fn(),
    },
    ecoinvent_activity_impacts: {
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    prisma.ecoinvent_data.upsert.mockResolvedValue({});
    prisma.ecoinvent_activities.upsert.mockResolvedValue({ id: 'act_1', name: 'Activity One' });
    prisma.ecoinvent_classifications.upsert.mockResolvedValue({ id: 'c_1' });
    prisma.ecoinvent_activity_classifications.findUnique.mockResolvedValue(null);
    prisma.ecoinvent_activity_classifications.create.mockResolvedValue({ id: 'ac_1' });
    prisma.ecoinvent_impact_categories.upsert.mockResolvedValue({ id: 'ic_1', name: 'Climate Change' });
    prisma.ecoinvent_activity_impacts.upsert.mockResolvedValue({ id: 'impact_1' });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EcoinventImportProcessorService,
        { provide: S3Service, useValue: s3 },
        { provide: EventService, useValue: {} },
        { provide: PrismaService, useValue: prisma },
        { provide: MqttService, useValue: {} },
      ],
    }).compile();

    service = module.get<EcoinventImportProcessorService>(EcoinventImportProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns empty result when location is not RoW', async () => {
    const out = await service.importEcoSpoldFile({ data: { location: 'US' } });

    expect(out).toEqual({});
    expect(prisma.ecoinvent_data.upsert).not.toHaveBeenCalled();
  });

  it('imports cached ecoinvent activity data when bpc is false', async () => {
    prisma.ecoinvent_data.findUnique.mockResolvedValue({
      parsed: makeParsedXML(),
      xml: '<xml />',
    });
    prisma.ecoinvent_activities.findUnique.mockResolvedValue({
      raw_data: makeParsedLCIA(),
    });

    const job = {
      data: {
        jobId: 'job_1',
        bucket: 'b',
        key: 'a/b/c.xml',
        activity_name: 'Activity One',
        location: 'RoW',
        user: { id: 'u1' },
        bpc: false,
      },
    };

    const out = await service.importEcoSpoldFile(job);

    expect(out).toEqual({});
    expect(prisma.ecoinvent_data.upsert).toHaveBeenCalled();
    expect(prisma.ecoinvent_activities.upsert).toHaveBeenCalled();
    expect(prisma.ecoinvent_classifications.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'c_1' } }),
    );
    expect(prisma.ecoinvent_activity_classifications.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: { ecoinvent_activity_id: 'act_1', ecoinvent_classification_id: 'c_1' } }),
    );
    expect(prisma.ecoinvent_impact_categories.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { ecoinventImpactCategoryNameMethod: { impact_method: 'EF v3.1', name: 'Climate Change' } } }),
    );
    expect(prisma.ecoinvent_activity_impacts.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({ impact_value: 12.34, indicator_name: 'GWP' }),
      }),
    );
  });

  it('skips classification create when link already exists and handles single classification object', async () => {
    const parsedLCIA = makeParsedLCIA();
    parsedLCIA.ecoSpold.childActivityDataset.activityDescription.classification =
      parsedLCIA.ecoSpold.childActivityDataset.activityDescription.classification[0] as any;

    prisma.ecoinvent_data.findUnique.mockResolvedValue({
      parsed: makeParsedXML(),
      xml: '<xml />',
    });
    prisma.ecoinvent_activities.findUnique.mockResolvedValue({ raw_data: parsedLCIA });
    prisma.ecoinvent_activity_classifications.findUnique.mockResolvedValue({ id: 'existing' });

    await service.importEcoSpoldFile({
      data: {
        jobId: 'job_1',
        key: 'a/b/c.xml',
        activity_name: 'Activity One',
        location: 'RoW',
        user: { id: 'u1' },
        bpc: false,
      },
    });

    expect(prisma.ecoinvent_activity_classifications.create).not.toHaveBeenCalled();
  });

  it('imports from S3 when bpc is true', async () => {
    const fileObj = {
      Body: {
        transformToString: jest.fn().mockResolvedValue('<xml/>'),
      },
    };
    const lciaObj = {
      Body: {
        transformToString: jest.fn().mockResolvedValue('<lcia/>'),
      },
    };

    s3.getObject.mockResolvedValueOnce(fileObj).mockResolvedValueOnce(lciaObj);
    mockParse.mockResolvedValueOnce(makeParsedXML()).mockResolvedValueOnce(makeParsedLCIA());

    const out = await service.importEcoSpoldFile({
      data: {
        jobId: 'job_2',
        bucket: 'bucket',
        key: 'root/sub/file.xml',
        activity_name: 'Activity One',
        location: 'RoW',
        user: { id: 'u1' },
        bpc: true,
      },
    });

    expect(out).toEqual({});
    expect(s3.getObject).toHaveBeenNthCalledWith(1, { id: 'u1' }, 'bucket', 'root/sub/file.xml');
    expect(s3.getObject).toHaveBeenNthCalledWith(2, { id: 'u1' }, 'bucket', 'root/sub/lcia_data/file.xml');
    expect(mockParse).toHaveBeenCalledTimes(2);
  });

  it('throws when cached activity data is missing for bpc=false', async () => {
    prisma.ecoinvent_data.findUnique.mockResolvedValue(null);

    await expect(
      service.importEcoSpoldFile({
        data: {
          key: 'missing.xml',
          activity_name: 'x',
          location: 'RoW',
          user: { id: 'u1' },
          bpc: false,
        },
      }),
    ).rejects.toThrow('No cached ecoinvent data found via key: missing.xml');
  });

  it('throws when cached LCIA data is missing for bpc=false', async () => {
    prisma.ecoinvent_data.findUnique.mockResolvedValue({
      parsed: makeParsedXML(),
      xml: '<xml />',
    });
    prisma.ecoinvent_activities.findUnique.mockResolvedValue(null);

    await expect(
      service.importEcoSpoldFile({
        data: {
          key: 'missing-lcia.xml',
          activity_name: 'Activity One',
          location: 'RoW',
          user: { id: 'u1' },
          bpc: false,
        },
      }),
    ).rejects.toThrow('No cached ecoinvent activity found via name: Activity One and location: RoW');
  });

  it('throws when S3 file object is missing for bpc=true', async () => {
    s3.getObject.mockResolvedValueOnce(null);

    await expect(
      service.importEcoSpoldFile({
        data: {
          jobId: 'job_missing_file',
          bucket: 'bucket',
          key: 'root/sub/file.xml',
          activity_name: 'Activity One',
          location: 'RoW',
          user: { id: 'u1' },
          bpc: true,
        },
      }),
    ).rejects.toThrow('Error reading EcoSpold file from S3: root/sub/file.xml');
  });

  it('throws when S3 xml content is missing for bpc=true', async () => {
    const fileObj = {
      Body: {
        transformToString: jest.fn().mockResolvedValue(''),
      },
    };
    const lciaObj = {
      Body: {
        transformToString: jest.fn().mockResolvedValue('<lcia/>'),
      },
    };
    s3.getObject.mockResolvedValueOnce(fileObj).mockResolvedValueOnce(lciaObj);

    await expect(
      service.importEcoSpoldFile({
        data: {
          jobId: 'job_missing_xml',
          bucket: 'bucket',
          key: 'root/sub/file.xml',
          activity_name: 'Activity One',
          location: 'RoW',
          user: { id: 'u1' },
          bpc: true,
        },
      }),
    ).rejects.toThrow('Error reading EcoSpold file from S3: root/sub/file.xml');
  });

  it('throws when S3 lcia content is missing for bpc=true', async () => {
    const fileObj = {
      Body: {
        transformToString: jest.fn().mockResolvedValue('<xml/>'),
      },
    };
    const lciaObj = {
      Body: {
        transformToString: jest.fn().mockResolvedValue(''),
      },
    };
    s3.getObject.mockResolvedValueOnce(fileObj).mockResolvedValueOnce(lciaObj);
    mockParse.mockResolvedValueOnce(makeParsedXML());

    await expect(
      service.importEcoSpoldFile({
        data: {
          jobId: 'job_missing_lcia',
          bucket: 'bucket',
          key: 'root/sub/file.xml',
          activity_name: 'Activity One',
          location: 'RoW',
          user: { id: 'u1' },
          bpc: true,
        },
      }),
    ).rejects.toThrow('Error reading LCIA file from S3: root/sub/lcia_data/file.xml');
  });

  it('uses activityDataset fallback and parses string raw_data', async () => {
    const parsedLCIA = makeParsedLCIA();
    prisma.ecoinvent_data.findUnique.mockResolvedValue({
      parsed: makeParsedXMLActivityDatasetFallback(),
      xml: '<xml />',
    });
    prisma.ecoinvent_activities.findUnique.mockResolvedValue({
      raw_data: JSON.stringify(parsedLCIA),
    });
    prisma.ecoinvent_activities.upsert.mockResolvedValue({ id: 'act_2', name: 'Activity Two' });

    const out = await service.importEcoSpoldFile({
      data: {
        jobId: 'job_fallback',
        key: 'fallback.xml',
        activity_name: 'Activity Two',
        location: 'RoW',
        user: { id: 'u1' },
        bpc: false,
      },
    });

    expect(out).toEqual({});
    expect(prisma.ecoinvent_data.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          activity_name: 'Activity Two',
        }),
      }),
    );
  });

  it('throws when creating activity-classification link fails', async () => {
    prisma.ecoinvent_data.findUnique.mockResolvedValue({
      parsed: makeParsedXML(),
      xml: '<xml />',
    });
    prisma.ecoinvent_activities.findUnique.mockResolvedValue({ raw_data: makeParsedLCIA() });
    prisma.ecoinvent_activity_classifications.findUnique.mockResolvedValue(null);
    prisma.ecoinvent_activity_classifications.create.mockRejectedValue(new Error('link failed'));

    await expect(
      service.importEcoSpoldFile({
        data: {
          jobId: 'job_link_fail',
          key: 'a/b/c.xml',
          activity_name: 'Activity One',
          location: 'RoW',
          user: { id: 'u1' },
          bpc: false,
        },
      }),
    ).rejects.toThrow('link failed');
  });

  it('throws when parsed file has no activity name', async () => {
    prisma.ecoinvent_data.findUnique.mockResolvedValue({
      parsed: {
        ecoSpold: { childActivityDataset: { activityDescription: { activity: {} } } },
      },
      xml: '<xml/>',
    });
    prisma.ecoinvent_activities.findUnique.mockResolvedValue({ raw_data: makeParsedLCIA() });

    await expect(
      service.importEcoSpoldFile({
        data: {
          key: 'bad.xml',
          activity_name: 'x',
          location: 'RoW',
          user: { id: 'u1' },
          bpc: false,
        },
      }),
    ).rejects.toThrow('No activity found in EcoSpold file');
  });
});
