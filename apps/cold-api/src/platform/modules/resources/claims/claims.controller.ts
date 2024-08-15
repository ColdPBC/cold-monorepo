import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UseFilters, Req } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { claims } from '@prisma/client';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Claims')
@UseFilters(new HttpExceptionFilter(ClaimsController.name))
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claim: ClaimsService) {}

  @Post()
  @Roles(Role.ColdAdmin)
  create(@Req() req: any, @Body() createClaimDto: claims) {
    return this.claim.create(req.organization, req.user, createClaimDto);
  }

  @Patch(':id')
  @Roles(Role.ColdAdmin)
  update(@Req() req: any, @Param('id') id: string, @Body() updateClaimDto: claims) {
    updateClaimDto.id = id;
    return this.claim.update(req.org, req.user, updateClaimDto);
  }

  @Get()
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findAll() {
    return this.claim.findAll();
  }

  @Get(':id')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findById(@Req() req: any, @Param('id') id: string) {
    return this.claim.findById(req.organization, req.user, id);
  }

  @Get('name/:name')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findByName(@Req() req: any, @Param('name') name: string) {
    return this.claim.findByName(req.organization, req.user, name);
  }

  @Delete(':id')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  remove(@Req() req: any, @Param('id') id: string) {
    return this.claim.remove(req.organization, req.user, id);
  }
}
