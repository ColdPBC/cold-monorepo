import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { allRoles, HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organization', 'Products')
@UseFilters(new HttpExceptionFilter(ProductsController.name))
@Controller('organizations/:orgId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(...allRoles)
  createOne(@Req() req: any, @Param('orgId') orgId: string, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req, createProductDto);
  }

  @Post('batch')
  @Roles(...allRoles)
  createMany(@Req() req: any, @Param('orgId') orgId: string, @Body() createProductDto: CreateProductDto[]) {
    return this.productsService.createMany(req, createProductDto);
  }

  @Get()
  @Roles(...allRoles)
  findAll(@Req() req: any, @Param('orgId') orgId: string) {
    return this.productsService.findAll(req);
  }

  @Get(':id')
  @Roles(...allRoles)
  findOneById(@Req() req: any, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.productsService.findOne(req, { id });
  }

  @Get('name/:name')
  @Roles(...allRoles)
  findOneByName(@Req() req: any, @Param('orgId') orgId: string, @Param('name') name: string) {
    return this.productsService.findOne(req, { name });
  }

  @Patch(':id')
  @Roles(...allRoles)
  updateById(@Req() req: any, @Param('orgId') orgId: string, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(req, { id }, updateProductDto);
  }

  @Patch('name/:name')
  @Roles(...allRoles)
  updateByName(@Req() req: any, @Param('orgId') orgId: string, @Param('name') name: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(req, { name }, updateProductDto);
  }

  @Delete(':id')
  @Roles(...allRoles)
  removeById(@Req() req: any, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.productsService.remove(req, { id });
  }

  @Delete('name/:name')
  @Roles(...allRoles)
  removeByName(@Req() req: any, @Param('orgId') orgId: string, @Param('name') name: string) {
    return this.productsService.remove(req, { name });
  }
}
