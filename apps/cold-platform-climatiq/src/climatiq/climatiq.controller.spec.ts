import { Test, TestingModule } from '@nestjs/testing';
import { ClimatiqController } from './climatiq.controller';

describe('ClimatiqController', () => {
	let controller: ClimatiqController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ClimatiqController],
		}).compile();

		controller = module.get<ClimatiqController>(ClimatiqController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
