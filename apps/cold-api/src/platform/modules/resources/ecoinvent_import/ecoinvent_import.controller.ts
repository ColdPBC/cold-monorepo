import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseFilters } from '@nestjs/common';
import { EcoinventImportService } from './ecoinvent_import.service';
import { UpdateEcoinventImportDto } from './dto/update-ecoinvent_import.dto';
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
		return this.ecoinventImportService.importCSVFromBucket(req);
	}

	@Get()
	findAll() {
		return this.ecoinventImportService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.ecoinventImportService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEcoinventImportDto: UpdateEcoinventImportDto) {
		return this.ecoinventImportService.update(+id, updateEcoinventImportDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ecoinventImportService.remove(+id);
	}
}
