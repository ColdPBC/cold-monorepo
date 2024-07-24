import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UseFilters, Req } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { certifications } from '@prisma/client';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Certifications')
@UseFilters(new HttpExceptionFilter(CertificationsController.name))
@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post()
  @Roles(Role.ColdAdmin)
  create(@Req() req: any, @Body() createCertificationDto: certifications) {
    return this.certificationsService.create(req.organization, req.user, createCertificationDto);
  }

  @Patch(':id')
  @Roles(Role.ColdAdmin)
  update(@Req() req: any, @Param('id') id: string, @Body() updateCertificationDto: certifications) {
    updateCertificationDto.id = id;
    return this.certificationsService.update(req.org, req.user, updateCertificationDto);
  }

  @Get()
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findAll() {
    return this.certificationsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findById(@Req() req: any, @Param('id') id: string) {
    return this.certificationsService.findById(req.organization, req.user, id);
  }

  @Get('name/:name')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findByName(@Req() req: any, @Param('name') name: string) {
    return this.certificationsService.findByName(req.organization, req.user, name);
  }

  @Delete(':id')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  remove(@Req() req: any, @Param('id') id: string) {
    return this.certificationsService.remove(req.organization, req.user, id);
  }
}
