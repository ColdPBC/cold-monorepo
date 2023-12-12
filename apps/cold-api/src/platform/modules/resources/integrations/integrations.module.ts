import { Module } from '@nestjs/common';
import { CacheService, ColdCacheModule, PrismaModule } from '@coldpbc/nest';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { RabbitService } from './rabbit.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, CacheService, RabbitService],
})
export class IntegrationsModule {}
