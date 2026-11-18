import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceAiResponsesRepository } from './compliance-ai-responses.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CacheService } from '../../../cache/cache.service';

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

describe('ComplianceAiResponsesRepository', () => {
	let service: ComplianceAiResponsesRepository;
	let module: TestingModule;
	const prisma = {
		organization_compliance: { findUnique: jest.fn() },
		organization_compliance_ai_responses: { findUnique: jest.fn() },
	};
	const cache = { set: jest.fn(), delete: jest.fn() };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [ComplianceAiResponsesRepository, { provide: PrismaService, useValue: prisma }, { provide: CacheService, useValue: cache }],
		}).compile();
		service = module.get(ComplianceAiResponsesRepository);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('scopes an AI response to the organization and compliance and caches the result', async () => {
		const org = { id: 'org_example', name: 'Example' } as Parameters<typeof service.getAiResponse>[0];
		const response = { id: 'response_1', value: true };
		prisma.organization_compliance.findUnique.mockResolvedValue({ id: 'oc_1' });
		prisma.organization_compliance_ai_responses.findUnique.mockResolvedValue(response);

		await expect(service.getAiResponse(org, 'standard', 'response_1', {})).resolves.toEqual(response);
		expect(prisma.organization_compliance.findUnique).toHaveBeenCalledWith({
			where: {
				orgIdCompNameKey: { organization_id: org.id, compliance_definition_name: 'standard' },
			},
		});
		expect(prisma.organization_compliance_ai_responses.findUnique).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { id: 'response_1', organization_id: org.id, organization_compliance_id: 'oc_1' },
			}),
		);
		expect(cache.set).toHaveBeenCalledWith('organizations:org_example:compliance:standard:responses:ai_responses:response_1', response);
	});
});
