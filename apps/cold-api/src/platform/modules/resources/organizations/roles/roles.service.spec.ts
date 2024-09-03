import { Test, TestingModule } from '@nestjs/testing';
import { OrgRolesService } from './roles.service';

describe('RolesService', () => {
  let service: OrgRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgRolesService],
    }).compile();

    service = module.get<OrgRolesService>(OrgRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
