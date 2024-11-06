import { HttpService } from '@nestjs/axios';
import { ConflictException, HttpException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace'; // eslint-disable-next-line @nx/enforce-module-boundaries
import {
	OrganizationsRepository,
	Auth0Organization,
	Auth0TokenService,
	BaseWorker,
	CacheService,
	DarklyService,
	MqttService,
	PrismaService,
	Tags,
	IRequest,
	Cuid2Generator,
	GuidPrefixes,
} from '@coldpbc/nest';
import { get, kebabCase, merge, omit, pick, set } from 'lodash';
import { AxiosRequestConfig } from 'axios';
import { CreateOrganizationDto } from './dto/organization.dto';
import { organizations } from '@prisma/client';
import { IntegrationsService } from '../integrations/integrations.service';
import { EventService } from '../../utilities/events/event.service';

@Span()
@Injectable()
export class OrganizationService extends BaseWorker {
	options: AxiosRequestConfig<any>;
	httpService: HttpService;
	test_orgs: Array<{ id: string; name: string; display_name: string }>;
	openAI: any;

	constructor(
		readonly cache: CacheService,
		readonly utilService: Auth0TokenService,
		readonly darkly: DarklyService,
		readonly events: EventService,
		readonly integrations: IntegrationsService,
		readonly mqtt: MqttService,
		readonly prisma: PrismaService,
		readonly repository: OrganizationsRepository,
	) {
		super('OrganizationService');
		this.httpService = new HttpService();
	}

	//todo: remove this function
	private async syncOpenAIAssistants(org) {
		if (!this.openAI) {
			this.logger.error('OpenAI service definition not found');
		} else {
			let existing = await this.prisma.organizations.findUnique({
				where: {
					id: org.id,
				},
			});

			if (!existing) {
				existing = await this.prisma.organizations.create({
					data: {
						id: org.id,
						name: org.name,
						display_name: org.display_name,
						enabled_connections: {},
						branding: org.branding,
						created_at: new Date(),
					},
				});
			}

			const openAIAsst = await this.prisma.integrations.findFirst({
				where: {
					organization_id: org.id,
					service_definition_id: this.openAI?.id,
				},
			});

			if (this.openAI && !openAIAsst) {
				await this.events.sendAsyncEvent(get(this.openAI, 'definition.rabbitMQ.publishOptions.routing_key', 'deadletter'), 'organization.created', {
					organization: existing,
					service: this.openAI,
				});
			}
		}
	}

	override async onModuleInit() {
		/*this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
      this.test_orgs = value;
    });*/

		this.options = await this.utilService.init();

		// insure openai service is enabled for all organizations
		this.openAI = await this.prisma.service_definitions.findUnique({
			where: {
				name: 'cold-platform-openai',
			},
		});

		let orgs = (await this.getOrganizations(true, { user: { coldclimate_claims: { email: 'service_account' } } })) as Array<Auth0Organization>;

		if (!orgs || orgs.length === 0) {
			this.options = await this.utilService.init();

			// since no orgs exist in DB get any organizations from Auth0
			const response = await this.httpService.axiosRef.get(`/organizations`, this.options);
			orgs = response.data;

			const connections = await this.getConnections();

			for (const org of orgs) {
				const orgData = {
					id: org.id,
					name: org.name,
					enabled_connections: connections.map(con => {
						return {
							connection_id: con.id,
							assign_membership_on_login: false,
						};
					}),
					display_name: org.display_name,
					isTest: process.env['NODE_ENV'] !== 'production',
					created_at: new Date(),
				};

				await this.repository.create(orgData as any, { coldclimate_claims: { org_id: orgData.id, id: 'none', roles: ['cold:admin'], email: 'service_account' } } as any);

				// todo: remove this function
				//this.syncOpenAIAssistants(org);
			}
		}
	}

	/***
	 * Get all connections from Auth0
	 */
	async getConnections(): Promise<any> {
		let cons = await this.cache.get('auth0:connections');

		if (!cons) {
			this.options = await this.utilService.init(); // get auth0 token

			const response = await this.httpService.axiosRef.get(`/connections`, this.options);

			if (response.data) {
				cons = response.data;
				await this.cache.set('auth0:connections', response.data, {
					ttl: 0,
					update: true,
				});
			}
		}

		return cons;
	}

	/***
	 * Get all organizations from Auth0
	 * If proper filter is supplied it returns an Auth0Organization
	 * If no filter is supplied it returns an array of Auth0Organizations
	 */
	async getOrganizations(
		bpc = false,
		req: { user: any },
		filters?: {
			id?: string;
			name?: string;
			isTest?: boolean;
		} | null,
	): Promise<Array<Auth0Organization>> {
		const { user } = req;
		try {
			// if supplied, check filter has required properties
			if (filters && !filters.id && !filters.name && !filters.isTest) {
				this.logger.warn('invalid filter supplied, function will return array of all organizations', filters);

				filters = null;
			}

			let orgs: any;

			if (!bpc) {
				orgs = (await this.cache.get('organizations')) as Array<Auth0Organization>;
			}

			// No orgs found in cache, so get latest list from Auth0
			if (!orgs) {
				this.options = await this.utilService.init();

				// orgs = await this.httpService.axiosRef.get(`/organizations`, this.options);
				//const response = await this.httpService.axiosRef.get(`/organizations`, this.options);
			}

			orgs = await this.repository.findAll(user, filters);

			if (!orgs) {
				throw new NotFoundException(`No Organizations found`);
			}

			// return all orgs
			return orgs;
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	/***
	 * Get Organization by name or id
	 * @param nameOrId
	 * @param req
	 * @param bypassCache
	 */
	async getOrganization(nameOrId: string, req: IRequest, bypassCache = false): Promise<organizations> {
		const { user } = req;
		try {
			if (!nameOrId || nameOrId === ':name' || nameOrId === ':orgId') throw new UnprocessableEntityException(`Organization 'name' or 'id' is required`);

			let cached;
			if (!bypassCache) {
				cached = await this.cache.get(`organizations:${nameOrId}`);
			}

			if (cached) {
				return cached;
			} else {
				const filter = nameOrId.startsWith('org_') ? { id: nameOrId } : { name: nameOrId };

				let org = await this.repository.findOne(user, filter);
				if (org) {
					await this.cache.set(`organizations:${org.id}`, org, { ttl: 1000 * 60 * 60 * 24, update: true });
				} else {
					// if org not found in db, get from auth0

					this.options = await this.utilService.init();

					const response = await this.httpService.axiosRef.get(`/organizations/${nameOrId.startsWith('org_') ? nameOrId : 'name/' + nameOrId}`, this.options);

					if (!response.data) {
						throw new NotFoundException(`No Organizations found`);
					}

					org = response.data;
				}

				if (!org) {
					throw new NotFoundException(`Organization ${nameOrId} not found`);
				}
				if (!user.isColdAdmin && org.id !== user.coldclimate_claims.org_id) {
					throw new UnauthorizedException('You are not permitted to perform actions on this organization');
				}

				return org;
			}
		} catch (e) {
			this.logger.error(e, { nameOrId, user, bypassCache });
			if (e.response.status === 404) {
				throw new NotFoundException(`Organization ${nameOrId} not found`);
			} else {
				throw new HttpException(e.message, e.status);
			}
		}
	}

	async updateOrganization(orgId: string, org: Partial<CreateOrganizationDto>, req: IRequest): Promise<organizations> {
		const { user, url, organization } = req;
		try {
			this.logger.info('updating organization', { org, user });
			this.options = await this.utilService.init();

			// update org cache by name
			await this.cache.delete(`organizations:${organization.name}`);
			// update org cache by id
			await this.cache.delete(`organizations:${organization.id}`);

			const updated = await this.prisma.organizations.update({
				where: {
					id: orgId,
				},
				data: org,
			});
			// update org list cache
			await this.getOrganizations(true, req, { id: updated.id });

			this.mqtt.publishMQTT('cold', {
				swr_key: url,
				action: 'update',
				status: 'complete',
				data: {
					organization: updated,
				},
			});

			if (this.openAI) {
				await this.events.sendAsyncEvent(get(this.openAI, 'definition.rabbitMQ.publishOptions.routing_key', 'deadletter'), 'organization.updated', {
					organization: updated,
					service: this.openAI,
				});
			} else {
				this.logger.error('OpenAI service definition not found; website crawling will not run');
			}
			return updated;
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	/***
	 * Create an organization in Auth0
	 * @param org
	 * @param req
	 */
	async createOrganization(org: Partial<CreateOrganizationDto>, req: IRequest): Promise<Auth0Organization> {
		const { user, url } = req;
		try {
			this.logger.info('creating organization', { org, user });
			this.options = await this.utilService.init();

			const saved = await this.httpService.axiosRef.post(`/organizations`, org, this.options);

			// update org cache by name
			await this.cache.set(`organizations:${saved.data.name}`, saved.data, {
				update: true,
				ttl: 1000 * 60 * 60,
			});
			// update org cache by id
			await this.cache.set(`organizations:${saved.data.id}`, saved.data, {
				update: true,
				ttl: 1000 * 60 * 60,
			});

			// update org list cache
			await this.getOrganizations(true, req, { id: saved.data.id });

			this.mqtt.publishMQTT('cold', {
				swr_key: url,
				action: 'create',
				status: 'complete',
				data: {
					organization: saved.data,
				},
			});

			return saved.data;
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	/***
	 * Create a new Cold Organization
	 * @param org
	 * @param req
	 */
	async createColdOrg(org: Partial<CreateOrganizationDto>, req: IRequest): Promise<Partial<organizations>> {
		const { user, url } = req;
		// Name should be kebabCased
		const orgName = kebabCase(org.display_name);

		await this.cache.delete('organizations');

		const tags: Tags = {
			org_name: orgName,
			user: user.coldclimate_claims,
			...this.tags,
		};

		try {
			if (orgName != org.name) {
				org.name = orgName;
			}

			let existing: any | null;

			// search for existing organization by name
			existing = await this.repository.findOne(user, { name: orgName });

			if (existing) {
				throw new ConflictException(`organization ${existing.name} already exists in db`);
			}

			try {
				// search Auth0 for existing organization by name
				const auth0 = await this.httpService.axiosRef.get(`/organizations/name/${orgName}`, this.options);
				existing = auth0.data;
			} catch (e) {
				// if any error other than 404 is returned, throw error
				if (e.response.status !== 404) {
					throw e;
				}
			}
			// update cache just in case
			if (existing) {
				await this.cache.set(`organizations:${existing?.id}`, existing, {
					ttl: 0,
					update: true,
				});
				await this.cache.set(`organizations:${existing?.name}`, existing, { ttl: 1000 * 60 * 60, update: true });

				throw new ConflictException(`organization ${existing.name} already exists`);
			}

			// create new organization in Auth0
			const conResponse = await this.getConnections();

			//Set enabled auth0 connections
			set(
				org,
				'enabled_connections',
				conResponse.map(con => {
					return {
						connection_id: con.id,
						assign_membership_on_login: false,
					};
				}),
			);

			const auth0Org = await this.createOrganization(pick(org, ['name', 'display_name', 'enabled_connections', 'branding']), req);

			set(org, 'id', auth0Org.id);

			this.logger.log(`organization (${org.display_name}) created`, auth0Org);

			if (auth0Org.id) {
				tags.org_id = auth0Org.id;

				existing = await this.repository.create(org as any, user);

				const platformIntegrations = await this.prisma.service_definitions.findMany({
					where: {
						type: 'platform',
					},
				});

				for (const int of platformIntegrations) {
					await this.prisma.integrations.create({
						data: {
							id: new Cuid2Generator(GuidPrefixes.Integrations).scopedId,
							organization_id: existing.id,
							service_definition_id: int.id,
							metadata: {},
						},
					});
				}

				await this.cache.set(`organizations:${auth0Org.id}`, auth0Org, {
					update: true,
				});
				await this.cache.set(`organizations:${auth0Org.name}`, auth0Org, {
					update: true,
				});

				this.logger.info(`persisted organization (${auth0Org.display_name}) in DB`, auth0Org);
			}

			this.metrics.increment('cold.api.organizations.create', tags);

			if (this.openAI) {
				await this.events.sendAsyncEvent(get(this.openAI, 'definition.rabbitMQ.publishOptions.routing_key', 'deadletter'), 'organization.created', {
					organization: existing,
					service: this.openAI,
				});
			} else {
				this.logger.error('OpenAI service definition not found; unable to create assistant for new organization');
			}

			this.mqtt.publishMQTT('cold', {
				swr_key: url,
				action: 'create',
				status: 'complete',
				data: {
					organization: auth0Org,
				},
			});

			return (await this.prisma.organizations.findUnique({
				where: {
					id: existing.id,
				},
				include: {
					facilities: true,
					integrations: true,
				},
			})) as organizations;
		} catch (e) {
			tags.status = 'failed';

			this.metrics.event(`New organization creation failed`, `${user.coldclimate_claims.email}'s request to create a new organization for ${org.display_name} failed`, tags);

			this.tracer.dogstatsd.increment('cold.api.organizations.create', 1, tags);

			this.logger.error(e, { org, e });

			this.mqtt.publishMQTT('cold', {
				swr_key: url,
				action: 'create',
				status: 'failed',
				data: {
					error: e.message,
				},
			});

			throw new UnprocessableEntityException(e.message, e);
		}
	}

	/***
	 * Delete an organization in Auth0
	 * @param org
	 * @param req
	 */
	async deleteOrganization(org: any, req: IRequest) {
		const { user, url, organization } = req;

		try {
			try {
				org = await this.getOrganization(org.id, req, false);
			} catch (e) {
				if (e.status !== 404) {
					throw e;
				}
			}

			if (org.name.startsWith('cold-climate')) {
				throw new UnprocessableEntityException('Cannot delete an organization with name Cold-Climate');
			}

			this.tags = merge(this.tags, {
				organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
				user: user.coldclimate_claims,
				status: 'started',
			});

			// delete org from auth0
			try {
				await this.cache.delete(`organizations`);

				this.options = await this.utilService.init();
				await this.httpService.axiosRef.delete(`/organizations/${org.id}`, this.options);

				this.logger.info(`organization ${org.id} deleted from auth0`);
			} catch (e) {
				if (e.response.status !== 404) {
					set(this.tags, 'status', 'failed');

					this.metrics.event(
						`Delete organization failed`,
						`${user.coldclimate_claims.email}'s request to delete organization for ${org.display_name} failed`,
						{
							alert_type: 'error',
							date_happened: new Date(),
							priority: 'normal',
						},
						this.tags,
					);

					this.metrics.increment('cold.api.organizations.delete');

					this.logger.error(e, { ...e.response?.data });
					// continue if Auth0 begins rate limiting
					if (e.response.status !== 429) {
						throw new UnprocessableEntityException(e.message, e.response?.data);
					}
				}
			}

			// delete org assistant from openAI
			try {
				const serviceReponses = await this.events.sendIntegrationEvent(true, 'organization.deleted', { organization: org }, req);

				this.logger.info(`organization ${org.id} deleted response received from services`, serviceReponses);
			} catch (e) {
				this.logger.error(e.message, { ...e.response?.data });
			}

			// if org not found in db and the function was called with an org name throw error
			if (!org.id.includes('org_') && !org?.id) {
				// org not found in db

				throw new HttpException(
					`Unable to find org name: ${org.id} in the database.  To insure this gets deleted from auth0, you must call this route again with the org id instead of name`,
					404,
				);
			}

			if (org) {
				try {
					// delete org from db
					await this.prisma.organizations.delete({
						where: {
							id: org.id,
						},
					});

					this.logger.info(`organization ${org.id} deleted from db`);
				} catch (e) {
					if (!e.message.includes('Record to delete does not exist')) {
						this.logger.error(e.message, { ...e.response?.data });
					}
					this.logger.info(`organization ${org.id} not found in db`);
				}
			}

			// delete org from cache
			await this.cache.delete(`organizations:${org.id}:members`);
			await this.cache.delete(`organizations:${org.id}:invitations`);

			this.mqtt.publishMQTT('cold', {
				swr_key: url,
				action: 'delete',
				status: 'complete',
			});
		} catch (e) {
			this.logger.error(e.message, { ...e.response?.data });
			this.mqtt.publishMQTT('cold', {
				swr_key: url,
				action: 'delete',
				status: 'failed',
				data: {
					error: e.message,
				},
			});

			throw e;
		}
		await this.getOrganizations(true, req, { id: org.id });

		set(this.tags, 'status', 'completed');

		this.metrics.increment('cold.api.organizations.delete', this.tags);
		throw new HttpException(`Organization ${org.id} deleted`, 204);
	}
}
