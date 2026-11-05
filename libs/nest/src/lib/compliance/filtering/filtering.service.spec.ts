import { Test, TestingModule } from '@nestjs/testing';
import { FilteringService } from './filtering.service';
import { PrismaService } from '../../prisma/prisma.service';

// Keep unit tests independent of Datadog initialization, sockets, and filesystem metadata.
jest.mock('../../worker', () => ({
	BaseWorker: class {
		appPackage = { name: 'cold-unit-tests' };
		logger = { log: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() };
		sendMetrics = jest.fn();
	},
	WorkerLogger: class {
		error = jest.fn();
	},
}));

describe('FilteringService', () => {
	let service: FilteringService;
	let module: TestingModule;
	const prisma = { organization_compliance_responses: { findUnique: jest.fn() } };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [FilteringService, { provide: PrismaService, useValue: prisma }],
		}).compile();
		service = module.get(FilteringService);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('accepts false as a valid yes/no answer and normalizes it', () => {
		const response = { value: false };
		expect(service.questionHasValidAnswer(response, 'value', 'yes_no')).toBe(true);
		expect(response.value).toEqual([false]);
	});

	it.each([null, ''])('rejects an empty answer (%p)', value => {
		expect(service.questionHasValidAnswer({ value }, 'value', 'yes_no')).toBe(false);
	});

	it('deduplicates reference URLs and text', async () => {
		await expect(
			service.filterReferences([
				{ url: 'https://example.test/evidence?one=1', text: 'First' },
				{ url: 'https://example.test/evidence?two=2', text: 'First' },
				{ url: 'https://example.test/evidence', text: 'Second' },
			]),
		).resolves.toEqual([{ url: 'example.test/evidence', text: ['First', 'Second'] }]);
	});
});
