import { Module } from '@nestjs/common';
import { CacheService, ColdCacheModule, ColdRabbitModule, ColdRabbitService, PrismaModule } from '@coldpbc/nest';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';

@Module({
  imports: [PrismaModule, ColdCacheModule, ColdRabbitModule.forFeature()],
  controllers: [IntegrationsController],
  providers: [IntegrationsService, CacheService, ColdRabbitService],
})
export class IntegrationsModule {}
