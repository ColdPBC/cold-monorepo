import { Injectable } from '@nestjs/common';
import { CreateOrganizationComplianceBookmarkDto } from './dto/create-organization_compliance_bookmark.dto';
import { UpdateOrganizationComplianceBookmarkDto } from './dto/update-organization_compliance_bookmark.dto';

@Injectable()
export class OrganizationComplianceBookmarksService {
  create(createOrganizationComplianceBookmarkDto: CreateOrganizationComplianceBookmarkDto) {
    return 'This action adds a new organizationComplianceBookmark';
  }

  findAll() {
    return `This action returns all organizationComplianceBookmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceBookmark`;
  }

  update(id: number, updateOrganizationComplianceBookmarkDto: UpdateOrganizationComplianceBookmarkDto) {
    return `This action updates a #${id} organizationComplianceBookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceBookmark`;
  }
}
