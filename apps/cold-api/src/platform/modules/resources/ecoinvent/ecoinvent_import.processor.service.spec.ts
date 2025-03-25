import { Test, TestingModule } from '@nestjs/testing';
import { EcoinventImportProcessorService } from './ecoinvent_import.processor.service';

describe('EcoinventImportRepositoryService', () => {
	let service: EcoinventImportProcessorService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EcoinventImportProcessorService],
		}).compile();

		service = module.get<EcoinventImportProcessorService>(EcoinventImportProcessorService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
