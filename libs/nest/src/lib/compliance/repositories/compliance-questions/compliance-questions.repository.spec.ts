import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionsRepository } from './compliance-questions.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CacheService } from '../../../cache/cache.service';
import { FilteringService } from '../../filtering/filtering.service';
import { NotFoundException } from '@nestjs/common';

// Keep unit tests independent of Datadog initialization, sockets, and filesystem metadata.
jest.mock('../../../worker', () => ({
	BaseWorker: class {
		appPackage = { name: 'cold-unit-tests' };
		logger = { log: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() };
		sendMetrics = jest.fn();
	},
	WorkerLogger: class {
		error = jest.fn();
	},
}));

describe('ComplianceQuestionsRepository', () => {
	let service: ComplianceQuestionsRepository;
	let module: TestingModule;
	const prisma = { compliance_questions: { findUnique: jest.fn() } };
	const cache = { get: jest.fn(), set: jest.fn(), delete: jest.fn() };
	const filtering = { filterQuestions: jest.fn() };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [
				ComplianceQuestionsRepository,
				{ provide: PrismaService, useValue: prisma },
				{ provide: CacheService, useValue: cache },
				{ provide: FilteringService, useValue: filtering },
			],
		}).compile();
		service = module.get(ComplianceQuestionsRepository);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('returns the question identified by its ID', async () => {
		const question = { id: 'q_1', prompt: 'Is evidence available?' };
		prisma.compliance_questions.findUnique.mockResolvedValue(question);
		await expect(service.getQuestion('q_1')).resolves.toEqual(question);
		expect(prisma.compliance_questions.findUnique).toHaveBeenCalledWith({ where: { id: 'q_1' } });
	});

	it('rejects an unknown question', async () => {
		prisma.compliance_questions.findUnique.mockResolvedValue(null);
		await expect(service.getQuestion('missing')).rejects.toBeInstanceOf(NotFoundException);
	});
});
