import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../../authorization/jwt.strategy';
import { PrismaModule, ColdCacheModule, CacheService, PrismaService } from 'nest';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryValidationModule } from './validation/category-validation.module';

@Module({
  imports: [PrismaModule, ColdCacheModule, CategoryValidationModule],
  providers: [CategoriesService, JwtService, JwtStrategy, PrismaService, CacheService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
