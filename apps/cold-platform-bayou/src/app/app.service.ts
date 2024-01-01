import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, ColdRabbitService } from '@coldpbc/nest';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService extends BaseWorker implements OnModuleInit {
  constructor(private config: ConfigService, private rabbit: ColdRabbitService, @InjectQueue('outbound') private queue: Queue) {
    super(AppService.name);
  }

  async onModuleInit(): Promise<void> {
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-bayou/package.json');

    await this.rabbit.register_service(pkg);

    this.logger.log('AppService initialized');
  }

  // Allow any because it's already been validated, and we don't know what the payload will be
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async webhook(payload: any) {
    await this.rabbit.publish('cold.platform.climatiq', payload, payload.event);
    //const job = await this.queue.add(payload.event, payload);
    //return job;
    return { message: 'webhook payload added to processing queue' };
  }
}
