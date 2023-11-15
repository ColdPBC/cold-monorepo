import { Module } from '@nestjs/common';
import { ColdCacheModule } from '../../cache/cache.module';
import { PrismaModule } from '../../vendor/prisma/prisma.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
