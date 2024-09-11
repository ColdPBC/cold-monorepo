import { WorkerLogger } from '../libs/logger';
import { MqttService } from '../libs/mqtt/mqtt.service';
import { Cuid2Generator } from '../libs/cuid/cuid2-generator.service';

export class BaseSidecar {
	logger;
	mqtt: MqttService;
	id: Cuid2Generator;
	constructor(entityName: string, entity: any) {
		this.logger = new WorkerLogger('organization');
		this.id = new Cuid2Generator(entity.name);
		this.mqtt = new MqttService(entityName);
	}
}
