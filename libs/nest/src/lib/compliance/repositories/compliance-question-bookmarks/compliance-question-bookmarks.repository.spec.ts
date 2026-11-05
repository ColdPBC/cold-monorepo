import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceQuestionBookmarksRepository } from './compliance-question-bookmarks.repository';
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

describe('ComplianceQuestionBookmarksRepository', () => {
	let service: ComplianceQuestionBookmarksRepository;
	let module: TestingModule;
	const prisma = {
		organization_compliance: { findUnique: jest.fn() },
		organization_compliance_question_bookmarks: { findUnique: jest.fn() },
	};
	const cache = { set: jest.fn(), delete: jest.fn() };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [ComplianceQuestionBookmarksRepository, { provide: PrismaService, useValue: prisma }, { provide: CacheService, useValue: cache }],
		}).compile();
		service = module.get(ComplianceQuestionBookmarksRepository);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('scopes a bookmark to its owner and organization compliance', async () => {
		const org = { id: 'org_1', name: 'Example' } as Parameters<typeof service.getComplianceQuestionBookmarkById>[2];
		const user = { coldclimate_claims: { email: 'reader@example.test' } } as Parameters<typeof service.getComplianceQuestionBookmarkById>[3];
		const bookmark = { id: 'bookmark_1' };
		prisma.organization_compliance.findUnique.mockResolvedValue({ id: 'oc_1' });
		prisma.organization_compliance_question_bookmarks.findUnique.mockResolvedValue(bookmark);
		await expect(service.getComplianceQuestionBookmarkById('standard', 'bookmark_1', org, user)).resolves.toEqual(bookmark);
		expect(prisma.organization_compliance_question_bookmarks.findUnique).toHaveBeenCalledWith({
			where: {
				id: 'bookmark_1',
				email: 'reader@example.test',
				organization_compliance_id: 'oc_1',
			},
		});
		expect(cache.set).toHaveBeenCalledWith('organizations:org_1:compliance:standard:bookmarks:user:reader@example.test:bookmark_1', bookmark, { ttl: 604800 });
	});
});
