import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';
import { LangchainModule } from '../langchain/langchain.module';
import { LangchainLoaderService } from '../langchain/langchain.loader.service';
import { PrismaModule } from '@coldpbc/nest';

@Module({
  imports: [LangchainModule, PrismaModule],
  providers: [PineconeService, LangchainLoaderService],
  exports: [PineconeService],
})
export class PineconeModule {}
