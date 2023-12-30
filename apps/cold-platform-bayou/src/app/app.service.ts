import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, ColdRabbitService } from '@coldpbc/nest';

@Injectable()
export class AppService extends BaseWorker implements OnModuleInit {
  constructor(private rabbit: ColdRabbitService) {
    super(AppService.name);
  }

  async onModuleInit(): Promise<void> {
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-bayou/package.json');

    await this.rabbit.register_service(pkg);

    this.logger.log('AppService initialized');
  }

  // Allow any because it's already been validated and we don't know what the payload will be
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webhook(payload: any) {
    return payload;
  }
}
