import { Module } from '@nestjs/common';
import { AssistantConsumer } from './assistant.consumer';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { FileService } from './files/file.service';

@Module({
  imports: [],
  providers: [AssistantConsumer, AppService, AssistantService, FileService],
})
export class AssistantModule {}
