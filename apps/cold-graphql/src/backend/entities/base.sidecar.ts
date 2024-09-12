import { WorkerLogger } from '../libs/logger';
import { MqttService, mqttService } from '../libs/mqtt/mqtt.service';
import { secrets } from '../libs/secrets/secrets.service';
import { Cuid2Generator } from '../libs/cuid/cuid2-generator.service';

export class BaseSidecar {
	logger;
	mqtt: MqttService;
	id: Cuid2Generator;
	secrets: any;
	constructor(entityName: string, entity: any) {
		this.logger = new WorkerLogger('organization');
		this.id = new Cuid2Generator(entity.name);
		this.mqtt = mqttService;
	}
}
