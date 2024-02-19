import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@coldpbc/nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { SurveysRabbitService } from './surveys.rabbit';

@Module({
  controllers: [SurveysController],
  providers: [SurveysService, JwtService, JwtStrategy, SurveysRabbitService],
  exports: [SurveysService, JwtService, JwtStrategy, SurveysRabbitService],
})
export class SurveysModule {}
