import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService, ColdCacheModule, JwtStrategy, PrismaModule } from '@coldpbc/nest';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryValidationModule } from './validation/category-validation.module';

@Module({
  imports: [PrismaModule, ColdCacheModule, CategoryValidationModule],
  providers: [CategoriesService, JwtService, JwtStrategy, CacheService],
  controllers: [CategoriesController],
  exports: [CategoriesService, JwtService, JwtStrategy, CacheService],
})
export class CategoriesModule {}
