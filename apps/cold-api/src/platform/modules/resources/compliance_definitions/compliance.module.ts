import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, JwtStrategy, PrismaModule } from '@coldpbc/nest';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';

@Module({
  imports: [PrismaModule, ColdCacheModule],
  controllers: [ComplianceController],
  providers: [ComplianceService, JwtService, JwtStrategy, CacheService],
})
export class ComplianceModule {}
