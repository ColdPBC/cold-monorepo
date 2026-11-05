import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceNotesRepository } from './compliance-notes.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CacheService } from '../../../cache/cache.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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

describe('ComplianceNotesRepository', () => {
	let service: ComplianceNotesRepository;
	let module: TestingModule;
	const prisma = {
		organization_compliance: { findUnique: jest.fn() },
		organization_compliance_notes: { findMany: jest.fn() },
	};
	const cache = { set: jest.fn(), delete: jest.fn() };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [ComplianceNotesRepository, { provide: PrismaService, useValue: prisma }, { provide: CacheService, useValue: cache }],
		}).compile();
		service = module.get(ComplianceNotesRepository);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('returns only notes for the requested compliance and question', async () => {
		const notes = [{ id: 'note_1', note: 'Evidence received' }];
		prisma.organization_compliance.findUnique.mockResolvedValue({ id: 'oc_1' });
		prisma.organization_compliance_notes.findMany.mockResolvedValue(notes);
		await expect(service.getNotesByqId('standard', 'q_1', { id: 'org_1' }, {})).resolves.toEqual(notes);
		expect(prisma.organization_compliance_notes.findMany).toHaveBeenCalledWith({
			where: {
				organization_compliance_id: 'oc_1',
				compliance_question_id: 'q_1',
			},
		});
		expect(cache.set).toHaveBeenCalledWith('organizations:org_1:compliance:standard:notes:questions:q_1', notes, { ttl: 604800 });
	});

	it('rejects a missing question before reading notes', async () => {
		await expect(service.getNotesByqId('standard', '', { id: 'org_1' }, {})).rejects.toBeInstanceOf(BadRequestException);
		expect(prisma.organization_compliance_notes.findMany).not.toHaveBeenCalled();
	});

	it('rejects a missing organization compliance before reading notes', async () => {
		prisma.organization_compliance.findUnique.mockResolvedValue(null);
		await expect(service.getNotesByqId('standard', 'q_1', { id: 'org_1' }, {})).rejects.toBeInstanceOf(NotFoundException);
		expect(prisma.organization_compliance_notes.findMany).not.toHaveBeenCalled();
	});
});
