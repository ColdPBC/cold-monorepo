import { Policy_definitionsController } from './policy_definitions.controller';
import { Policy_definitionsService } from './policy_definitions.service';
import { fullReqExample } from '../_global/global.examples';

describe('PolicyDefinitionsController', () => {
  let controller: Policy_definitionsController;
  let service: jest.Mocked<
    Pick<
      Policy_definitionsService,
      'findAllPolicies' | 'findPolicyByName' | 'findSignedDataByEmail' | 'createSignedData'
    >
  >;

  beforeEach(() => {
    service = {
      findAllPolicies: jest.fn(),
      findPolicyByName: jest.fn(),
      findSignedDataByEmail: jest.fn(),
      createSignedData: jest.fn(),
    };

    controller = new Policy_definitionsController(service as unknown as Policy_definitionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates findAll to service', async () => {
    await controller.findAll();
    expect(service.findAllPolicies).toHaveBeenCalledTimes(1);
  });

  it('delegates findByName to service with default options', async () => {
    await controller.findByName('test');
    expect(service.findPolicyByName).toHaveBeenCalledWith('test', {
      bypassCache: false,
      contentOnly: false,
    });
  });

  it('delegates findContentByName to service with contentOnly', async () => {
    await controller.findContentByName('test');
    expect(service.findPolicyByName).toHaveBeenCalledWith('test', {
      bypassCache: false,
      contentOnly: true,
    });
  });

  it('delegates findSigned to service', async () => {
    await controller.findSigned(fullReqExample as any);
    expect(service.findSignedDataByEmail).toHaveBeenCalledWith(fullReqExample);
  });

  it('delegates signPolicy to service', async () => {
    await controller.signPolicy(1, fullReqExample as any);
    expect(service.createSignedData).toHaveBeenCalledWith(1, fullReqExample);
  });
});
