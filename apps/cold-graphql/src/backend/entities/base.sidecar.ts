import { WorkerLogger } from '../libs/logger';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { MqttService } from '../libs/mqtt/mqtt.service';
import { getConnection } from '../database.config';
import { Cuid2Generator } from '../libs/cuid/cuid2-generator.service';
import { GuidPrefixes } from '../libs/cuid/compliance.enums';

export class BaseSidecar {
	logger;
	provider;
	mqtt: MqttService;
	id: Cuid2Generator;
	constructor(entityName: string, entity: any) {
		this.mqtt = new MqttService(entityName);
		this.provider = new MikroBackendProvider(entity, getConnection());
		this.logger = new WorkerLogger('organization');
		this.id = new Cuid2Generator(entity.name);
	}
}
