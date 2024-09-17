import { Module } from '@nestjs/common';
import { ExtractionService } from './extraction.service';
import { ExtractionXlsxService } from './extraction.xlsx.service';
import { XlsLoader } from '../langchain/custom_loaders/xls.loader';
import { ClassificationService } from './classification.service';

@Module({
	providers: [ExtractionService, ClassificationService, ExtractionXlsxService, XlsLoader],
	exports: [ExtractionService, ExtractionXlsxService, ClassificationService],
})
export class ExtractionModule {}
