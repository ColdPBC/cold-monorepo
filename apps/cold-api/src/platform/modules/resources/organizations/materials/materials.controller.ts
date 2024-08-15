import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseFilters } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { allRoles, HttpExceptionFilter, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { OrganizationFilesController } from '../files/organization.files.controller';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organizations/:orgId/materials')
@UseFilters(new HttpExceptionFilter(OrganizationFilesController.name))
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(@Req() req: any, @Param('orgId') orgId: string, @Body() createMaterialDto: any) {
    return this.materialsService.create(req, createMaterialDto);
  }

  @Post('/:id/supplier/:supplierId')
  @Roles(...allRoles)
  createMaterialSupplier(@Req() req: any, @Param('orgId') orgId: string, @Param('id') id: string, @Param('supplierId') supplierId: string) {
    return this.materialsService.createSupplierMaterial(req, id, supplierId);
  }

  @Post('batch')
  @Roles(...allRoles)
  createMany(@Req() req: any, @Param('orgId') orgId: string, @Body() createMaterialDto: any) {
    return this.materialsService.createMany(req, createMaterialDto);
  }

  @Get()
  @Roles(...allRoles)
  findAll(@Req() req: any, @Param('orgId') orgId: string) {
    return this.materialsService.findAll(req);
  }

  @Get(':id')
  @Roles(...allRoles)
  findOne(@Req() req: any, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.materialsService.findOne(req, id);
  }

  @Patch(':id')
  @Roles(...allRoles)
  update(@Req() req: any, @Param('orgId') orgId: string, @Param('id') id: string, @Body() updateMaterialDto: any) {
    return this.materialsService.update(req, id, updateMaterialDto);
  }

  @Delete(':id')
  @Roles(...allRoles)
  remove(@Req() req: any, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.materialsService.remove(req, id);
  }
}
