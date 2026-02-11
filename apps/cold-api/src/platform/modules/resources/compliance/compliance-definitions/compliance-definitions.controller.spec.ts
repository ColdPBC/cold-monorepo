import { ComplianceDefinitionsController } from './compliance-definitions.controller';
import { ComplianceDefinitionService } from './compliance-definitions.service';
import { fullReqExample } from '../../_global/global.examples';

describe('ComplianceDefinitionsController', () => {
  let controller: ComplianceDefinitionsController;
  let service: jest.Mocked<
    Pick<
      ComplianceDefinitionService,
      | 'create'
      | 'injectSurvey'
      | 'getAll'
      | 'getAllByOrg'
      | 'findOne'
      | 'update'
      | 'remove'
      | 'createOrgCompliance'
      | 'activate'
      | 'deactivate'
      | 'findOrgCompliances'
    >
  >;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      injectSurvey: jest.fn(),
      getAll: jest.fn(),
      getAllByOrg: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      createOrgCompliance: jest.fn(),
      activate: jest.fn(),
      deactivate: jest.fn(),
      findOrgCompliances: jest.fn(),
    };

    controller = new ComplianceDefinitionsController(service as unknown as ComplianceDefinitionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates createDefinition', async () => {
    const payload = { name: 'comp-1' } as any;
    await controller.createDefinition(fullReqExample as any, payload);
    expect(service.create).toHaveBeenCalledWith(fullReqExample, payload);
  });

  it('delegates injectComplianceSurvey', async () => {
    const payload = { sections: {} } as any;
    await controller.injectComplianceSurvey('comp-1', fullReqExample as any, payload);
    expect(service.injectSurvey).toHaveBeenCalledWith(fullReqExample, 'comp-1', payload);
  });

  it('delegates getAll', async () => {
    await controller.getAll();
    expect(service.getAll).toHaveBeenCalledTimes(1);
  });

  it('delegates getComplianceByName', async () => {
    await controller.getComplianceByName(fullReqExample as any, 'comp-1', true);
    expect(service.findOne).toHaveBeenCalledWith('comp-1', fullReqExample, true);
  });

  it('delegates updateComplianceByName', async () => {
    const payload = { title: 'updated' } as any;
    await controller.updateComplianceByName('comp-1', payload, fullReqExample as any);
    expect(service.update).toHaveBeenCalledWith('comp-1', payload, fullReqExample);
  });

  it('delegates deleteComplianceByName', async () => {
    await controller.deleteComplianceByName('comp-1', fullReqExample as any);
    expect(service.remove).toHaveBeenCalledWith('comp-1', fullReqExample);
  });

  it('delegates activateComplianceForOrgByName', async () => {
    await controller.activateComplianceForOrgByName('comp-1', 'org-1', fullReqExample as any);
    expect(service.activate).toHaveBeenCalledWith('org-1', fullReqExample, 'comp-1');
  });
});
