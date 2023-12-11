import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheService, ColdCacheModule } from '@coldpbc/nest';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [HttpModule, ColdCacheModule],
  controllers: [RoleController],
  providers: [RoleService, CacheService],
  exports: [RoleService, CacheService],
})
export class RoleModule {}
