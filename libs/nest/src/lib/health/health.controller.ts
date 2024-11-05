import { Controller, Get } from '@nestjs/common';
import { Public } from '../decorators';
import { BaseWorker } from '../worker';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController extends BaseWorker {
	constructor(private readonly service: HealthService) {
		super(HealthController.name);
	}

	/**
	 * Used for health checks
	 * @returns {Promise<any>}
	 */
	@Get()
	@Public()
	public async health() {
		return this.service.health();
	}
}
