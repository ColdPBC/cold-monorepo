import { EcoinventActivityController } from './ecoinvent_activity.controller';

describe('EcoinventActivityController', () => {
  const build = () => {
    const activityService = {
      queueActivityMatchJobs: jest.fn(),
    } as any;

    const controller = new EcoinventActivityController(activityService);
    return { controller, activityService };
  };

  it('should be defined', () => {
    const { controller } = build();
    expect(controller).toBeDefined();
  });

  it('delegates createOrganization to service', async () => {
    const { controller, activityService } = build();
    const req = { user: { id: 'u1' } } as any;

    await controller.createOrganization(req, 'org_1', true, false);

    expect(activityService.queueActivityMatchJobs).toHaveBeenCalledWith(req, 'org_1', false, true);
  });
});
