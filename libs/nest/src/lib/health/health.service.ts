import { Injectable, Scope } from '@nestjs/common';

@Injectable()
export class HealthService {
	/**
	 * Used for health checks
	 * @returns {Promise<any>}
	 */
	async health(): Promise<any> {
		return 'ok';
	}
}
