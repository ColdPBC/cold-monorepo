import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, JwtStrategy, MqttModule, PrismaModule } from '@coldpbc/nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { SurveysRabbitService } from './surveys.rabbit';

@Module({
  imports: [PrismaModule, ColdCacheModule, MqttModule],
  controllers: [SurveysController],
  providers: [SurveysService, JwtService, JwtStrategy, CacheService, SurveysRabbitService],
  exports: [SurveysService, JwtService, JwtStrategy, CacheService, SurveysRabbitService],
})
export class SurveysModule {}
