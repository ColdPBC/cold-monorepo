import { Module } from '@nestjs/common';
import { OrganizationComplianceNoteLinksService } from './organization_compliance_note_links.service';
import { OrganizationComplianceNoteLinksController } from './organization_compliance_note_links.controller';

@Module({
  controllers: [OrganizationComplianceNoteLinksController],
  providers: [OrganizationComplianceNoteLinksService],
  exports: [OrganizationComplianceNoteLinksService],
})
export class OrganizationComplianceNoteLinksModule {}
