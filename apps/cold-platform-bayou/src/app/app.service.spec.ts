import { Test } from '@nestjs/testing';

import { BayouService } from './bayou.service';

describe('AppService', () => {
  let service: BayouService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [BayouService],
    }).compile();

    service = app.get<BayouService>(BayouService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
