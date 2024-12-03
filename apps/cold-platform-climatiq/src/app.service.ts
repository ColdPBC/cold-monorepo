import { Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker, ColdRabbitService } from '@coldpbc/nest';
import { service_definitions } from '@prisma/client';

@Injectable()
export class AppService extends BaseWorker implements OnModuleInit {
	service: service_definitions;

	constructor(private rabbit: ColdRabbitService) {
		super(AppService.name);
	}

	async onModuleInit(): Promise<void> {
		const pkg = await BaseWorker.getParsedJSON('package.json', false);

		try {
			this.service = (await this.rabbit.register_service(pkg.service)) as service_definitions;
		} catch (e) {
			this.logger.error(e.message, e);
			try {
				this.logger.warn('Unable to register service with RabbitMQ, retrieved service definition from database.');
			} catch (e) {
				this.handleError(e);
			}
		}
	}

	handleError(e, meta?) {
		if (e.status === 404) {
			throw new NotFoundException(e.message);
		}
		if (e.status > 399 && e.status < 500) {
			this.logger.error(e.message, meta);
			throw new UnprocessableEntityException(e.message);
		}
	}
}
