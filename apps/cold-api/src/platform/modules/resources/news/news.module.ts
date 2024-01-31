import { Module } from '@nestjs/common';
import { ColdCacheModule, PrismaModule } from '@coldpbc/nest';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
