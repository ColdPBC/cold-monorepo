import { Test, TestingModule } from '@nestjs/testing';

import { BayouController } from './bayou.controller';
import { BayouService } from './bayou.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BayouController],
      providers: [BayouService],
    }).compile();
  });

  describe('processWebhook', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<BayouController>(BayouController);
      expect(
        appController.processWebhook({
          event: 'new_bill',
          object: {},
        }),
      ).toEqual({ message: 'webhook payload added to processing queue' });
    });
  });
});
