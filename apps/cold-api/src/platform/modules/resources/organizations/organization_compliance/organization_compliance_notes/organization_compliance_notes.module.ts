import { Module } from '@nestjs/common';
import { OrganizationComplianceNotesService } from './organization_compliance_notes.service';
import { OrganizationComplianceNotesController } from './organization_compliance_notes.controller';
import { OrganizationComplianceNoteFilesModule } from './organization_compliance_note_files/organization_compliance_note_files.module';
import { OrganizationComplianceNoteLinksModule } from './organization_compliance_note_links/organization_compliance_note_links.module';

@Module({
  imports: [OrganizationComplianceNoteFilesModule, OrganizationComplianceNoteLinksModule],
  controllers: [OrganizationComplianceNotesController],
  providers: [OrganizationComplianceNotesService],
})
export class OrganizationComplianceNotesModule {}
