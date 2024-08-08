import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { organization_claims } from '@prisma/client';
import { allRoles, HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { OrganizationClaimsService } from './organization_claims_service';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organization', 'Claims')
@UseFilters(new HttpExceptionFilter(OrganizationClaimsController.name))
@Controller('claims/:cId/a/:orgId/claims')
export class OrganizationClaimsController {
  constructor(private readonly organizationClaimsService: OrganizationClaimsService) {}

  @Roles(...allRoles)
  @Post()
  create(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Body() createClaimDto: organization_claims) {
    createClaimDto.claim_id = cId;
    return this.organizationClaimsService.create(req.organization, req.user, createClaimDto);
  }

  @Roles(...allRoles)
  @Get()
  findAll(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string) {
    return this.organizationClaimsService.findAll(req.organization, req.user);
  }

  @Roles(...allRoles)
  @Get(':id')
  findById(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.organizationClaimsService.findByName(req.organization, req.user, id);
  }

  @Roles(...allRoles)
  @Get('name/:name')
  findByName(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('name') name: string) {
    return this.organizationClaimsService.findByName(req.organization, req.user, name);
  }

  @Roles(...allRoles)
  @Patch(':id')
  update(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string, @Body() updateClaimDto: organization_claims) {
    return this.organizationClaimsService.update(req.organization, req.user, id, updateClaimDto);
  }

  @Roles(...allRoles)
  @Delete(':id')
  remove(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.organizationClaimsService.remove(req.organization, req.user, id);
  }
}
