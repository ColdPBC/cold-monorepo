import { Controller, Get, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { BaseWorker, coldAdminOnly, HttpExceptionFilter, IRequest, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { ClimatiqService } from './climatiq.service';
import { Span } from 'nestjs-ddtrace';

@Controller()
@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@UseFilters(new HttpExceptionFilter(ClimatiqController.name))
export class ClimatiqController extends BaseWorker {
	constructor(private readonly cl: ClimatiqService) {
		super(ClimatiqController.name);
	}

	@Get('categories/sync')
	@Roles(...coldAdminOnly)
	sync(
		@Query('sector') sector: string,
		@Query('region') region: string,
		@Query('category') category: string,
		@Query('data_version') data_version: string,
		@Req()
		req: IRequest,
	) {
		this.logger.info('Syncing sector categories', { sector, region, category, data_version });
		return this.cl.syncSectorCategories(req, sector, region, category, data_version);
	}

	@Get('activities/sync')
	@Roles(...coldAdminOnly)
	syncActivities(
		@Req()
		req: IRequest,
	) {
		this.logger.info('Syncing sector activities', { user: req.user, org: req.organization });
		return this.cl.mapOrgMaterialActivities(req);
	}
}
