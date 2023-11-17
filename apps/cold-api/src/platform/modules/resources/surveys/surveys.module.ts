import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService, PrismaModule, CacheService, ColdCacheModule, JwtStrategy } from 'nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [SurveysController],
  providers: [SurveysService, JwtService, JwtStrategy, PrismaService, CacheService],
})
export class SurveysModule {}
