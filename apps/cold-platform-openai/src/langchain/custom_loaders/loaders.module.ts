import { Module } from '@nestjs/common';
import { WordLoader } from './word.loader';
import { XlsLoader } from './xls.loader';
import { TextLoader } from './text.loader';

@Module({
  providers: [WordLoader, XlsLoader, TextLoader],
  exports: [WordLoader, XlsLoader, TextLoader],
})
export class LoadersModule {}
