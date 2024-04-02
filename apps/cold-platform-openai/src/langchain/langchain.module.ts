import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { LoadersModule } from './custom_loaders/loaders.module';
import { LangchainLoaderService } from './langchain.loader.service';
import { WordLoader } from './custom_loaders/word.loader';
import { XlsLoader } from './custom_loaders/xls.loader';
import { TextLoader } from './custom_loaders/text.loader';

@Module({
  imports: [LoadersModule],
  providers: [LangchainService, LangchainLoaderService, WordLoader, XlsLoader, TextLoader],
  exports: [LangchainService, LangchainLoaderService, WordLoader, XlsLoader, TextLoader],
})
export class LangchainModule {}
