import { Controller, Get, Param, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, RolesGuard } from '@coldpbc/nest';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Certifications')
@UseFilters(new HttpExceptionFilter(SuppliersController.name))
@Controller('organizations/:orgId/suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  findAll(@Req() req: any, @Param('orgId') orgId: string) {
    return this.suppliersService.findAll(req.organization, req.user);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('orgId') orgId: string, @Param('id') id: string) {
    return this.suppliersService.findById(req.organization, req.user, id);
  }

  @Get(':name')
  findByName(@Req() req: any, @Param('orgId') orgId: string, @Param('name') name: string) {
    return this.suppliersService.findByName(req.organization, req.user, name);
  }
}
