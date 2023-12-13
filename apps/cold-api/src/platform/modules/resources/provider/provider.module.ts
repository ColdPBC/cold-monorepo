import { Module } from '@nestjs/common';
import { ColdCacheModule, ColdRabbitModule, ColdRabbitService, PrismaModule } from '@coldpbc/nest';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';

@Module({
  imports: [PrismaModule, ColdCacheModule, ColdRabbitModule.forFeature()],
  controllers: [ProviderController],
  providers: [ProviderService, ColdRabbitService],
})
export class ProviderModule {}
