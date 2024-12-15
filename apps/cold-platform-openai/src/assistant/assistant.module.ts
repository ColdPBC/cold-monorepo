import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { AssistantService } from './assistant.service';
import { FileService } from './files/file.service';
import { Tools } from './tools/tools';
import { BullModule } from '@nestjs/bull';
import { DarklyModule } from '@coldpbc/nest';

@Module({
	imports: [
		DarklyModule.forRoot(),
		BullModule.registerQueue({
			name: 'openai',
		}),
		BullModule.registerQueue({
			name: 'openai_assistant',
		}),
	],
	providers: [AppService, AssistantService, FileService, Tools],
})
export class AssistantModule {}
