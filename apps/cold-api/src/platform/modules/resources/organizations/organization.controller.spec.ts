import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from '../auth0/members/member.service';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { Auth0TokenService, CacheService, DarklyService, JwtStrategy, PrismaService } from '@coldpbc/nest';
import { RoleService } from '../auth0/roles/role.service';
import { JwtService } from '@nestjs/jwt';
import { mockDeep } from 'jest-mock-extended';
import { fullReqExample } from '../_global/global.examples';
import { CreateOrganizationDto } from './dto/organization.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Organization Controller', () => {
  let controller: OrganizationController;
  let service: OrganizationService;
  const mock: CreateOrganizationDto = {
    branding: {},
    created_at: new Date(),
    display_name: '',
    email: 'undefined',
    name: '',
    phone: 'undefined',
    updated_at: new Date(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [OrganizationController],
      providers: [ConfigService, OrganizationService, Auth0TokenService, CacheService, RoleService, MemberService],
      exports: [OrganizationService, Auth0TokenService],
    })
      .overrideProvider(OrganizationService)
      .useValue(mockDeep<OrganizationService>())
      .overrideProvider(Auth0TokenService)
      .useValue(mockDeep<Auth0TokenService>())
      .overrideProvider(RoleService)
      .useValue(mockDeep<RoleService>())
      .overrideProvider(MemberService)
      .useValue(mockDeep<MemberService>())
      .overrideProvider(JwtService)
      .useValue(mockDeep<JwtService>())
      .overrideProvider(JwtStrategy)
      .useValue(mockDeep<JwtStrategy>())
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .overrideProvider(CacheService)
      .useValue(mockDeep<CacheService>())
      .overrideProvider(DarklyService)
      .useValue({
        getJSONFlag: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<OrganizationController>(OrganizationController);
    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  it('AddUserToOrganization called', async () => {
    await controller.addMemberToOrganizationAndRole('123', 'role', 'userid', fullReqExample);
    expect(service.addUserToOrganization).toHaveBeenCalled();
  });*/

  it('CreateOrganization called', async () => {
    await controller.createOrganization('123', mock, fullReqExample);
    expect(service.createColdOrg).toHaveBeenCalled();
  });

  it('GetOrganizations called', async () => {
    await controller.getOrganizations(fullReqExample, true, { name: 'name', id: '' });
    expect(service.getOrganizations).toHaveBeenCalled();
  });

  it('GetOrganization called', async () => {
    await controller.getOrganization('123', fullReqExample);
    expect(service.getOrganization).toHaveBeenCalled();
  });

  /*
  it('GetOrgUsersRoles called', async () => {
    await controller.getOrgUsersRoles(fullReqExample, '123', 'userId');
    expect(service.getOrgUserRoles).toHaveBeenCalled();
  });

  it('UpdateOrgUserRoles called', async () => {
    await controller.updateOrgUserRoles(fullReqExample, '123', 'role', 'userid');
    expect(service.updateOrgUserRoles).toHaveBeenCalled();
  });

  it('InviteUser called', async () => {
    await controller.inviteUser(
      fullReqExample,
      {
        user_email: 'user',
        inviter_name: 'inviter',
        roleId: 'rol_1234',
      },
      'orgId',
    );
    expect(service.inviteUser).toHaveBeenCalled();
  });

  it('DeleteInvitation called', async () => {
    await controller.removeInvitation('orgId', 'invId', fullReqExample);
    expect(service.deleteInvitation).toHaveBeenCalled();
  });

  it('RemoveUserFromOrganization called', async () => {
    await controller.removeMembers('orgId', { members: ['memberid'] }, fullReqExample);
    expect(service.removeUserFromOrganization).toHaveBeenCalled();
  });
*/
  it('DeleteInvitation called', async () => {
    await controller.removeOrg('orgId', fullReqExample);
    expect(service.deleteOrganization).toHaveBeenCalled();
  });
});
