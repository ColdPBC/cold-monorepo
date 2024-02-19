import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@coldpbc/nest';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryValidationModule } from './validation/category-validation.module';

@Module({
  imports: [CategoryValidationModule],
  providers: [CategoriesService, JwtService, JwtStrategy],
  controllers: [CategoriesController],
  exports: [CategoriesService, JwtService, JwtStrategy],
})
export class CategoriesModule {}
