import { Injectable, Scope } from '@nestjs/common';
import { BaseWorker } from '../worker';

@Injectable({ scope: Scope.REQUEST })
export class HealthService {
	/**
	 * Used for health checks
	 * @returns {Promise<any>}
	 */
	async health(): Promise<any> {
		return 'ok';
	}
}
