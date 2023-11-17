import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../../authorization/jwt.strategy';
import { PrismaModule, ColdCacheModule, CacheService, PrismaService } from 'nest';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryValidationModule } from './validation/category-validation.module';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule, CategoryValidationModule],
      providers: [CategoriesService, JwtService, JwtStrategy, PrismaService, CacheService],
      controllers: [CategoriesController],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
