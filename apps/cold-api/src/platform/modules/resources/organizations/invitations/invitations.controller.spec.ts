import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';

describe('InvitationsController', () => {
  let controller: InvitationsController;

  const inviteService = {
    inviteUser: jest.fn(),
    deleteInvitation: jest.fn(),
  };

  const req = { user: { id: 'u1' } } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new InvitationsController(inviteService as unknown as InvitationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('inviteUser delegates to service', () => {
    inviteService.inviteUser.mockReturnValue('ok');
    const dto = { user_email: 'u@example.com', inviter_name: 'Owner', roleId: 'r1' };

    expect(controller.inviteUser(req, dto, 'org1', true, false)).toBe('ok');
    expect(inviteService.inviteUser).toHaveBeenCalledWith('org1', dto.user_email, dto.inviter_name, dto.roleId, false, req, true);
  });

  it('removeInvitation delegates to service', () => {
    inviteService.deleteInvitation.mockReturnValue('ok');

    expect(controller.removeInvitation('org1', 'inv1', req)).toBe('ok');
    expect(inviteService.deleteInvitation).toHaveBeenCalledWith('org1', 'inv1', req);
  });
});
