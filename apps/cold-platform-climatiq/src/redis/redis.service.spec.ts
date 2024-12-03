import { Test, TestingModule } from '@nestjs/testing';
import { OutboundQueueProcessor } from './outbound.processor';

describe('RedisService', () => {
	let service: OutboundQueueProcessor;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [OutboundQueueProcessor],
		}).compile();

		service = module.get<OutboundQueueProcessor>(OutboundQueueProcessor);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
