import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, ColdRabbitModule, ColdRabbitService, JwtStrategy, MqttService, PrismaModule } from '@coldpbc/nest';
import { ComplianceController } from './compliance.controller';
import { ComplianceDefinitionService } from './compliance_definition.service';

@Module({
  imports: [ColdRabbitModule.forFeature(), PrismaModule, ColdCacheModule],
  controllers: [ComplianceController],
  providers: [ComplianceDefinitionService, JwtService, JwtStrategy, CacheService, ColdRabbitService, MqttService],
  exports: [ComplianceDefinitionService, JwtService, JwtStrategy, CacheService, ColdRabbitService, MqttService],
})
export class ComplianceDefinitionModule {}
