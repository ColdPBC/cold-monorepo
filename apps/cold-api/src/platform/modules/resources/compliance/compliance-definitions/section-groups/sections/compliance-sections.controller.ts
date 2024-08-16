import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ComplianceSectionsService } from './compliance-sections.service';
import { GeneratorService, HttpExceptionFilter, IRequest, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { coldAdminOnly } from '../../../../_global/global.params';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { compliance_sections } from '@prisma/client';

const generatorService = new GeneratorService();

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...coldAdminOnly)
@ApiTags('Compliance Sections')
@UseFilters(new HttpExceptionFilter(ComplianceSectionsController.name))
@Controller('compliance/:name/section_groups/:sgId/sections')
export class ComplianceSectionsController {
  constructor(readonly complianceSectionsService: ComplianceSectionsService) {}

  @Post()
  @ApiBody({
    type: 'object',
    schema: {
      example: generatorService.genComplianceSection(),
    },
  })
  create(@Param('name') name: string, @Param('sgId') groupId: string, @Body() sectionData: compliance_sections, @Req() user: any) {
    if (sectionData.compliance_section_group_id !== groupId) {
      sectionData.compliance_section_group_id = groupId;
    }

    if (sectionData.compliance_definition_name !== name) {
      sectionData.compliance_definition_name = name;
    }

    return this.complianceSectionsService.create(sectionData, user);
  }

  @Get()
  findAll(@Param('name') name: string, @Param('sgId') groupId: string, @Req() req: IRequest, @Query('filter') filter: boolean, @Query('questions') questions: boolean) {
    return this.complianceSectionsService.findSectionsByComplianceAndGroup(name, req.user, groupId, filter, questions);
  }

  @Get(':sId')
  findOne(
    @Param('name') name: string,
    @Param('sId') id: string,
    @Param('sgId') groupId: string,
    @Req() req: IRequest,
    @Query('filter') filter: boolean,
    @Query('questions') questions: boolean,
  ) {
    return this.complianceSectionsService.findOne(name, groupId, id, req.user, filter, questions);
  }

  @Get('key/:key')
  findOneByKey(
    @Param('name') name: string,
    @Param('key') key: string,
    @Param('sgId') groupId: string,
    @Req() req: IRequest,
    @Query('filter') filter: boolean,
    @Query('questions') questions: boolean,
  ) {
    return this.complianceSectionsService.findOneByKey(name, groupId, key, req.user, filter, questions);
  }

  @Patch(':sId')
  @ApiBody({
    type: 'object',
    schema: {
      example: generatorService.genComplianceSection(),
    },
  })
  update(@Param('name') name: string, @Param('sgId') groupId: string, @Param('sId') id: string, @Body() sectionData: compliance_sections, @Req() user: any) {
    if (sectionData.compliance_section_group_id !== groupId) {
      //throw new BadRequestException('sgId does not match compliance_section_group_id in body');
    }
    if (sectionData.compliance_definition_name !== name) {
      //throw new BadRequestException('name does not match compliance_definition_name in body');
    }
    if (sectionData.id !== id) {
      //throw new BadRequestException('sId does not match section id in body');
    }

    return this.complianceSectionsService.update(name, groupId, id, sectionData, user);
  }

  @Delete(':sId')
  remove(@Param('name') name: string, @Param('sgId') groupId: string, @Param('sId') id: string, @Req() req: IRequest) {
    return this.complianceSectionsService.remove(id, name, groupId, req.user);
  }
}
