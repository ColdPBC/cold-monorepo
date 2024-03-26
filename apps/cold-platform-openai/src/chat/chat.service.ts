import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';

@Injectable()
export class ChatService extends BaseWorker implements OnModuleInit {}
