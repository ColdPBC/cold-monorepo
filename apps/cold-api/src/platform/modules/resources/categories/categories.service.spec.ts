import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../../authorization/jwt.strategy';
import { ColdCacheModule, CacheService, PrismaModule, PrismaService } from 'nest';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryValidationModule } from './validation/category-validation.module';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule, CategoryValidationModule],
      providers: [CategoriesService, JwtService, JwtStrategy, PrismaService, CacheService],
      controllers: [CategoriesController],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
