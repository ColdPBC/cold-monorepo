import { Module } from '@nestjs/common';
import { ColdCacheModule, MqttModule, PrismaModule } from '@coldpbc/nest';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [PrismaModule, ColdCacheModule, MqttModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
