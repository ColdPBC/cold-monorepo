import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, ColdRabbitModule, ColdRabbitService, JwtStrategy, MqttModule, PrismaModule } from '@coldpbc/nest';
import { ComplianceController } from './compliance.controller';
import { ComplianceDefinitionService } from './compliance_definition.service';
import { BroadcastEventService } from '../../../utilities/events/broadcast.event.service';

@Module({
  imports: [ColdRabbitModule.forFeature(), PrismaModule, ColdCacheModule, MqttModule],
  controllers: [ComplianceController],
  providers: [ComplianceDefinitionService, JwtService, JwtStrategy, CacheService, ColdRabbitService, BroadcastEventService],
  exports: [ComplianceDefinitionService, JwtService, JwtStrategy, CacheService, ColdRabbitService, BroadcastEventService],
})
export class ComplianceDefinitionModule {}
