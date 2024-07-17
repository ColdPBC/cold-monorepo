import { Global, INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtendedPrismaClient } from './prisma.extensions';

@Injectable()
@Global()
export class PrismaService extends ExtendedPrismaClient implements OnModuleInit {
  constructor(override readonly config: ConfigService) {
    super(config);
  }
}
