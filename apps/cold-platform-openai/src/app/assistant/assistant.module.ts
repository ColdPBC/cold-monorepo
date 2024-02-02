import { Module } from '@nestjs/common';
import { AssistantConsumer } from './assistant.consumer';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { ColdRabbitModule, ColdRabbitService, DarklyService, S3Service } from '@coldpbc/nest';
import { FileService } from './files/file.service';
import { BroadcastEventService } from '../../../../cold-api/src/platform/utilities/events/broadcast.event.service';

@Module({
  imports: [ColdRabbitModule.forFeature()],
  providers: [AssistantConsumer, AppService, AssistantService, ColdRabbitService, FileService, S3Service, DarklyService, BroadcastEventService],
})
export class AssistantModule {}
