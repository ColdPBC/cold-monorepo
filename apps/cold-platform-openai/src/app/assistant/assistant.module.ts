import { Module } from '@nestjs/common';
import { AssistantConsumer } from './assistant.consumer';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { ConfigurationModule } from '@coldpbc/nest';
import { FileService } from './files/file.service';

@Module({
  imports: [ConfigurationModule.forRootAsync()],
  providers: [AssistantConsumer, AppService, AssistantService, FileService],
})
export class AssistantModule {}
