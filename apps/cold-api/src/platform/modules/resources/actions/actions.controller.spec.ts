import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { fullReqExample } from '../_global/global.examples';

describe('ActionsController', () => {
  let controller: ActionsController;
  let service: jest.Mocked<
    Pick<ActionsService, 'getActions' | 'getAction' | 'createActionFromTemplate' | 'updateAction'>
  >;

  beforeEach(() => {
    service = {
      getActions: jest.fn(),
      getAction: jest.fn(),
      createActionFromTemplate: jest.fn(),
      updateAction: jest.fn(),
    };

    controller = new ActionsController(service as unknown as ActionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates getActions', async () => {
    await controller.getActions('org-1', fullReqExample as any, true);
    expect(service.getActions).toHaveBeenCalledWith(fullReqExample, 'org-1', true);
  });

  it('delegates getAction', async () => {
    await controller.getAction('org-1', 'action-1', fullReqExample as any, false);
    expect(service.getAction).toHaveBeenCalledWith(fullReqExample, 'org-1', 'action-1', false);
  });

  it('delegates createAction', async () => {
    const payload = { template: {} } as any;
    await controller.createAction('org-1', 'template-1', fullReqExample as any, payload);
    expect(service.createActionFromTemplate).toHaveBeenCalledWith(fullReqExample, 'org-1', 'template-1', payload);
  });

  it('delegates updateAction', async () => {
    const payload = { action: {} } as any;
    await controller.updateAction('org-1', 'action-1', fullReqExample as any, payload);
    expect(service.updateAction).toHaveBeenCalledWith(fullReqExample, 'org-1', 'action-1', payload);
  });
});
