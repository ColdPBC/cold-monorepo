import { Module } from '@nestjs/common';
import { WordLoader } from './word.loader';
import { XlsLoader } from './xls.loader';
import { PDFLoader } from './pdf.loader';
import { TextLoader } from './text.loader';

@Module({
  providers: [WordLoader, XlsLoader, PDFLoader, TextLoader],
  exports: [WordLoader, XlsLoader, PDFLoader, TextLoader],
})
export class LoadersModule {}
