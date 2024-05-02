import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganizationComplianceBookmarksService } from './organization_compliance_bookmarks.service';
import { CreateOrganizationComplianceBookmarkDto } from './dto/create-organization_compliance_bookmark.dto';
import { UpdateOrganizationComplianceBookmarkDto } from './dto/update-organization_compliance_bookmark.dto';

@Controller('organization-compliance-bookmarks')
export class OrganizationComplianceBookmarksController {
  constructor(private readonly organizationComplianceBookmarksService: OrganizationComplianceBookmarksService) {}

  @Post()
  create(@Body() createOrganizationComplianceBookmarkDto: CreateOrganizationComplianceBookmarkDto) {
    return this.organizationComplianceBookmarksService.create(createOrganizationComplianceBookmarkDto);
  }

  @Get()
  findAll() {
    return this.organizationComplianceBookmarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationComplianceBookmarksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationComplianceBookmarkDto: UpdateOrganizationComplianceBookmarkDto) {
    return this.organizationComplianceBookmarksService.update(+id, updateOrganizationComplianceBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationComplianceBookmarksService.remove(+id);
  }
}
