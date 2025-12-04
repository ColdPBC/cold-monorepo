import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { OpenAIController } from '../../../cold-platform-openai/src/app.controller';
import { AppService } from '../../../cold-platform-openai/src/app.service';
import { FileService } from '../../../cold-platform-openai/src/assistant/files/file.service';
import { PrismaService, RolesGuard, JwtAuthGuard } from '@coldpbc/nest';
import { PineconeService } from '../../../cold-platform-openai/src/pinecone/pinecone.service';

describe('OpenAIController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OpenAIController],
      providers: [
        {
          provide: AppService,
          useValue: {
            listModels: jest.fn().mockResolvedValue([{ id: 'gpt-4o', object: 'model' }]),
            deleteAssistant: jest.fn(),
          },
        },
        { provide: FileService, useValue: {} },
        { provide: PrismaService, useValue: {} },
        { provide: PineconeService, useValue: { syncAllOrgFiles: jest.fn() } },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (ctx) => {
          const req = ctx.switchToHttp().getRequest();
          req.user = { sub: 'tester', coldclimate_claims: { email: 'tester@example.com' } };
          return true;
        },
      })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /models should return mocked model list', async () => {
    const res = await request(app.getHttpServer()).get('/models');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 'gpt-4o', object: 'model' }]);
  });
});
