import { Module } from '@nestjs/common';
import { MemberModule } from '../auth0/members/member.module';
import { MemberService } from '../auth0/members/member.service';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { HttpModule } from '@nestjs/axios';
import { CacheService, ColdCacheModule, ColdRabbitModule, ColdRabbitService } from '@coldpbc/nest';
import { RoleModule } from '../auth0/roles/role.module';
import { RoleService } from '../auth0/roles/role.service';
import { IntegrationsService } from '../integrations/integrations.service';
import { OrganizationLocationsService } from '../organization_locations/organization_locations.service';

@Module({
  imports: [ColdRabbitModule.forFeature(), HttpModule, ColdCacheModule, RoleModule, MemberModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, CacheService, RoleService, MemberService, ColdRabbitService, IntegrationsService, OrganizationLocationsService],
  exports: [ColdRabbitService, OrganizationService],
})
export class OrganizationModule {}
