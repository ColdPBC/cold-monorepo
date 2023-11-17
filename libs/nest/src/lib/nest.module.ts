import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RedactorModule } from './redactor';
import { HealthModule } from './health';
import { DarklyModule } from './darkly';
import { ColdCacheModule } from './cache';

@Module({
  imports: [PrismaModule, RedactorModule, HealthModule, DarklyModule, ColdCacheModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class NestModule {}
