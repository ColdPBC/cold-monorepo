import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../worker';
import { PrismaService } from '../../prisma';
import { IAuthenticatedUser } from '../../primitives';
import { organization_facilities, organizations } from '@prisma/client';
import { omit } from 'lodash';
import { Cuid2Generator, GuidPrefixes } from '../../utility';

@Injectable()
export class SuppliersRepository extends BaseWorker {
	base_query = {
		id: true,
		name: true,
		address_line_1: true,
		address_line_2: true,
		city: true,
		state_province: true,
		postal_code: true,
		country: true,
		metadata: true,
	};

	constructor(readonly prisma: PrismaService) {
		super(SuppliersRepository.name);
	}

	async createSupplier(org: organizations, user: IAuthenticatedUser, data: Partial<organization_facilities>) {
		if (!data.name) {
			throw new UnprocessableEntityException({ data, user }, 'Must provide a name');
		}
		const [supplier] = await Promise.all([
			this.prisma.organization_facilities.create({
				data: {
					id: new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId,
					name: data.name,
					supplier: true,
					supplier_tier: data.supplier_tier || 2,
					organization_id: org.id,
					created_at: new Date(),
					updated_at: new Date(),
					metadata: {},
					...omit(data, ['metadata']),
				},
			}),
		]);

		return supplier;
	}

	async findByPartialName(org: organizations, user: IAuthenticatedUser, name: string) {
		const queryOptions = {
			where: {
				organization_id: org.id,
				supplier: true,
			},
			select: this.base_query,
		};

		const suppliers = await this.prisma.organization_facilities.findMany(queryOptions);

		if (!suppliers || suppliers.length === 0) {
			throw new NotFoundException(`No suppliers found`);
		}

		const matched = suppliers.filter(supplier => {
			const matchedName = name.slice(0, 7).toLowerCase().replace(/[,.]/g, '');
			const supplierName = supplier.name.slice(0, matchedName.length).toLowerCase().replace(/[,.]/g, '');

			return matchedName === supplierName;
		});

		return matched ? matched : null;
	}

	async findAll(org: organizations, user: IAuthenticatedUser) {
		const queryOptions = {
			where: {
				organization_id: org.id,
				supplier: true,
			},
			select: this.base_query,
		};

		const suppliers = await this.prisma.organization_facilities.findMany(queryOptions);

		if (!suppliers || suppliers.length === 0) {
			throw new NotFoundException(`No suppliers found`);
		}

		return suppliers;
	}

	async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
		if (filters?.id || filters?.name) {
			const query: any = {
				where: {
					id: filters.id,
					supplier: true,
					organization_id: org.id,
				},
				select: this.base_query,
			};

			if (filters.name) {
				delete query.where['id'];
				query.where = {
					orgFacilityName: {
						organization_id: org.id,
						name: filters.name,
					},
				};
				query.where['name'] = filters.name;
			}

			const supplier = await this.prisma.organization_facilities.findUnique(query);

			if (!supplier) {
				throw new NotFoundException({ filters, user }, `No Certification found`);
			}

			return supplier;
		} else {
			throw new UnprocessableEntityException({ filters, user }, 'Must provide id or name');
		}
	}

	async getSupplierClaimNames(org: organizations, user: IAuthenticatedUser) {
		try {
			const list = await this.prisma.organization_claims_view.findMany({
				distinct: ['claim_name'],
				where: {
					organization_name: org.name,
					supplier: true,
				},
				select: {
					claim_name: true,
				},
			});

			if (!list || list.length === 0) {
				throw new NotFoundException(`No Claims found`);
			}

			return list;
		} catch (e) {
			console.error(e.message, { stack: e.stack, organization: org, user });

			if (e.code == 'P2025') {
				throw new NotFoundException({ organization: org, user }, e.message);
			}

			throw e;
		}
	}

	async getOrgClaimList(org: organizations, user: IAuthenticatedUser) {
		try {
			const list = await this.prisma.organization_claims_view.findMany({
				where: {
					organization_name: org.name,
					supplier: true,
				},
				select: {
					facility_id: true,
					facility_name: true,
					address_line_1: true,
					address_line_2: true,
					city: true,
					state_province: true,
					postal_code: true,
					country: true,
					claim_id: true,
					claim_name: true,
					claim_level: true,
					claim_type: true,
					organization_file_id: true,
					organization_file_name: true,
					organization_file_type: true,
					mimetype: true,
					expires_at: true,
					effective_start_date: true,
					effective_end_date: true,
				},
			});

			if (!list || list.length === 0) {
				throw new NotFoundException(`No Claims found`);
			}

			return list;
		} catch (e) {
			console.error(e.message, { stack: e.stack, organization: org, user });

			if (e.code == 'P2025') {
				throw new NotFoundException({ organization: org, user }, e.message);
			}

			throw e;
		}
	}
}
