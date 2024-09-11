import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../worker';
import { PrismaService } from '../prisma';
import { IAuthenticatedUser } from '../primitives';
import { claim_types, sustainability_attributes, organizations } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../utility';

@Injectable()
export class SustainabilityAttributesRepository extends BaseWorker {
	constructor(readonly prisma: PrismaService) {
		super(SustainabilityAttributesRepository.name);
	}

	async createClaim(org: organizations, user: IAuthenticatedUser, data: any) {
		const start = new Date();
		data.id = new Cuid2Generator(GuidPrefixes.Claims).scopedId;

		if (!data.name) {
			throw new BadRequestException('Claim name is required');
		}
		if (!data.type) {
			data.type = claim_types.INTERNAL;
		}

		const certification = this.prisma.sustainability_attributes.create({
			data: data,
		});

		this.logger.log(`Compliance Policy ${data.name} created`, { certification });

		this.sendMetrics('claims', 'cold-nest', 'created', 'completed', { sendEvent: true, start, tags: { organization: org, user, claims: certification } });

		return certification;
	}

	async createClaims(org: organizations, user: IAuthenticatedUser, data: any[]) {
		const start = new Date();
		data = data.map(d => {
			if (!d.name) {
				throw new BadRequestException('Compliance Policy name is required');
			}

			if (!d.type) {
				throw new BadRequestException('Compliance Policy type is required');
			}

			d.id = new Cuid2Generator(GuidPrefixes.OrganizationProduct).scopedId;

			return d;
		});

		const policies = this.prisma.sustainability_attributes.createMany({
			data: data,
		});

		this.sendMetrics('claims', 'cold-nest', 'batch.created', 'completed', { sendEvent: true, start, tags: { organization: org, user, claims: policies } });

		this.logger.log(`Created ${data.length} compliance policies`, { policies });

		return policies;
	}

	async updateClaim(org: organizations, user: IAuthenticatedUser, data: Partial<any>) {
		const start = new Date();
		data.metadata = data.metadata || null;

		const policy = this.prisma.sustainability_attributes.update({
			where: {
				id: data.id,
			},
			data: data,
		});

		this.logger.log(`Compliance policy ${data.name} updated`, { policy });

		this.sendMetrics('claims', 'cold-nest', 'updated', 'completed', { sendEvent: true, start, tags: { organization: org, user, claims: policy } });

		return policy;
	}

	async deleteClaim(org: organizations, user: IAuthenticatedUser, id: string) {
		const start = new Date();
		const policy = this.prisma.sustainability_attributes.delete({
			where: {
				id: id,
			},
		});

		this.logger.log(`Compliance Policy ${id} deleted`, { organization: org, user, policy });
		this.sendMetrics('claims', 'cold-nest', 'deleted', 'completed', { sendEvent: true, start, tags: { organization: org, user, claims: policy } });

		return policy;
	}

	async findAll() {
		const queryOptions = {
			select: {
				id: true,
				name: true,
				level: true,
				type: true,
				attribute_assurances: true,
			},
		};

		const certifications = await this.prisma.sustainability_attributes.findMany(queryOptions);

		if (!certifications || certifications.length === 0) {
			throw new NotFoundException(`No Certifications found`);
		}

		return certifications;
	}

	async findByType(org: organizations, user: IAuthenticatedUser, type: claim_types) {
		const queryOptions = {
			where: {
				type: type,
			},
			select: {
				id: true,
				name: true,
				level: true,
				type: true,
				organization_claims: true,
			},
		};

		const claims = await this.prisma.sustainability_attributes.findMany(queryOptions);

		if (!claims || claims.length === 0) {
			throw new NotFoundException(`No Certifications found`);
		}

		return claims;
	}

	async findOne(org: organizations, user: IAuthenticatedUser, filters?: { name?: string; id?: string }) {
		if (filters?.id || filters?.name) {
			const claim = await this.prisma.sustainability_attributes.findUnique({
				where: {
					id: filters.id,
					name: filters.name,
				},
				select: {
					id: true,
					name: true,
					type: true,
					level: true,
				},
			});

			if (!claim) {
				throw new NotFoundException({ filters, user }, `No Claim found`);
			}

			return claim;
		} else {
			throw new UnprocessableEntityException({ filters, user }, 'Must provide id or name');
		}
	}
}
