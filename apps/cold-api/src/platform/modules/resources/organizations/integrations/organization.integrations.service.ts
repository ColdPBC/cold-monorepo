import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker, CacheService, ColdRabbitService, IRequest, MqttService, PrismaService } from '@coldpbc/nest';
import { get } from 'lodash';
import { EventService } from '../../../utilities/events/event.service';
import { OrganizationHelper } from '../helpers/organization.helper';
import { BackboneService } from './backbone/backbone.service';

@Injectable()
export class OrganizationIntegrationsService extends BaseWorker {
	constructor(
		readonly cache: CacheService,
		readonly mqtt: MqttService,
		readonly helper: OrganizationHelper,
		readonly prisma: PrismaService,
		readonly rabbit: ColdRabbitService,
		readonly broadcast: EventService,
		readonly backbone: BackboneService,
	) {
		super(OrganizationIntegrationsService.name);
	}

	/**
	 * Get Organization Integrations
	 *
	 * @param {AuthenticatedUser} user - The authenticated user.
	 * @param {string} orgId
	 * @param {boolean} bpc - Flag indicating whether to use cached data.
	 * @returns {Promise<any>} - A promise that resolves to the data retrieved from the integrations.
	 * @throws {Error} - If an error occurs during retrieval.
	 */
	async getOrganizationIntegrations(req: IRequest, orgId: string, bpc?: boolean): Promise<any> {
		const { user } = req;
		try {
			if (bpc) {
				const cached = await this.cache.get(`organizations:${orgId}:integrations`);
				if (cached) {
					this.logger.info('Returning cached data', { user, ...cached });
					return cached;
				}
			}

			const integrations = await this.prisma.integrations.findMany({
				where: {
					organization_id: bpc && user.isColdAdmin ? orgId : user.coldclimate_claims.org_id,
				},
				include: {
					organization: true,
					service_definition: true,
				},
			});

			await this.cache.set(`organizations:${orgId}:integrations`, integrations, { ttl: 60 * 60 * 24 });

			this.logger.info('Returning integrations', { user, integrations });

			return integrations;
		} catch (e: any) {
			this.logger.error(e.message, { user });
			throw new UnprocessableEntityException(e);
		}
	}

	async createFacilityIntegration(
		req: IRequest,
		orgId: string,
		locId: string,
		body: {
			service_definition_id: string;
			facility_id?: string;
			timeout?: number;
			metadata: any;
		},
	): Promise<any> {
		const { user, url } = req;
		try {
			const service = await this.prisma.service_definitions.findUnique({
				where: {
					name: 'cold-platform-bayou',
				},
			});

			if (!service || !get(service.definition, 'rabbitMQ.publishOptions.routing_key', false)) {
				throw new UnprocessableEntityException(`Service definition ${body.service_definition_id} not found.`);
			}

			const org = await this.prisma.organizations.findUnique({
				where: {
					id: user.isColdAdmin ? orgId : user.coldclimate_claims.org_id,
				},
				include: {
					integrations: true,
					facilities: true,
				},
			});

			if (!org) {
				throw new UnprocessableEntityException(`Organization ${orgId} is invalid.`);
			}

			let facility;

			if (locId) {
				facility = org.facilities.find(l => l.id === locId);
			} else {
				facility = org.facilities.find(l => l.address_line_1 === body.metadata?.address);
			}

			if (!facility) {
				throw new UnprocessableEntityException(`Facility not found for ${orgId}.`);
			}

			await this.rabbit.publish(
				get(service.definition, 'rabbitMQ.rpcOptions.routing_key', 'deadletter') as string,
				{
					data: {
						organization: org,
						facility_id: facility.id,
						service_definition_id: service.id,
						metadata: body.metadata,
						user: user,
					},
					from: 'cold.api',
					event: 'facility.integration.enabled',
				},
				{
					exchange: 'amq.direct',
					timeout: body.timeout || 5000,
				},
			);

			this.mqtt.publishMQTT('public', {
				swr_key: url,
				action: 'create',
				status: 'complete',
				data: {
					facility: facility,
					organization: org,
					service_definition: service,
					metadata: body.metadata,
				},
			});
		} catch (e: any) {
			this.logger.error(e.message, { user });

			this.mqtt.publishMQTT('public', {
				swr_key: url,
				action: 'create',
				status: 'failed',
				data: {
					error: e.message,
				},
			});

			throw e;
		}
	}

	/**
	 * Enable Integration For Organization
	 * @param req
	 * @param orgId
	 * @param body
	 */
	async enableIntegration(
		req: IRequest,
		orgId: string,
		body: {
			service_definition_id: string;
			timeout?: number;
			metadata: any;
		},
	): Promise<any> {
		const { user, url, organization } = req;
		try {
			const service = await this.prisma.service_definitions.findUnique({
				where: {
					id: body.service_definition_id,
				},
			});

			if (!service) {
				throw new UnprocessableEntityException(`Service definition ${body.service_definition_id} not found.`);
			}

			if (!get(service.definition, 'rabbitMQ.publishOptions.routing_key', false)) {
				this.logger.warn(`Service definition ${body.service_definition_id} does not have a routing key at path 'rabbitMQ.publishOptions.routing_key'`, { service });
			}

			const org = await this.helper.getOrganizationById(orgId, user);

			await this.broadcast.sendIntegrationEvent(
				false,
				'compliance.activated',
				{
					organization: organization,
					service_definition_id: service.id,
					metadata: body.metadata,
					user: user,
				},
				user,
				{
					exchange: 'amq.direct',
					timeout: body.timeout || 5000,
				},
			);

			this.logger.info(`Integration enabled for ${org.name} with service ${service.name}`, {
				user,
				org,
				service,
				metadata: body.metadata,
			});

			this.mqtt.publishMQTT('ui', {
				org_id: org.id,
				user: user,
				swr_key: url,
				action: 'update',
				status: 'complete',
				data: {
					service_definition: service,
					metadata: body.metadata,
				},
			});

			return { message: `Integration enable request for ${org.name} with service ${service.name} was added to the queue` };
		} catch (e: any) {
			this.mqtt.publishMQTT('public', {
				swr_key: url,
				action: 'create',
				status: 'failed',
				data: {
					error: e.message,
				},
			});

			this.logger.error(e.message, { user });
			throw e;
		}
	}

	/**
	 * Enable Integration For Organization
	 * @param req
	 * @param orgId
	 * @param body
	 */
	async triggerIntegration(
		req: IRequest,
		orgId: string,
		body: {
			api_key: string;
			timeout?: number;
		},
		skip: number,
		limit: number,
	): Promise<any> {
		const { user, url, organization } = req;
		this.logger.info(`Backbone integration triggered for ${organization.name}`, {
			user,
			organization,
		});

		await this.backbone.syncProducts(req, skip, limit);
	}

	async createIntegration(
		req: IRequest,
		orgId: string,
		body: {
			service_definition_id: string;
			timeout?: number;
			metadata: any;
		},
	): Promise<any> {
		const { user, url, organization } = req;
		try {
			const service = await this.prisma.service_definitions.findUnique({
				where: {
					id: body.service_definition_id,
				},
			});

			if (!service) {
				throw new UnprocessableEntityException(`Service definition ${body.service_definition_id} not found.`);
			}

			if (!get(service.definition, 'rabbitMQ.publishOptions.routing_key', false)) {
				this.logger.warn(`Service definition ${body.service_definition_id} does not have a routing key at path 'rabbitMQ.publishOptions.routing_key'`, { service });
			}

			const org = await this.helper.getOrganizationById(orgId, user);

			await this.broadcast.sendIntegrationEvent(
				false,
				'integration.enabled',
				{
					organization: organization,
					service_definition_id: service.id,
					metadata: body.metadata,
					user: user,
				},
				user,
				{
					exchange: 'amq.direct',
					timeout: body.timeout || 5000,
				},
			);

			this.logger.info(`Integration enabled for ${org.name} with service ${service.name}`, {
				user,
				org,
				service,
				metadata: body.metadata,
			});

			this.mqtt.publishMQTT('ui', {
				org_id: org.id,
				user: user,
				swr_key: url,
				action: 'create',
				status: 'complete',
				data: {
					service_definition: service,
					metadata: body.metadata,
				},
			});

			return { message: `Integration enable request for ${org.name} with service ${service.name} was added to the queue` };
		} catch (e: any) {
			this.mqtt.publishMQTT('public', {
				swr_key: url,
				action: 'create',
				status: 'failed',
				data: {
					error: e.message,
				},
			});

			this.logger.error(e.message, { user });
			throw e;
		}
	}
}
