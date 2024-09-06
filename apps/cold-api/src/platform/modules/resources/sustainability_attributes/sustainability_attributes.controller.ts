import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UseFilters, Req } from '@nestjs/common';
import { SustainabilityAttributesService } from './sustainability_attributes.service';
import { HttpExceptionFilter, IRequest, JwtAuthGuard, OrgUserInterceptor, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { sustainability_attributes } from '@prisma/client';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Sustainability Attributes')
@UseFilters(new HttpExceptionFilter(SustainabilityAttributesController.name))
@Controller('sustainability_attributes')
export class SustainabilityAttributesController {
  constructor(private readonly claim: SustainabilityAttributesService) {}

  @Post()
  @Roles(Role.ColdAdmin)
  create(@Req() req: IRequest, @Body() createClaimDto: sustainability_attributes) {
    return this.claim.create(req.organization, req.user, createClaimDto);
  }

  @Patch(':id')
  @Roles(Role.ColdAdmin)
  update(@Req() req: IRequest, @Param('id') id: string, @Body() updateClaimDto: sustainability_attributes) {
    updateClaimDto.id = id;
    return this.claim.update(req.organization, req.user, updateClaimDto);
  }

  @Get()
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findAll() {
    return this.claim.findAll();
  }

  @Get(':id')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findById(@Req() req: IRequest, @Param('id') id: string) {
    return this.claim.findById(req.organization, req.user, id);
  }

  @Get('name/:name')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  findByName(@Req() req: IRequest, @Param('name') name: string) {
    return this.claim.findByName(req.organization, req.user, name);
  }

  @Delete(':id')
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  remove(@Req() req: IRequest, @Param('id') id: string) {
    return this.claim.remove(req.organization, req.user, id);
  }
}
