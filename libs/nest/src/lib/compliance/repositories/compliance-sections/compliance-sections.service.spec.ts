import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceSectionsRepository } from './compliance-sections.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { FilteringService } from '../../filtering/filtering.service';
import { MqttService } from '../../../mqtt/mqtt.service';

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

describe('ComplianceSectionsRepository', () => {
	let service: ComplianceSectionsRepository;
	let module: TestingModule;
	const user = { coldclimate_claims: { email: 'reader@example.test' } } as Parameters<typeof service.getSectionListByCompliance>[1];
	const prisma = { compliance_sections: { findMany: jest.fn() } };
	const filtering = { filterSections: jest.fn() };
	const mqtt = { publish: jest.fn() };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [
				ComplianceSectionsRepository,
				{ provide: PrismaService, useValue: prisma },
				{ provide: FilteringService, useValue: filtering },
				{ provide: MqttService, useValue: mqtt },
			],
		}).compile();
		service = module.get(ComplianceSectionsRepository);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('scopes section lists to the requested compliance and group', async () => {
		const sections = [{ id: 'section_1' }];
		prisma.compliance_sections.findMany.mockResolvedValue(sections);
		await expect(service.getSectionListByComplianceAndGroup('standard', 'group_1', user)).resolves.toEqual(sections);
		expect(prisma.compliance_sections.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: {
					compliance_definition_name: 'standard',
					compliance_section_group_id: 'group_1',
				},
			}),
		);
		expect(filtering.filterSections).not.toHaveBeenCalled();
	});

	it('returns filtered sections when filtering is requested', async () => {
		const sections = [{ id: 'section_1' }, { id: 'section_2' }];
		prisma.compliance_sections.findMany.mockResolvedValue(sections);
		filtering.filterSections.mockResolvedValue([sections[1]]);
		await expect(service.getSectionListByCompliance('standard', user, true)).resolves.toEqual([sections[1]]);
		expect(filtering.filterSections).toHaveBeenCalledWith(sections);
	});
});
