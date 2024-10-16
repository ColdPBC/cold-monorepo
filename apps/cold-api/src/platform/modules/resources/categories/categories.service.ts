import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { detailedDiff, diff } from 'deep-object-diff';
import { isEmpty, isUUID } from 'class-validator';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, DarklyService, IRequest, MqttService, ObjectUtils, PrismaService, Tags, ZodCategoryDefinitionItemDto } from '@coldpbc/nest';
import { v4 } from 'uuid';
import { find, get, merge, omit } from 'lodash';

/**
 * @description This service is responsible for managing category definitions
 */
@Span()
@Injectable()
export class CategoriesService extends BaseWorker {
	test_orgs: Array<{ id: string; name: string; display_name: string }>;
	objectUtils = new ObjectUtils();

	constructor(readonly darkly: DarklyService, readonly prisma: PrismaService, /*readonly cache: CacheService,*/ readonly mqtt: MqttService) {
		super('CategoriesService');
	}

	override async onModuleInit() {
		await this.prisma.$connect();
		this.darkly.subscribeToJsonFlagChanges('dynamic-org-white-list', value => {
			this.test_orgs = value;
		});
	}

	/**
	 * Get Category Cache Key
	 * @param req
	 * @param {string} orgId
	 * @param {string} nameOrId
	 * @returns {string}
	 * @private
	 */
	private getCategoryCacheKey(req: IRequest, orgId?: string, nameOrId?: string) {
		const { user } = req;
		const keyName = isUUID(nameOrId) ? 'id' : 'name';
		// Return impersonated key
		if (orgId && user.isColdAdmin) {
			if (nameOrId) {
				return `organizations:${orgId}:category_definitions:${keyName}:${nameOrId}`;
			} else {
				return `organizations:${orgId}:category_definitions`;
			}
		}

		if (user.isColdAdmin) {
			if (nameOrId) {
				// Return root key with name
				return `organizations:${orgId}:category_definitions:${keyName}:${nameOrId}`;
			} else {
				// Return root key
				return `category_definitions`;
			}
		}

		// Return org keys
		if (nameOrId) {
			return `organizations:${user.coldclimate_claims.org_id}:category_definitions:${keyName}:${nameOrId}`;
		} else {
			return `organizations:${user.coldclimate_claims.org_id}:category_definitions`;
		}
	}

	/**
	 * Get Full Category Taxonomy
	 * @param req
	 * @param {boolean} bypassCache
	 * @param {string} orgId
	 * @returns {Promise<CategoryDefinitionDto>}
	 */
	async findFull(req: IRequest, bypassCache?: boolean, orgId?: string): Promise<ZodCategoryDefinitionItemDto> {
		const { user } = req;

		const categoryCacheKey = this.getCategoryCacheKey(req, orgId);

		// Return cached
		/*if (!bypassCache) {
			const cached: any = await this.cache.get(categoryCacheKey);

			if (cached) {
				return cached;
			}
		}*/

		const first = await this.prisma.category_definitions.findFirst({
			orderBy: {
				updated_at: 'desc',
			},
		});

		let merged: any;
		// Get Submission Results
		if ((user.isColdAdmin && orgId) || !user.isColdAdmin) {
			//ignore org passed into impersonateOrg if user is not cold admin
			const submission = await this.prisma.category_data.findFirst({
				where: {
					category_definition_id: first?.id,
					organization_id: user.isColdAdmin && orgId ? orgId : user.coldclimate_claims.org_id,
				},
			});

			if (!submission) {
				throw new NotFoundException(`Unable to find category submission with id: ${first?.id} & org: ${orgId}`);
			}

			merged = merge(first?.definition, submission.data);
		}

		//await this.cache.set(categoryCacheKey, first, { ttl: 1000 * 60 * 60, update: true });

		return merged || first;
	}

	/**
	 * @description This action returns a category definition key by name
	 * @param req
	 * @param name
	 * @param bypassCache
	 * @param orgId
	 */
	async findByName(req: IRequest, bypassCache?: boolean, orgId?: string, name?: string): Promise<ZodCategoryDefinitionItemDto | undefined> {
		if (isEmpty(name) || name == ':name') {
			throw new BadRequestException(`Name is required!`);
		}

		const categoryCacheKey = this.getCategoryCacheKey(req, orgId, name);

		/*if (!bypassCache) {
			const cached = (await this.cache.get(categoryCacheKey)) as ZodCategoryDefinitionItemDto;

			if (cached) {
				return cached;
			}
		}
*/
		const full = await this.findFull(req, bypassCache, orgId);
		const def = full.definition ? get(full.definition, `categories.${name}`) : get(full, `categories.${name}`);

		//await this.cache.set(categoryCacheKey, def, { ttl: 1000 * 60 * 60, update: true });

		if (!def || !get(def, 'definition.categories', name)) {
			throw new NotFoundException(`Unable to find category definition key by name: ${name}`);
		}

		return def;
	}

	/***
	 * This action stores org category results
	 * @param submission
	 * @param req
	 * @param impersonateOrg
	 */
	async submitResults(submission: any, req: IRequest, impersonateOrg?: string): Promise<ZodCategoryDefinitionItemDto> {
		const { user, url } = req;
		let result: any;
		let org; // = (await this.cache.get(`organizations:${user.isColdAdmin && impersonateOrg ? impersonateOrg : user.coldclimate_claims.org_id}`)) as any;
		if (!org) {
			org = await this.prisma.organizations.findUnique({
				where: {
					id: user.isColdAdmin && impersonateOrg ? impersonateOrg : user.coldclimate_claims.org_id,
				},
			});

			if (!org) {
				throw new NotFoundException(`Organization ${user.isColdAdmin && impersonateOrg ? impersonateOrg : user.coldclimate_claims.org_id} not found`);
			}
		}

		const tags: Tags = {
			organization: omit(org, ['branding', 'phone', 'street_address', 'created_at', 'updated_at']),
			user: user.coldclimate_claims,
			...this.tags,
		};

		try {
			const categoryCacheKey = this.getCategoryCacheKey(req, impersonateOrg);

			const def = (await this.prisma.category_definitions.findFirst({
				orderBy: {
					updated_at: 'desc',
				},
			})) as ZodCategoryDefinitionItemDto;

			if (!def) {
				throw new NotFoundException(`Unable to find any category definition`);
			}

			/*await this.cache.delete(categoryCacheKey);
			for (const key of Object.keys(submission.definition)) {
				await this.cache.delete(this.getCategoryCacheKey(req, impersonateOrg, key));
			}*/

			const existing = (await this.prisma.category_data.findFirst({
				where: {
					category_definition_id: def.id,
					organization_id: user.isColdAdmin && impersonateOrg ? impersonateOrg : user.coldclimate_claims.org_id,
				},
			})) as any;

			if (existing) {
				tags.submission_id = existing.id;
				tags.name = def.name;
				tags.status = 'update';

				const preOmit = detailedDiff(existing.data, submission.definition);
				const difference = omit(preOmit, ['id', 'created_at', 'updated_at', 'survey_definition_id', 'organization_id']);

				let newData = merge(existing.data, difference.added, difference.updated);

				// deletes keys in the deleted object from the newData object
				newData = this.objectUtils.deleteKeys(newData, null); //merge(newData, difference.deleted);
				result = await this.prisma.category_data.update({
					where: {
						id: existing.id,
					},
					data: { data: newData },
				});

				if (!find(this.test_orgs, { id: user.coldclimate_claims.org_id }))
					this.metrics.event(`Existing category definition: ${submission.name} data submitted`, `${org.display_name} submitted new category data for ${submission.name}`, tags);

				this.logger.info('updated category submission', difference);
			} else {
				const response = {
					id: v4(),
					created_at: new Date(),
					organization_id: user.isColdAdmin && impersonateOrg ? impersonateOrg : user.coldclimate_claims.org_id,
					category_definition_id: def.id,
					data: diff(def.definition, submission.definition),
				};

				result = await this.prisma.category_data.create({
					data: response,
				});

				if (!find(this.test_orgs, { id: user.coldclimate_claims.org_id })) {
					tags.status = 'new';
					tags.name = def.name;
					tags.submission_id = response?.id;

					this.metrics.event(`New ${submission.name} category data submitted`, `${org.display_name} submitted new category data for ${submission.name}`, tags);

					this.tracer.getTracer().dogstatsd.increment('cold.api.categories.submission', 1, tags);
				}

				this.logger.info('saved category submission', response);
			}

			this.mqtt.publishMQTT('ui', {
				org_id: user.coldclimate_claims.org_id,
				user: user,
				swr_key: url,
				action: 'create',
				status: 'complete',
				data: {
					...result,
				},
			});

			return await this.findFull(req, true, impersonateOrg);
		} catch (e) {
			tags.status = 'failed';
			tags.name = submission?.name;
			tags.submission_id = submission?.id;

			this.metrics.event(`${submission.name} category data submission failed`, `${org.display_name} new category data submission for ${submission.name} failed`, tags);

			this.tracer.getTracer().dogstatsd.increment('cold.api.categories.submission', 1, tags);

			this.mqtt.publishMQTT('ui', {
				org_id: user.coldclimate_claims.org_id,
				user: user,
				swr_key: url,
				action: 'create',
				status: 'failed',
				data: {
					...result,
					error: e.message,
				},
			});

			throw new UnprocessableEntityException(e);
		}
	}

	/***
	 * This action creates a new category definition
	 * @param req
	 * @param createCategoryDefinitionDto
	 */
	async create(req: IRequest, createCategoryDefinitionDto: any): Promise<ZodCategoryDefinitionItemDto> {
		const { user, url } = req;

		//const org = (await this.cache.get(`organizations:${user.coldclimate_claims.org_id}`)) as any;
		const tags: Tags = {
			name: createCategoryDefinitionDto.name,
			organization: req.organization,
			user: user.coldclimate_claims,
			...this.tags,
		};

		try {
			createCategoryDefinitionDto.created_at = new Date();

			// await this.categoryDefinitionValidator.validate(createCategoryDefinitionDto);

			// delete cached category definition
			//await this.cache.delete(this.getCategoryCacheKey(req));

			const existing = await this.prisma.category_definitions.findFirst({
				where: {
					name: createCategoryDefinitionDto.name,
				},
			});

			if (existing) {
				tags.id = existing.id;
				throw new BadRequestException(`A category definition with the name ${createCategoryDefinitionDto.name} already exists`);
			}

			const definition = (await this.prisma.category_definitions.create({
				data: createCategoryDefinitionDto,
			})) as ZodCategoryDefinitionItemDto;

			if (definition) {
				tags.id = definition.id;
			}

			this.logger.info('created category definition', definition);

			//rebuild cache async
			await this.findFull(req, true);

			tags.status = 'complete';

			this.metrics.event(
				`New category definition: ${createCategoryDefinitionDto?.name} completed `,
				`New category definition: ${createCategoryDefinitionDto?.name} completed`,
				tags,
			);

			this.tracer.getTracer().dogstatsd.increment('cold.api.categories.create', 1, tags);

			this.mqtt.publishMQTT('public', {
				swr_key: url,
				action: 'create',
				status: 'complete',
				data: {
					...definition,
				},
			});

			return definition;
		} catch (e) {
			if (e.message.includes('already exists') || e.message.includes('Unique constraint failed on the fields')) {
				throw new ConflictException(e, `A category definition with the name ${createCategoryDefinitionDto.name} already exists`);
			}

			tags.status = 'failed';

			this.metrics.event(`New category definition: ${createCategoryDefinitionDto?.name} failed `, `New category definition: ${createCategoryDefinitionDto?.name} failed`, tags);

			this.tracer.getTracer().dogstatsd.increment('cold.api.categories.create', 1, tags);

			this.mqtt.publishMQTT('public', {
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
	 * This action updates a category definition
	 * @param id
	 * @param updateSurveyDefinitionDto
	 * @param req
	 */
	async update(id: string, updateSurveyDefinitionDto: any, req: IRequest): Promise<ZodCategoryDefinitionItemDto> {
		const { user, url } = req;

		/*const org = (await this.cache.get(`organizations:${user.coldclimate_claims.org_id}`)) as any;
		 */
		const tags: Tags = {
			organization: req.organization,
			user: user.coldclimate_claims,
			...this.tags,
		};

		try {
			const def = await this.findFull(req, true);

			if (def) {
				tags.id = def.id;
				tags.name = def.name;
				//await this.cache.delete(this.getCategoryCacheKey(req));
			}

			const definition = await this.prisma.category_definitions.update({
				where: {
					name: id,
				},
				data: updateSurveyDefinitionDto,
			});

			if (!definition) {
				throw new NotFoundException(`Unable to find category definition by id: ${id}`);
			}

			this.logger.info('updated definition', definition);

			tags.status = 'complete';

			this.metrics.event(
				`Update category definition: ${updateSurveyDefinitionDto?.name} completed `,
				`New category definition: ${updateSurveyDefinitionDto?.name} completed`,
				tags,
			);

			this.tracer.getTracer().dogstatsd.increment('cold.api.categories.update', 1, tags);

			this.mqtt.publishMQTT('public', {
				swr_key: url,
				action: 'update',
				status: 'complete',
				data: {
					...updateSurveyDefinitionDto,
				},
			});

			return await this.findFull(req, true);
		} catch (e) {
			tags.status = 'failed';

			this.metrics.event(`Update category definition: ${updateSurveyDefinitionDto?.name} failed `, `New category definition: ${updateSurveyDefinitionDto?.name} failed`, tags);

			this.tracer.getTracer().dogstatsd.increment('cold.api.categories.update', 1, tags);

			this.mqtt.publishMQTT('public', {
				swr_key: url,
				action: 'update',
				status: 'failed',
				data: {
					error: e.message,
				},
			});

			throw new UnprocessableEntityException(e);
		}
	}
}
