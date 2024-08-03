import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller('organizations/:orgId/materials/:id/supplier')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(@Req() req: any, @Body() createMaterialDto: any) {
    return this.materialsService.create(req, createMaterialDto);
  }

  @Post('batch')
  createMany(@Req() req: any, @Body() createMaterialDto: any) {
    return this.materialsService.createMany(req, createMaterialDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.materialsService.findAll(req);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.materialsService.findOne(req, id);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() updateMaterialDto: any) {
    return this.materialsService.update(req, id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.materialsService.remove(req, id);
  }
}
