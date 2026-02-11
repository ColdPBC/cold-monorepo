import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ComplianceDefinitionService } from './compliance-definitions.service';

describe('ComplianceDefinitionService', () => {
  const buildService = () => {
    const darkly = {
      subscribeToJsonFlagChanges: jest.fn(),
    } as any;

    const prisma = {
      compliance_definitions: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      organization_compliance: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
      },
      organization_compliances_old: {
        upsert: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
      },
      compliance_section_groups: { upsert: jest.fn() },
      compliance_sections: { upsert: jest.fn() },
      compliance_questions: { upsert: jest.fn() },
      survey_definitions: { findUnique: jest.fn() },
      service_definitions: { findUnique: jest.fn() },
      organizations: { findUnique: jest.fn() },
    } as any;

    const cache = {
      set: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    } as any;

    const mqtt = {
      publishMQTT: jest.fn(),
    } as any;

    const event = {
      sendIntegrationEvent: jest.fn(),
    } as any;

    const definitions = {
      getComplianceDefinitions: jest.fn(),
      getComplianceDefinitionsByOrgId: jest.fn(),
    } as any;

    const service = new ComplianceDefinitionService(darkly, prisma, cache, mqtt, event, definitions);
    (service as any).metrics = { increment: jest.fn(), event: jest.fn() };
    (service as any).tracer = { getTracer: () => ({ dogstatsd: { increment: jest.fn() } }) };
    (service as any).openAI_definition = { id: 'svc_openai' };

    return { service, darkly, prisma, definitions, cache, mqtt, event };
  };

  const req = {
    user: {
      coldclimate_claims: { org_id: 'org_1', email: 'user@example.com' },
    },
    organization: { id: 'org_1', name: 'Org One' },
    headers: { authorization: 'Bearer token-123' },
    body: {},
    url: '/compliance',
    method: 'POST',
  } as any;

  it('should be defined', () => {
    const { service } = buildService();
    expect(service).toBeDefined();
  });

  it('subscribes to darkly flag changes on module init', async () => {
    const { service, darkly } = buildService();
    await service.onModuleInit();
    expect(darkly.subscribeToJsonFlagChanges).toHaveBeenCalledWith('dynamic-org-white-list', expect.any(Function));
  });

  it('activate throws when compliance definition is missing', async () => {
    const { service, prisma } = buildService();
    prisma.compliance_definitions.findUnique.mockResolvedValue(null);

    await expect(service.activate('org_1', req, 'missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('activate throws when org compliance is missing', async () => {
    const { service, prisma } = buildService();
    prisma.compliance_definitions.findUnique.mockResolvedValue({ id: 'comp_1', name: 'comp_a' });
    prisma.organization_compliance.findUnique.mockResolvedValue(null);

    await expect(service.activate('org_1', req, 'comp_a')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('activate sends integration events and mqtt updates on success', async () => {
    const { service, prisma, event, mqtt } = buildService();
    prisma.compliance_definitions.findUnique.mockResolvedValue({ id: 'comp_1', name: 'comp_a' });
    prisma.organization_compliance.findUnique.mockResolvedValue({
      id: 'oc_1',
      compliance_definition_name: 'comp_a',
      organization: { id: 'org_1', name: 'Org One' },
      compliance_definition: { id: 'comp_1', name: 'comp_a' },
    });
    event.sendIntegrationEvent.mockResolvedValue({});

    await expect(service.activate('org_1', req, 'comp_a')).resolves.toBeUndefined();
    expect(event.sendIntegrationEvent).toHaveBeenCalledTimes(2);
    expect(mqtt.publishMQTT).toHaveBeenCalledTimes(2);
  });

  it('injectSurvey throws when compliance definition does not exist', async () => {
    const { service, prisma } = buildService();
    prisma.compliance_definitions.findUnique.mockResolvedValue(null);

    await expect(service.injectSurvey(req, 'missing-comp', { sections: {} })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('injectSurvey passes merged survey data to importSurveyStructure', async () => {
    const { service, prisma } = buildService();
    prisma.compliance_definitions.findUnique.mockResolvedValue({ id: 'comp_1', name: 'comp_a' });
    const spy = jest.spyOn(service, 'importSurveyStructure').mockResolvedValue({ id: 'comp_1' } as any);

    await service.injectSurvey(req, 'comp_a', { sections: { a: {} } });
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ name: 'comp_a', survey_definition: { sections: { a: {} } } }));
  });

  it('create throws when compliance definition already exists', async () => {
    const { service, prisma } = buildService();
    prisma.compliance_definitions.findUnique.mockResolvedValue({ id: 'existing' });

    await expect(service.create(req, { name: 'comp_a' } as any)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('create creates compliance definition and publishes success', async () => {
    const { service, prisma, mqtt } = buildService();
    prisma.compliance_definitions.findUnique.mockResolvedValue(null);
    prisma.compliance_definitions.create.mockResolvedValue({ id: 'comp_1', name: 'comp_a' });

    await expect(service.create(req, { name: 'comp_a' } as any)).resolves.toEqual({ id: 'comp_1', name: 'comp_a' });
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'create', status: 'complete' }));
  });

  it('importSurveyStructure throws when no survey definition can be resolved', async () => {
    const { service, prisma } = buildService();
    prisma.survey_definitions.findUnique.mockResolvedValue(null);

    await expect(service.importSurveyStructure({ id: 'comp_1', name: 'comp_a', surveys: ['missing'] })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('importSurveyStructure creates section groups/sections/questions and returns definition', async () => {
    const { service, prisma } = buildService();
    prisma.compliance_section_groups.upsert.mockResolvedValue({ id: 'sg_1' });
    prisma.compliance_sections.upsert.mockResolvedValue({ id: 's_1' });
    prisma.compliance_questions.upsert.mockResolvedValue({ id: 'q_1' });
    prisma.compliance_definitions.findUnique.mockResolvedValue({ id: 'comp_1', name: 'comp_a' });

    const survey = {
      sections: {
        sec1: {
          section_type: 'General',
          title: 'Section 1',
          category_idx: 1,
          follow_up: {
            q1: {
              idx: 1,
              prompt: 'Question 1',
              component: 'text',
              options: [],
            },
          },
        },
      },
    };

    await expect(service.importSurveyStructure({ id: 'comp_1', name: 'comp_a', survey_definition: survey })).resolves.toEqual({
      id: 'comp_1',
      name: 'comp_a',
    });
  });

  it('createOrgCompliance upserts compliance records and returns compliance', async () => {
    const { service, prisma, cache, mqtt } = buildService();
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: 'comp_1', name: 'comp_a', title: 'Comp A' } as any);
    prisma.organization_compliance.upsert.mockResolvedValue({ id: 'oc_1', compliance_definition_name: 'comp_a' });
    prisma.organization_compliances_old.upsert.mockResolvedValue({ id: 'old_1' });
    req.body = { surveys_override: ['survey_a'] };

    await expect(service.createOrgCompliance(req, 'comp_a', 'org_1')).resolves.toEqual({ id: 'oc_1', compliance_definition_name: 'comp_a' });
    expect(cache.set).toHaveBeenCalledWith('organizations:org_1:compliance:comp_a:legacy_org_compliance', expect.any(Object), { update: true });
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('ui', expect.objectContaining({ action: 'create', status: 'complete' }));
  });

  it('getAll throws when no definitions are found', async () => {
    const { service, definitions } = buildService();
    definitions.getComplianceDefinitions.mockResolvedValue([]);

    await expect(service.getAll()).rejects.toBeInstanceOf(NotFoundException);
  });

  it('getAllByOrg throws when no org definitions are found', async () => {
    const { service, definitions } = buildService();
    definitions.getComplianceDefinitionsByOrgId.mockResolvedValue([]);

    await expect(service.getAllByOrg(req, true)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findOne caches and returns compliance definition by name', async () => {
    const { service, prisma, cache } = buildService();
    prisma.compliance_definitions.findUnique.mockResolvedValue({ id: 'comp_1', name: 'comp_a' });

    await expect(service.findOne('comp_a', req, true)).resolves.toEqual({ id: 'comp_1', name: 'comp_a' });
    expect(cache.set).toHaveBeenCalledWith('compliance:comp_a', { id: 'comp_1', name: 'comp_a' }, { update: true });
  });

  it('update updates definition and publishes success', async () => {
    const { service, prisma, mqtt } = buildService();
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: 'comp_1', name: 'comp_a' } as any);
    prisma.compliance_definitions.update.mockResolvedValue({ id: 'comp_1', name: 'comp_a', title: 'Comp A', version: 2 });

    await expect(service.update('comp_a', { title: 'Comp A', version: 2 } as any, req)).resolves.toEqual({
      id: 'comp_1',
      name: 'comp_a',
      title: 'Comp A',
      version: 2,
    });
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'update', status: 'complete' }));
  });

  it('remove deletes definition and publishes success', async () => {
    const { service, prisma, mqtt } = buildService();
    prisma.compliance_definitions.delete.mockResolvedValue({});

    await expect(service.remove('comp_a', req)).resolves.toBeUndefined();
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'delete', status: 'complete' }));
  });

  it('deactivate removes org compliance records and publishes success', async () => {
    const { service, prisma, mqtt } = buildService();
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: 'comp_1', name: 'comp_a' } as any);
    prisma.organization_compliances_old.findFirst.mockResolvedValue({ id: 'old_1' });
    prisma.organization_compliance.findUnique.mockResolvedValue({ id: 'new_1' });
    prisma.organization_compliances_old.delete.mockResolvedValue({});
    prisma.organization_compliance.delete.mockResolvedValue({});

    await expect(service.deactivate('comp_a', 'org_1', req)).resolves.toBeUndefined();
    expect(mqtt.publishMQTT).toHaveBeenCalledWith('public', expect.objectContaining({ action: 'delete', status: 'complete' }));
  });
});
