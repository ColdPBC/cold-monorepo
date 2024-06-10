import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsRepository } from './organizations.repository';

describe('OrganizationsRepositoryService', () => {
  let service: OrganizationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationsRepository],
    }).compile();

    service = module.get<OrganizationsRepository>(OrganizationsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
