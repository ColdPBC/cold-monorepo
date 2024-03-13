import { Module } from '@nestjs/common';
import { AssistantConsumer } from './assistant.consumer';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { FileService } from './files/file.service';
import { PromptsService } from './surveys/prompts/prompts.service';
import { Tools } from './tools/tools';

@Module({
  imports: [],
  providers: [AssistantConsumer, AppService, AssistantService, FileService, PromptsService, Tools],
})
export class AssistantModule {}
