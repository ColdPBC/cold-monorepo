import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guard';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { WorkerLogger, CacheService, ColdCacheModule } from 'nest';

@Global()
@Module({
  imports: [ConfigModule, ColdCacheModule, HttpModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [CacheService, WorkerLogger, JwtStrategy, JwtService, ConfigService, JwtAuthGuard, RolesGuard, PermissionsGuard],
  exports: [PassportModule, JwtStrategy, JwtService, JwtAuthGuard, WorkerLogger, CacheService],
})
export class AuthorizationModule {}
