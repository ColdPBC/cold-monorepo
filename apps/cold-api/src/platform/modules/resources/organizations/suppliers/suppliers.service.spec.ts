import { Test, TestingModule } from '@nestjs/testing';
import { SuppliersRepository } from '@coldpbc/nest';
import { SuppliersService } from './suppliers.service';

describe('SuppliersService', () => {
  let service: SuppliersService;

  const supRepo = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    getSupplierClaimNames: jest.fn(),
    getOrgClaimList: jest.fn(),
  };

  const org = { id: 'org_1' } as any;
  const user = { email: 'user@example.com' } as any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuppliersService,
        { provide: SuppliersRepository, useValue: supRepo },
      ],
    }).compile();

    service = module.get<SuppliersService>(SuppliersService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll delegates to repository.findAll', async () => {
    supRepo.findAll.mockResolvedValue([{ id: 'sup_1' }]);

    await expect(service.findAll(org, user)).resolves.toEqual([{ id: 'sup_1' }]);
    expect(supRepo.findAll).toHaveBeenCalledWith(org, user);
  });

  it('findById delegates to repository.findOne with id criteria', async () => {
    supRepo.findOne.mockResolvedValue({ id: 'sup_1' });

    await expect(service.findById(org, user, 'sup_1')).resolves.toEqual({ id: 'sup_1' });
    expect(supRepo.findOne).toHaveBeenCalledWith(org, user, { id: 'sup_1' });
  });

  it('getClaimNames delegates to repository.getSupplierClaimNames', async () => {
    supRepo.getSupplierClaimNames.mockResolvedValue(['claim_a']);

    await expect(service.getClaimNames(org, user)).resolves.toEqual(['claim_a']);
    expect(supRepo.getSupplierClaimNames).toHaveBeenCalledWith(org, user);
  });

  it('getClaimList delegates to repository.getOrgClaimList', async () => {
    supRepo.getOrgClaimList.mockResolvedValue([{ claim: 'claim_a' }]);

    await expect(service.getClaimList(org, user)).resolves.toEqual([{ claim: 'claim_a' }]);
    expect(supRepo.getOrgClaimList).toHaveBeenCalledWith(org, user);
  });
});
