import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceResponsesRepository } from './compliance-responses.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CacheService } from '../../../cache/cache.service';
import { ScoringService } from '../../scoring/scoring.service';
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

describe('ComplianceResponsesRepository', () => {
	let service: ComplianceResponsesRepository;
	let module: TestingModule;
	const user = { coldclimate_claims: { email: 'reader@example.test' } } as Parameters<typeof service.deleteAllAiResponsesByName>[2];
	const prisma = {
		organization_compliance: { findUnique: jest.fn() },
		organization_compliance_ai_responses: { deleteMany: jest.fn() },
	};
	const cache = { set: jest.fn(), delete: jest.fn() };
	const scoring = { scoreComplianceResponse: jest.fn() };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [
				ComplianceResponsesRepository,
				{ provide: PrismaService, useValue: prisma },
				{ provide: CacheService, useValue: cache },
				{ provide: ScoringService, useValue: scoring },
			],
		}).compile();
		service = module.get(ComplianceResponsesRepository);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('deletes AI responses only for the requested organization compliance and invalidates its cache', async () => {
		const org = { id: 'org_1', name: 'Example' } as Parameters<typeof service.deleteAllAiResponsesByName>[0];
		prisma.organization_compliance.findUnique.mockResolvedValue({ id: 'oc_1' });
		prisma.organization_compliance_ai_responses.deleteMany.mockResolvedValue({ count: 2 });
		await expect(service.deleteAllAiResponsesByName(org, { compliance_definition_name: 'standard' }, user)).resolves.toEqual({ count: 2 });
		expect(prisma.organization_compliance_ai_responses.deleteMany).toHaveBeenCalledWith({
			where: {
				organization_compliance_id: 'oc_1',
				organization_id: 'org_1',
			},
		});
		expect(cache.delete).toHaveBeenCalledWith('organizations:org_1:compliance:standard:responses', true);
	});

	it('does not delete responses if organization compliance is missing', async () => {
		const org = { id: 'org_1', name: 'Example' } as Parameters<typeof service.deleteAllAiResponsesByName>[0];
		prisma.organization_compliance.findUnique.mockResolvedValue(null);
		await expect(service.deleteAllAiResponsesByName(org, { compliance_definition_name: 'standard' }, user)).rejects.toBeInstanceOf(NotFoundException);
		expect(prisma.organization_compliance_ai_responses.deleteMany).not.toHaveBeenCalled();
	});
});
