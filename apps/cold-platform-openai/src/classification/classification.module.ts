import { Module } from '@nestjs/common';
import { ExtractionService } from '../extraction/extraction.service';
import { ExtractionXlsxService } from '../extraction/extraction.xlsx.service';
import { XlsLoader } from '../langchain/custom_loaders/xls.loader';
import { ClassificationService } from './classification.service';
import { EntitiesModule } from '../entities/entities.module';
import { BullModule } from '@nestjs/bull';
import { ClassificationProcessorService } from './classification.processor.service';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'openai:classification',
		}),
		BullModule.registerQueue({
			name: 'openai:extraction',
		}),
		EntitiesModule,
	],
	providers: [ExtractionService, ClassificationService, ExtractionXlsxService, XlsLoader, ClassificationProcessorService],
	exports: [ExtractionService, ExtractionXlsxService, ClassificationService],
})
export class ClassificationModule {}
