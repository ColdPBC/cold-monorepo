import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard, JwtAuthGuard, PermissionsGuard } from '../guards';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheService, ColdCacheModule } from '../cache';
import { WorkerLogger } from '../worker';

@Global()
@Module({
  imports: [ConfigModule, ColdCacheModule, HttpModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [CacheService, WorkerLogger, JwtStrategy, JwtService, ConfigService, JwtAuthGuard, RolesGuard, PermissionsGuard],
  exports: [PassportModule, JwtStrategy, JwtService, JwtAuthGuard, WorkerLogger, CacheService],
})
export class AuthorizationModule {}
