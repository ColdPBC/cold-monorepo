import { MemberController } from './member.controller';

describe('MemberController', () => {
  const build = () => {
    const jwtStrategy = {} as any;
    const membersService = {
      getMemberByEmail: jest.fn(),
      updateUser: jest.fn(),
      createMember: jest.fn(),
    } as any;

    const controller = new MemberController(jwtStrategy, membersService);
    return { controller, membersService };
  };

  it('should be defined', () => {
    const { controller } = build();
    expect(controller).toBeDefined();
  });

  it('delegates getByEmails', async () => {
    const { controller, membersService } = build();
    const req = { body: {} } as any;

    await controller.getByEmails(req, 'user@example.com', true);

    expect(membersService.getMemberByEmail).toHaveBeenCalledWith('user@example.com', req, true);
  });

  it('delegates updateUser', async () => {
    const { controller, membersService } = build();
    const req = { body: { name: 'User' } } as any;

    await controller.updateUser(req, 'user@example.com');

    expect(membersService.updateUser).toHaveBeenCalledWith(req, 'user@example.com', req.body);
  });

  it('delegates createUser', async () => {
    const { controller, membersService } = build();
    const req = { body: { email: 'user@example.com' } } as any;

    await controller.createUser(req);

    expect(membersService.createMember).toHaveBeenCalledWith(req, req.body);
  });
});
