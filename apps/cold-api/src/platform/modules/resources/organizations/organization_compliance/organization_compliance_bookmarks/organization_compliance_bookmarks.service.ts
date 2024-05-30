import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationComplianceBookmarksService {
  create(createOrganizationComplianceBookmarkDto: any) {
    return 'This action adds a new organizationComplianceBookmark';
  }

  findAll() {
    return `This action returns all organizationComplianceBookmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationComplianceBookmark`;
  }

  update(id: number, updateOrganizationComplianceBookmarkDto: any) {
    return `This action updates a #${id} organizationComplianceBookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationComplianceBookmark`;
  }
}
