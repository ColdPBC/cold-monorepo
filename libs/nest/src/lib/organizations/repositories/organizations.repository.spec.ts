import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsRepository } from './organizations.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';

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

describe('OrganizationsRepository', () => {
	let service: OrganizationsRepository;
	let module: TestingModule;
	const user = { coldclimate_claims: { email: 'reader@example.test' } } as Parameters<typeof service.findOne>[0];
	const prisma = { organizations: { findUnique: jest.fn(), delete: jest.fn() } };

	beforeEach(async () => {
		jest.clearAllMocks();

		module = await Test.createTestingModule({
			providers: [OrganizationsRepository, { provide: PrismaService, useValue: prisma }],
		}).compile();
		service = module.get(OrganizationsRepository);
	});

	afterEach(async () => {
		await module?.close();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('requires an organization ID or name before querying', () => {
		expect(() => service.findOne(user, {})).toThrow(UnprocessableEntityException);
		expect(prisma.organizations.findUnique).not.toHaveBeenCalled();
	});

	it('protects the cold-climate organization from deletion', () => {
		expect(() => service.remove({ id: 'org_cold', name: 'cold-climate' }, user)).toThrow(BadRequestException);
		expect(prisma.organizations.delete).not.toHaveBeenCalled();
	});

	it('deletes a valid organization by ID', async () => {
		const org = { id: 'org_example', name: 'Example' };
		prisma.organizations.delete.mockResolvedValue(org);
		await expect(service.remove(org, user)).resolves.toEqual(org);
		expect(prisma.organizations.delete).toHaveBeenCalledWith({ where: { id: org.id } });
	});
});
