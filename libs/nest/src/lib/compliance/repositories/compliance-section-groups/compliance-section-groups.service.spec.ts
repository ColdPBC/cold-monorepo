import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionGroupsRepository } from './compliance-section-groups.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { FilteringService } from '../../filtering/filtering.service';
import { ScoringService } from '../../scoring/scoring.service';
import { ComplianceSectionsRepository } from '../compliance-sections/compliance-sections.repository';

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

describe('ComplianceSectionGroupsRepository', () => {
	let service: ComplianceSectionGroupsRepository;
	let module: TestingModule;
	const prisma = { compliance_section_groups: { findMany: jest.fn() } };
	const filtering = { filterSectionGroups: jest.fn() };
	const scoring = { scoreComplianceResponse: jest.fn() };
	const sections = { getSectionListByComplianceAndGroup: jest.fn() };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [
				ComplianceSectionGroupsRepository,
				{ provide: PrismaService, useValue: prisma },
				{ provide: FilteringService, useValue: filtering },
				{ provide: ScoringService, useValue: scoring },
				{ provide: ComplianceSectionsRepository, useValue: sections },
			],
		}).compile();
		service = module.get(ComplianceSectionGroupsRepository);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('returns unfiltered groups without applying the filter', async () => {
		const groups = [{ id: 'group_1' }];
		prisma.compliance_section_groups.findMany.mockResolvedValue(groups);
		await expect(service.getSectionGroupList({ compliance_definition_name: 'standard' })).resolves.toEqual(groups);
		expect(prisma.compliance_section_groups.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { compliance_definition_name: 'standard' } }));
		expect(filtering.filterSectionGroups).not.toHaveBeenCalled();
	});

	it('returns the filtered group list when filtering is requested', async () => {
		const groups = [{ id: 'group_1' }, { id: 'group_2' }];
		prisma.compliance_section_groups.findMany.mockResolvedValue(groups);
		filtering.filterSectionGroups.mockResolvedValue([groups[1]]);
		await expect(service.getSectionGroupList({}, true)).resolves.toEqual([groups[1]]);
		expect(filtering.filterSectionGroups).toHaveBeenCalledWith(groups);
	});
});
