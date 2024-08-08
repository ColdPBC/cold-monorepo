import { Module } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { ClaimsRepository, OrganizationClaimsRepository } from '@coldpbc/nest';
import { OrganizationClaimsModule } from '../organizations/organization_claims/organization_claims_module';

@Module({
  imports: [OrganizationClaimsModule],
  controllers: [ClaimsController],
  providers: [ClaimsService, OrganizationClaimsRepository, ClaimsRepository],
  exports: [],
})
export class ClaimsModule {}
