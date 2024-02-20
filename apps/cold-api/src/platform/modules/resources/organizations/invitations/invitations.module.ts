import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { HttpModule } from '@nestjs/axios';
import { RoleModule } from '../../auth0/roles/role.module';
import { OrganizationHelper } from '../helpers/organization.helper';

@Module({
  imports: [RoleModule, HttpModule],
  providers: [InvitationsService, HttpModule, OrganizationHelper],
  controllers: [InvitationsController],
  exports: [InvitationsService],
})
export class InvitationsModule {}
