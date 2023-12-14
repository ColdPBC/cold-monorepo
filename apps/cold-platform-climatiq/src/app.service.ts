import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, ColdRabbitService } from '@coldpbc/nest';

@Injectable()
export class AppService extends BaseWorker implements OnModuleInit {
  constructor(private rabbit: ColdRabbitService) {
    super(AppService.name);
  }

  async onModuleInit(): Promise<void> {
    const pkg = await BaseWorker.getParsedJSON('apps/cold-platform-climatiq/package.json');

    await this.rabbit.register_service(pkg);

    this.logger.log('AppService initialized');
  }
}
