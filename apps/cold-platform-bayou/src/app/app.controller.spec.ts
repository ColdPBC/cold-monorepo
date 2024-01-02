import { Test, TestingModule } from '@nestjs/testing';

import { BayouController } from './bayou.controller';
import { BayouService } from './bayou.service';

const testData = {
  event: 'account_created',
  data: {
    utility: 'arizona_public_service',
    organization: {
      id: 'org_123',
      email: 'test@example.com',
    },
  },
};
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
