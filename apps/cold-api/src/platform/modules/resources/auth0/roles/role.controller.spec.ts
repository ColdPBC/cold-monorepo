import { RoleController } from './role.controller';

describe('RoleController', () => {
  const build = () => {
    const roleService = {
      initialize: jest.fn().mockResolvedValue(undefined),
      getRole: jest.fn(),
      getRoles: jest.fn(),
    } as any;

    const controller = new RoleController(roleService);
    return { controller, roleService };
  };

  it('should be defined', () => {
    const { controller } = build();
    expect(controller).toBeDefined();
  });

  it('initializes role cache on construct', () => {
    const { roleService } = build();
    expect(roleService.initialize).toHaveBeenCalled();
  });

  it('delegates getRoles by nameOrId', async () => {
    const { controller, roleService } = build();

    await controller.getRoles('company:owner');

    expect(roleService.getRole).toHaveBeenCalledWith('company:owner');
  });

  it('delegates getAllRoles', async () => {
    const { controller, roleService } = build();

    await controller.getAllRoles();

    expect(roleService.getRoles).toHaveBeenCalled();
  });
});
