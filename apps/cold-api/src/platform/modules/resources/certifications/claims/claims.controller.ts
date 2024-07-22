import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { certification_claims } from '@prisma/client';
import { allRoles, HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { CertificationsController } from '../certifications.controller';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Certifications', 'Claims')
@UseFilters(new HttpExceptionFilter(CertificationsController.name))
@Controller('certifications/:cId/organization/:orgId/claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Roles(...allRoles)
  @Post()
  create(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Body() createClaimDto: certification_claims) {
    return this.claimsService.create(req.organization, req.user, createClaimDto);
  }

  @Roles(...allRoles)
  @Get()
  findAll(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string) {
    return this.claimsService.findAll(req.organization, req.user);
  }

  @Roles(...allRoles)
  @Get(':id')
  findById(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.claimsService.findByName(req.organization, req.user, id);
  }

  @Roles(...allRoles)
  @Get('name/:name')
  findByName(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('name') name: string) {
    return this.claimsService.findByName(req.organization, req.user, name);
  }

  @Roles(...allRoles)
  @Patch(':id')
  update(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string, @Body() updateClaimDto: certification_claims) {
    return this.claimsService.update(req.organization, req.user, id, updateClaimDto);
  }

  @Roles(...allRoles)
  @Delete(':id')
  remove(@Req() req: any, @Param('cId') cId: string, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.claimsService.remove(req.organization, req.user, id);
  }
}
