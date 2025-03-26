import { Controller, Post, Req, UseGuards, UseFilters, Param, Query, ParseBoolPipe } from '@nestjs/common';
import { HttpExceptionFilter, JwtAuthGuard, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { EcoinventActivityService } from './ecoinvent_activity.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(EcoinventActivityController.name))
@Controller('ecoinvent')
export class EcoinventActivityController {
	constructor(private readonly activityService: EcoinventActivityService) {}

	@Post('organizations/:orgId/match')
	@Roles(Role.ColdAdmin)
	createOrganization(
		@Req() req: any,
		@Param('orgId') orgId: string,
		@Query('clear_classification', ParseBoolPipe) clearClassification?: boolean,
		@Query('reclassify_materials', ParseBoolPipe) reclassifyMaterials?: boolean,
	) {
		return this.activityService.queueActivityMatchJobs(req, orgId, reclassifyMaterials, clearClassification);
	}
}
