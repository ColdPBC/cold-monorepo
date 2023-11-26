import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ColdCacheModule, CacheService, PrismaModule, PrismaService, JwtStrategy, DarklyService } from '@coldpbc/nest';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { mockDeep } from 'jest-mock-extended';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule],
      providers: [CategoriesService, JwtService, JwtStrategy, PrismaService, CacheService],
      controllers: [CategoriesController],
    })
      .overrideProvider(JwtService)
      .useValue(mockDeep<JwtService>())
      .overrideProvider(JwtStrategy)
      .useValue(mockDeep<JwtStrategy>())
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .overrideProvider(CacheService)
      .useValue(mockDeep<CacheService>())
      .overrideProvider(DarklyService)
      .useValue({
        getJSONFlag: jest.fn().mockReturnValue(true),
      })
      .compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
