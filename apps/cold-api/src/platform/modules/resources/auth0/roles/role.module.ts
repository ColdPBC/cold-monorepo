import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Auth0TokenService, CacheService, ColdCacheModule } from '@coldpbc/nest';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [HttpModule, ColdCacheModule],
  controllers: [RoleController],
  providers: [RoleService, Auth0TokenService, CacheService],
  exports: [RoleService, Auth0TokenService, CacheService],
})
export class RoleModule {}
