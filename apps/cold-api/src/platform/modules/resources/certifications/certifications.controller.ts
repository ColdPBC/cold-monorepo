import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UseFilters, Req } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { allRoles, coldAdminOnly, HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Role, Roles, RolesGuard } from '@coldpbc/nest';
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

  @Roles(Role.ColdAdmin)
  @Post()
  create(@Req() req: any, @Body() createCertificationDto: certifications) {
    return this.certificationsService.create(req.organization, req.user, createCertificationDto);
  }

  @Roles(Role.ColdAdmin)
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() updateCertificationDto: certifications) {
    updateCertificationDto.id = id;
    return this.certificationsService.update(req.org, req.user, updateCertificationDto);
  }

  @Roles(...allRoles)
  @Get()
  findAll() {
    return this.certificationsService.findAll();
  }

  @Roles(...allRoles)
  @Get(':id')
  findById(@Req() req: any, @Param('id') id: string) {
    return this.certificationsService.findById(req.organization, req.user, id);
  }

  @Roles(...allRoles)
  @Get('name/:name')
  findByName(@Req() req: any, @Param('name') name: string) {
    return this.certificationsService.findByName(req.organization, req.user, name);
  }

  @Roles(...coldAdminOnly)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.certificationsService.remove(req.organization, req.user, id);
  }
}
