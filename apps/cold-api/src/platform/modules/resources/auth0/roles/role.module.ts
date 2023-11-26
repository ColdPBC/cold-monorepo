import { Module } from '@nestjs/common';
import { Auth0UtilityService } from '../auth0.utility.service';
import { HttpModule } from '@nestjs/axios';
import { ColdCacheModule } from '@coldpbc/nest';
import { CacheService } from '@coldpbc/nest';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [HttpModule, ColdCacheModule],
  controllers: [RoleController],
  providers: [RoleService, Auth0UtilityService, CacheService],
  exports: [RoleService, Auth0UtilityService, CacheService],
})
export class RoleModule {}
