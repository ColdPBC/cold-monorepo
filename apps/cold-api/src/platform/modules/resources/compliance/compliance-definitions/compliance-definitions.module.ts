import { Module } from '@nestjs/common';
import { ComplianceDefinitionsController } from './compliance-definitions.controller';
import { ComplianceDefinitionService } from './compliance-definitions.service';
import { ComplianceRepositoryModule, DarklyModule } from '@coldpbc/nest';

@Module({
  imports: [DarklyModule.forRoot(), ComplianceRepositoryModule],
  controllers: [ComplianceDefinitionsController],
  providers: [ComplianceDefinitionService],
  exports: [ComplianceDefinitionService],
})
export class ComplianceDefinitionModule {}
