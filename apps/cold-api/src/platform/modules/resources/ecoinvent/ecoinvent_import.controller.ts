import { Controller, Post, Body, Req, UseGuards, UseFilters, Param, Put, Query, ParseBoolPipe } from '@nestjs/common';
import { EcoinventImportService } from './ecoinvent_import.service';
import { CreateEcoinventImportDto } from './dto/create-ecoinvent_import.dto';
import { HttpExceptionFilter, JwtAuthGuard, Role, Roles, RolesGuard } from '@coldpbc/nest';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(EcoinventImportController.name))
@Controller('ecoinvent')
export class EcoinventImportController {
	constructor(private readonly ecoinventImportService: EcoinventImportService) {}

	@Post('import')
	@Roles(Role.ColdAdmin)
	create(@Req() req: any, @Body() createEcoinventImportDto?: CreateEcoinventImportDto) {
		return this.ecoinventImportService.importCsv(req);
	}

	@Put('import/:location')
	@Roles(Role.ColdAdmin)
	update(@Req() req: any, @Param('location') location: string, @Query('reprocess', ParseBoolPipe) reprocess: boolean, @Query('bpc', ParseBoolPipe) bpc: boolean) {
		if (location === 'all') {
			return this.ecoinventImportService.queueImportJobs(req, undefined, reprocess, bpc);
		}
		return this.ecoinventImportService.queueImportJobs(req, location, reprocess, bpc);
	}
}
