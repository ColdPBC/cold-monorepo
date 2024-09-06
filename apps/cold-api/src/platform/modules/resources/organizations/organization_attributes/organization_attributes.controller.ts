import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { organization_attributes } from '@prisma/client';
import { allRoles, HttpExceptionFilter, IRequest, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { OrganizationAttributesService } from './organization_attributes_service';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organization', 'Claims')
@UseFilters(new HttpExceptionFilter(OrganizationAttributesController.name))
@Controller('claims/:cId/organizations/:orgId/assertions')
export class OrganizationAttributesController {
  constructor(private readonly organizationClaimsService: OrganizationAttributesService) {}

  @Roles(...allRoles)
  @Post()
  create(@Req() req: IRequest, @Param('cId') cId: string, @Param('orgId') orgId: string, @Body() createClaimDto: organization_attributes) {
    createClaimDto.sustainability_attribute_id = cId;
    return this.organizationClaimsService.create(req.organization, req.user, createClaimDto);
  }

  @Roles(...allRoles)
  @Get()
  findAll(@Req() req: IRequest, @Param('cId') cId: string, @Param('orgId') orgId: string) {
    return this.organizationClaimsService.findAll(req.organization, req.user);
  }

  @Roles(...allRoles)
  @Get(':id')
  findById(@Req() req: IRequest, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.organizationClaimsService.findByName(req.organization, req.user, id);
  }

  @Roles(...allRoles)
  @Get('name/:name')
  findByName(@Req() req: IRequest, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('name') name: string) {
    return this.organizationClaimsService.findByName(req.organization, req.user, name);
  }

  @Roles(...allRoles)
  @Patch(':id')
  update(@Req() req: IRequest, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string, @Body() updateClaimDto: organization_attributes) {
    return this.organizationClaimsService.update(req.organization, req.user, id, updateClaimDto);
  }

  @Roles(...allRoles)
  @Delete(':id')
  remove(@Req() req: IRequest, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.organizationClaimsService.remove(req.organization, req.user, id);
  }
}
