import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, JwtStrategy, MqttService, PrismaModule } from '@coldpbc/nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { SurveysRabbitService } from './surveys.rabbit';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [SurveysController],
  providers: [SurveysService, JwtService, JwtStrategy, CacheService, SurveysRabbitService, MqttService],
  exports: [SurveysService, JwtService, JwtStrategy, CacheService, SurveysRabbitService, MqttService],
})
export class SurveysModule {}
