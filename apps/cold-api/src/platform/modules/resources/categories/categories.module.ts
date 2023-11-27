import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule, ColdCacheModule, CacheService, JwtStrategy } from '@coldpbc/nest';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryValidationModule } from './validation/category-validation.module';

@Module({
  imports: [PrismaModule, ColdCacheModule, CategoryValidationModule],
  providers: [CategoriesService, JwtService, JwtStrategy, CacheService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
