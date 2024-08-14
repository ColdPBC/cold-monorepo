import { Module } from '@nestjs/common';
import { OrganizationClaimsController } from './organization_claims.controller';
import { OrganizationClaimsRepository } from '@coldpbc/nest';
import { OrganizationClaimsService } from './organization_claims_service';

@Module({
  controllers: [OrganizationClaimsController],
  providers: [OrganizationClaimsService, OrganizationClaimsRepository],
  exports: [OrganizationClaimsService, OrganizationClaimsRepository],
})
export class OrganizationClaimsModule {}
