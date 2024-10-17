import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from './guards';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheService, ColdCacheModule } from '../cache';
import { WorkerLogger } from '../worker';
import { Auth0TokenService } from './auth0-token.service';

@Global()
@Module({})
export class AuthorizationModule {
	static async forFeatureAsync() {
		return {
			module: AuthorizationModule,
			imports: [ConfigModule, ColdCacheModule, HttpModule, PassportModule.register({ defaultStrategy: 'jwt' })],
			providers: [CacheService, WorkerLogger, JwtStrategy, JwtService, ConfigService, JwtAuthGuard, RolesGuard, PermissionsGuard, Auth0TokenService],
			exports: [PassportModule, JwtStrategy, JwtService, JwtAuthGuard, ConfigService, WorkerLogger, RolesGuard, PermissionsGuard, CacheService, Auth0TokenService],
		};
	}
}
