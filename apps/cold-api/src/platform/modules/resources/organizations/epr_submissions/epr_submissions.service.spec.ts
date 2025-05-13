import { Test, TestingModule } from '@nestjs/testing';
import { EprSubmissionsService } from './epr_submissions.service';

describe('EprSubmissionsService', () => {
  let service: EprSubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EprSubmissionsService],
    }).compile();

    service = module.get<EprSubmissionsService>(EprSubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
