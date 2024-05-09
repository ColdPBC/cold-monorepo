import { Module } from '@nestjs/common';
import { OrganizationComplianceNoteFilesService } from './organization_compliance_note_files.service';
import { OrganizationComplianceNoteFilesController } from './organization_compliance_note_files.controller';

@Module({
  controllers: [OrganizationComplianceNoteFilesController],
  providers: [OrganizationComplianceNoteFilesService],
})
export class OrganizationComplianceNoteFilesModule {}
