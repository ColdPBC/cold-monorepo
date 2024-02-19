import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { S3Service } from '@coldpbc/nest';
import { HttpModule } from '@nestjs/axios';
import { RoleModule } from '../../auth0/roles/role.module';

@Module({
  imports: [RoleModule, HttpModule],
  providers: [InvitationsService, HttpModule, S3Service],
  controllers: [InvitationsController],
  exports: [InvitationsService],
})
export class InvitationsModule {}
