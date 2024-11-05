import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { mockDeep } from 'jest-mock-extended';

describe('HealthController', () => {
	let controller: HealthController;
	let service: HealthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HealthController],
			providers: [HealthService],
		})
			.overrideProvider(HealthService)
			.useValue(mockDeep<HealthService>())
			.compile();

		service = module.get<HealthService>(HealthService);
		controller = module.get<HealthController>(HealthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('health should be called', async () => {
		await controller.health();
		expect(service.health).toHaveBeenCalled();
	});
});
