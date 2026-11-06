import { NotFoundException } from '@nestjs/common';
import { organizations } from '@prisma/client';
import { CacheService } from '../../../cache/cache.service';
import { IAuthenticatedUser } from '../../../primitives';
import { PrismaService } from '../../../prisma/prisma.service';
import { OrganizationComplianceRepository } from '../organization-compliance/organization-compliance.repository';
import { OrganizationComplianceStatusesRepository } from './organization-compliance-statuses.repository';

jest.mock('../../../worker', () => ({
	BaseWorker: class {
		logger = { info: jest.fn(), error: jest.fn() };
	},
}));

describe('OrganizationComplianceStatusesRepository reads', () => {
	let repository: OrganizationComplianceStatusesRepository;
	const user = {} as IAuthenticatedUser;
	const organization = { id: 'org_one' } as organizations;
	const statuses = [
		{ id: 'status_one', type: 'in_progress', email: 'member@example.test', organization_compliance_id: 'oc_one', created_at: null, updated_at: null, deleted: false },
		{ id: 'status_two', type: 'completed', email: 'member@example.test', organization_compliance_id: 'oc_one', created_at: null, updated_at: null, deleted: false },
		{ id: 'status_three', type: 'completed', email: 'member@example.test', organization_compliance_id: 'oc_two', created_at: null, updated_at: null, deleted: false },
	];
	const prisma = {
		organization_compliance: { findUnique: jest.fn() },
		organization_compliance_statuses: { findMany: jest.fn() },
	};
	const orgComplianceRepository = { getOrgComplianceDefinitionByName: jest.fn() };

	beforeEach(() => {
		jest.resetAllMocks();
		prisma.organization_compliance.findUnique.mockImplementation(async ({ where, select }) => {
			if (!['oc_one', 'oc_two'].includes(where.id)) return null;
			return {
				id: where.id,
				organization_id: 'org_one',
				statuses: statuses.filter(status => status.organization_compliance_id === where.id && status.id === select.statuses.where.id),
			};
		});
		repository = new OrganizationComplianceStatusesRepository(
			prisma as unknown as PrismaService,
			orgComplianceRepository as unknown as OrganizationComplianceRepository,
			{} as CacheService,
		);
	});

	it.each([
		['oc_one', 'status_one', 0],
		['oc_one', 'status_two', 1],
		['oc_two', 'status_three', 2],
	] as const)('returns requested %s / %s within its parent', async (parentId, statusId, index) => {
		const result = await repository.getOrganizationComplianceStatusById(parentId, statusId, user, organization);

		expect(result).toEqual({ id: parentId, organization_id: 'org_one', statuses: [statuses[index]] });
		expect(prisma.organization_compliance.findUnique).toHaveBeenCalledTimes(1);
		expect(prisma.organization_compliance.findUnique).toHaveBeenCalledWith({
			where: { id: parentId },
			select: { id: true, organization_id: true, statuses: { where: { id: statusId } } },
		});
	});

	it.each(['status_missing', 'status_three'])('preserves an empty array when %s is absent from the parent', async statusId => {
		await expect(repository.getOrganizationComplianceStatusById('oc_one', statusId, user, organization)).resolves.toEqual({
			id: 'oc_one',
			organization_id: 'org_one',
			statuses: [],
		});
	});

	it('preserves the not-found error for an absent parent', async () => {
		await expect(repository.getOrganizationComplianceStatusById('oc_missing', 'status_one', user, organization)).rejects.toMatchObject({
			status: 404,
			response: { user, organization_compliance_id: 'oc_missing', organization, status_id: 'status_one' },
		});
	});

	it('propagates a parent lookup failure unchanged', async () => {
		const failure = new Error('database unavailable');
		prisma.organization_compliance.findUnique.mockRejectedValue(failure);
		await expect(repository.getOrganizationComplianceStatusById('oc_one', 'status_one', user, organization)).rejects.toBe(failure);
	});

	it('lists statuses using the organization-scoped compliance resolved by name', async () => {
		orgComplianceRepository.getOrgComplianceDefinitionByName.mockResolvedValue({ id: 'oc_one' });
		prisma.organization_compliance_statuses.findMany.mockResolvedValue(statuses.slice(0, 2));

		await expect(repository.getAllByOrgAndComplianceName('standard', user, organization)).resolves.toEqual(statuses.slice(0, 2));
		expect(orgComplianceRepository.getOrgComplianceDefinitionByName).toHaveBeenCalledWith('standard', user, organization);
		expect(prisma.organization_compliance_statuses.findMany).toHaveBeenCalledWith({ where: { organization_compliance_id: 'oc_one' } });
	});

	it('does not list statuses when the scoped parent is absent', async () => {
		orgComplianceRepository.getOrgComplianceDefinitionByName.mockResolvedValue(null);
		await expect(repository.getAllByOrgAndComplianceName('missing', user, organization)).rejects.toBeInstanceOf(NotFoundException);
		expect(prisma.organization_compliance_statuses.findMany).not.toHaveBeenCalled();
	});

	it('propagates a scoped parent resolution failure before listing statuses', async () => {
		const failure = new Error('parent lookup failed');
		orgComplianceRepository.getOrgComplianceDefinitionByName.mockRejectedValue(failure);
		await expect(repository.getAllByOrgAndComplianceName('standard', user, organization)).rejects.toBe(failure);
		expect(prisma.organization_compliance_statuses.findMany).not.toHaveBeenCalled();
	});
});
