import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../../authorization/jwt.strategy';
import { ColdCacheModule } from 'nest';
import { CacheService } from 'nest';
import { PrismaModule } from 'nest';
import { PrismaService } from 'nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [SurveysController],
  providers: [SurveysService, JwtService, JwtStrategy, PrismaService, CacheService],
})
export class SurveysModule {}
