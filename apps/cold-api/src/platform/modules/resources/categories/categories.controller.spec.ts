import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy, PrismaModule, ColdCacheModule, CacheService, PrismaService, DarklyService } from '@coldpbc/nest';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryValidationModule } from './validation/category-validation.module';
import { mockDeep } from 'jest-mock-extended';
import { authenticatedUserExample, fullReqExample } from '../_global/global.examples';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ColdCacheModule, CategoryValidationModule],
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
      .overrideProvider(CategoriesService)
      .useValue(mockDeep<CategoriesService>())
      .overrideProvider(DarklyService)
      .useValue({
        getJSONFlag: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll called', async () => {
    const response = await controller.findAll(fullReqExample);
    expect(service.findFull).toHaveBeenCalled();
  });

  it('findByName called', async () => {
    const response = await controller.findByKeyAndOrg(fullReqExample);
    expect(service.findByName).toHaveBeenCalled();
  });

  it('findAllByOrg called', async () => {
    const response = await controller.findAllByOrg(fullReqExample);
    expect(service.findFull).toHaveBeenCalled();
  });

  it('submitResults called', async () => {
    const response = await controller.submitOrgValues('test', {}, fullReqExample);
    expect(service.submitResults).toHaveBeenCalled();
  });
});
