import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService, ColdRabbitService, DarklyService } from '@coldpbc/nest';
import { Tools } from './assistant/tools/tools';

describe('AppService (unit)', () => {
  let service: AppService;

  beforeEach(() => {
    const config = {
      getOrThrow: (key: string) => {
        if (key === 'OPENAI_ORG_ID') return 'org_test';
        if (key === 'OPENAI_API_KEY') return 'sk-test';
        throw new Error('Unexpected key ' + key);
      },
    } as unknown as ConfigService;

    // Minimal mocks for required deps
    const prisma = {} as unknown as PrismaService;
    const rabbit = {
      register_service: jest.fn(),
    } as unknown as ColdRabbitService;
    const darkly = {
      getStringFlag: jest.fn(),
    } as unknown as DarklyService;
    const tools = {
      answerable: jest.fn(),
      unanswerable: jest.fn(),
    } as unknown as Tools;

    service = new AppService(config, prisma, rabbit, darkly, tools);
  });

  describe('handleError', () => {
    it('throws NotFoundException for 404', () => {
      expect(() => service.handleError({ status: 404, message: 'not found' })).toThrow(NotFoundException);
    });

    it('throws UnprocessableEntityException for 4xx', () => {
      expect(() => service.handleError({ status: 422, message: 'bad' })).toThrow(UnprocessableEntityException);
    });
  });
});
