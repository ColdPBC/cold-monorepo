import { Module } from '@nestjs/common';
import { AssistantConsumer } from './assistant.consumer';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { ColdRabbitModule, ColdRabbitService } from '@coldpbc/nest';

@Module({
  imports: [ColdRabbitModule.forFeature()],
  providers: [AssistantConsumer, AppService, AssistantService, ColdRabbitService],
})
export class AssistantModule {}
