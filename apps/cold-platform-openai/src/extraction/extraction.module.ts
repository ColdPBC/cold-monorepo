import { Module } from '@nestjs/common';
import { ExtractionService } from './extraction.service';
import { ExtractionXlsxService } from './extraction.xlsx.service';
import { XlsLoader } from '../langchain/custom_loaders/xls.loader';

@Module({
  providers: [ExtractionService, ExtractionXlsxService, XlsLoader],
  exports: [ExtractionService, ExtractionXlsxService],
})
export class ExtractionModule {}
