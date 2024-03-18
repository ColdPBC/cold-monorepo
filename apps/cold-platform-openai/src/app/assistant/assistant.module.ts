import { Module } from '@nestjs/common';
import { AssistantConsumer } from './assistant.consumer';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { FileService } from './files/file.service';
import { PromptsService } from './surveys/prompts/prompts.service';
import { Tools } from './tools/tools';
import { BullModule } from '@nestjs/bull';
import { DarklyModule } from '@coldpbc/nest';

@Module({
  imports: [
    DarklyModule.forRoot(),
    BullModule.registerQueue({
      name: 'openai',
    }),
  ],
  providers: [AssistantConsumer, AppService, AssistantService, FileService, PromptsService, Tools],
})
export class AssistantModule {}
