import { Controller, Param, Post, Req, UseFilters } from '@nestjs/common';
import { BaseWorker, HttpExceptionFilter, IRequest } from '@coldpbc/nest';
import { ApiTags } from '@nestjs/swagger';
import { LinearService } from './linear.service';

@Controller('linear')
@UseFilters(new HttpExceptionFilter(LinearController.name))
export class LinearController extends BaseWorker {
	constructor(readonly linearService: LinearService) {
		super(LinearController.name);
	}

	@Post('webhook/organizations/:orgId')
	@ApiTags('Linear : Webhooks')
	incomingWebhook(
		@Req()
		req: IRequest,
		@Param('orgId') orgId?: string,
	) {
		return this.linearService.updateFileStatus(req.body.issue.id, req.body.issue.status);
	}
}
