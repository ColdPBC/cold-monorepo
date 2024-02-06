import { Test, TestingModule } from '@nestjs/testing';
import { MembersRabbitService } from './members.rabbit.service';

describe('MembersRabbitService', () => {
  let service: MembersRabbitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersRabbitService],
    }).compile();

    service = module.get<MembersRabbitService>(MembersRabbitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
