import { Module } from '@nestjs/common';
import { ExtractionService } from './extraction.service';
import { ExtractionXlsxService } from './extraction.xlsx.service';
import { XlsLoader } from '../langchain/custom_loaders/xls.loader';
import { ClassificationService } from './classification.service';
import { ExtractionProcessorService } from './extraction.processor.service';
import { EntitiesModule } from '../entities/entities.module';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'openai:materials',
			settings: {
				stalledInterval: 3600000,
				maxStalledCount: 120,
			},
		}),
		BullModule.registerQueue({
			name: 'openai:products',
			settings: {
				stalledInterval: 3600000,
				maxStalledCount: 120,
			},
		}),
		BullModule.registerQueue({
			name: 'openai:suppliers',
			settings: {
				stalledInterval: 3600000,
				maxStalledCount: 120,
			},
		}),
		EntitiesModule,
	],
	providers: [ExtractionService, ClassificationService, ExtractionXlsxService, XlsLoader, ExtractionProcessorService],
	exports: [ExtractionService, ExtractionXlsxService, ClassificationService],
})
export class ExtractionModule {}
