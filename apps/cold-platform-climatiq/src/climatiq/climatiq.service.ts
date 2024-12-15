import { Injectable } from '@nestjs/common';
import { BaseWorker, ColdRabbitService, PrismaService } from '@coldpbc/nest';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { merge, pick, set } from 'lodash';
import { material_classification, materials } from '@prisma/client';

export type EnergyPayload = {
	emission_factor: {
		activity_id: string;
		data_version?: string;
		region?: string;
	};
	parameters: {
		energy: number;
		energy_unit: string;
	};
};

@Injectable()
export class ClimatiqService extends BaseWorker {
	axiosConfig: AxiosRequestConfig;
	energyPayload: EnergyPayload;
	core_material_response_schema: any;
	climatiq_activity_response_schema: any;
	sectorList = ['Consumer Goods and Services', 'Transport', 'Land Use', 'Materials and Manufacturing', 'Waste'];

	core_materials: material_classification[];

	constructor(private readonly config: ConfigService, private readonly axios: HttpService, private readonly prisma: PrismaService, readonly rabbit: ColdRabbitService) {
		super(ClimatiqService.name);

		this.axiosConfig = {
			headers: {
				Authorization: `Bearer ${this.config.get('CLIMATIQ_API_KEY')}`,
			},
		};

		this.init();

		this.energyPayload = {
			emission_factor: {
				activity_id: 'electricity-supply_grid-source_residual_mix',
				data_version: '^1',
				region: 'US',
			},
			parameters: {
				energy: 0,
				energy_unit: 'kWh',
			},
		};
	}

	async init() {
		this.core_materials = await this.prisma.material_classification.findMany();

		this.core_material_response_schema = {
			$schema: 'http://json-schema.org/draft-07/schema#',
			type: 'object',
			properties: {
				material_description: {
					type: 'string',
					description: 'The description of the material that can be used by the climatiq AI model to match raw materials to activity ids.',
				},
				reasoning: {
					type: 'string',
					description: 'The reasoning behind the selection of the core_material_name',
				},
				climatiq_category: {
					type: 'string',
					description: 'The climatiq category that is a best match for the material and material category/subcategory',
				},
				core_material_name: {
					type: 'enum',
					enum: this.core_materials.map(mat => mat.name),
					description: 'The name of the selected core material type',
				},
			},
			required: ['material_description', 'core_material_name', 'climatiq_category'],
		};

		this.climatiq_activity_response_schema = {
			$schema: 'http://json-schema.org/draft-07/schema#',
			type: 'object',
			properties: {
				climatiq_activity_id: {
					type: 'string',
					description: 'The best climatiq activity Id that matches the material and climatiq category',
				},
				reasoning: {
					type: 'string',
					description: 'The reasoning behind the selection of the climatiq activity Id',
				},
			},
			required: ['climatiq_category', 'reasoning'],
		};

		this.climatiq_activity_response_schema = {
			$schema: 'http://json-schema.org/draft-07/schema#',
			type: 'object',
			properties: {
				activity_name: {
					type: 'string',
					description: 'The climatiq activity_id that matches the material name',
				},
				reasoning: {
					type: 'string',
					description: 'The reasoning behind the selection of the activity_id',
				},
			},
			required: ['activity_name', 'reasoning'],
		};
	}

	async getEmissionEstimate(data: EnergyPayload) {
		const response = await this.axios.axiosRef.post('/estimate', data, this.axiosConfig);

		if (!response?.data) {
			return null;
		}

		const emission = response.data;

		return emission;
	}

	async getComputeMetadata() {
		return this.axios.get('/compute', this.axiosConfig);
	}

	async syncSectorCategories(req: any, sector: string, region = 'GLOBAL', category?: string, version?: string): Promise<void> {
		if (!sector) {
			for (const sectorKey of this.sectorList) {
				await this.syncSectorCategories(req, sectorKey, region, category, version);
			}
			return;
		}

		const dataVersion = version || '^19';
		const params = { sector, category, data_version: dataVersion, page: 1, region, source: 'EPA' };
		const endpoint = '/search';

		try {
			await this.syncPagedActvities(endpoint, params);
		} catch (e: any) {
			this.logger.error(e.message);
		}
	}

	async getProductCategories(req: any): Promise<string> {
		const { organization } = req;
		const system_prompt = `You are an assistant who is an expert in the manufacturing of consumer apparel and accessories and has deep knowledge of the Climatiq API.`;

		const user_prompt = `What types of products does ${
			organization.display_name || organization.name
		} manufacture?  Your response must be formatted as a comma separated list of product categories only.`;

		const openAiResponse = await this.rabbit.request(
			'cold.platform.openai.rpc',
			{
				event: 'openai_question.sent',
				from: 'cold.platform.climatiq',
				data: {
					system_prompt,
					question: user_prompt,
					schema: this.core_material_response_schema,
				},
			},
			{ timeout: 30000 },
		);

		if (!openAiResponse) {
			throw new Error('OpenAI response is empty');
		}

		this.logger.info(`Received OpenAi Mapping Response`, { openAiResponse });

		return openAiResponse;
	}

	async mapOrgMaterialActivities(req: any, material?: any): Promise<void> {
		try {
			if (!material) {
				const materials = (await this.prisma.materials.findMany({
					select: {
						id: true,
						name: true,
						description: true,
						material_category: true,
						material_subcategory: true,
						organization_id: true,
						product_materials: {
							select: {
								product: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
					},
				})) as any[];

				for (const material of materials) {
					await this.mapOrgMaterialActivities(req, material);
				}
				return;
			}

			this.logger.info(`Mapping activities for material ${material.name} using OpenAI`, material);

			const system_prompt = `You are an assistant who is an expert in the manufacturing of consumer apparel and accessories and has deep knowledge of the Climatiq API.`;

			let product_string = '';

			// Include all product_materials relationships
			if (Array.isArray(material.product_materials) && material.product_materials.length > 0) {
				product_string = material.product_materials.map(item => item.product.name).join(', ');
			}

			// Use product name if only an object
			if (!product_string && material.product_materials?.product?.name) {
				product_string = material.product_materials.product.name;
			} else if (!product_string) {
				// If no product materials, ask Ai for product categories for that organization
				product_string = await this.getProductCategories(req);
			}

			const categories = await this.prisma.climatiq_actvities.findMany({
				distinct: ['category'],
			});

			const user_prompt = `I will provide you with the name, category and sub-category of a raw material used in the production of ${
				product_string ? product_string : 'consumer apparel products (ie: bags, shoes, boots, pants, jackets, sweaters, etc)'
			} and I would like you to take the following steps: 
			1. Analyze the material information provided with your deep understanding of materials and manufacturing processes to determine the core_material_name that best represents the material considering the following factors:
			    - the type of product being manufactured ${product_string ? `: ${product_string}` : ': consumer apparel products (ie: bags, shoes, boots, pants, jackets, sweaters, etc)'}
			    - the composition of the raw material (e.g. cotton, polyester, nylon, polypropalene etc.)
			    - the process used to manufacture the material. 
			    - keep in mind that since the material is used in the production of ${
						product_string ? `: ${product_string}` : 'consumer apparel products'
					} it is likely to be a synthetic or natural fiber, or a blend of both and is likely some form of textile, plastic, or metal.
			2. Use this information to select the appropriate core_material name from the following list: ${this.core_material_response_schema.properties.core_material_name['enum']}.
			3. Use this information to select the appropriate climatiq_category from the following list: ${categories.map(cat => cat.category).join(', ')}.  
			3. You should also use the information provided to you to generate a concise description of the material, only including details regarding the material's most likely composition.
			4. Provide your reasoning for selecting the core_material_name and description.
			
			material_name: ${material.name}
			material_category: ${material.material_category}
			material_subcategory: ${material.material_subcategory}
			`;

			const openAiResponse = await this.rabbit.request(
				'cold.platform.openai.rpc',
				{
					event: 'openai_question.sent',
					from: 'cold.platform.climatiq',
					data: {
						system_prompt,
						question: user_prompt,
						schema: this.core_material_response_schema,
					},
				},
				{ timeout: 45000 },
			);

			if (!openAiResponse) {
				throw new Error('OpenAI response is empty');
			}

			this.logger.info(`Received OpenAi Mapping Response`, { openAiResponse });

			const activities = await this.prisma.climatiq_actvities.findMany({
				distinct: ['name'],
				where: {
					category: openAiResponse.climatiq_category,
					unit_type: 'Weight',
				},
				select: {
					name: true,
					activity_id: true,
					unit: true,
					unit_type: true,
				},
			});

			const climatiq_activity_prompt = `Using only the activity names provided to you, select the best climatiq activity that is best matched by the material_name and climatiq category. Provide your reasoning for selecting the activity_id.  Activities: ${activities
				.map(act => act.name)
				.join(', ')}`;

			const climatiqResponse = await this.rabbit.request(
				'cold.platform.openai.rpc',
				{
					event: 'openai_question.sent',
					from: 'cold.platform.climatiq',
					data: {
						system_prompt,
						question: climatiq_activity_prompt,
						schema: this.climatiq_activity_response_schema,
					},
				},
				{ timeout: 30000 },
			);

			if (!climatiqResponse) {
				throw new Error('OpenAI response is empty');
			}

			this.logger.info(`Received OpenAi Mapping Response`, { climatiqResponse });

			const selected_activity = activities.find(act => act.name === climatiqResponse?.activity_name);
			if (!selected_activity) {
				throw new Error('Activity not found');
			}

			const estimate_params: any = {};

			set(estimate_params, `${selected_activity.unit_type.toLowerCase()}`, 1);

			set(estimate_params, `${selected_activity.unit_type.toLowerCase()}_unit`, selected_activity.unit);

			const params = {
				emission_factor: {
					activity_id: selected_activity.activity_id,
					data_version: '^19',
				},
				parameters: estimate_params,
			};

			const endpoint = '/estimate';

			const response = await this.axios.axiosRef.post(endpoint, params, this.axiosConfig);

			this.logger.info(`Received Climatiq Mapping Response`, { climatiq_response: response.data });

			if (response?.data) {
				if (!material.name) {
					throw new Error('Material name is required');
				}
				await this.persistMaterialActivityResponseData(material, response.data, openAiResponse);
			}
		} catch (e: any) {
			this.logger.error(e.message);
		}
	}

	private async syncPagedActvities(endpoint: string, params: any): Promise<void> {
		let hasNextPage = true;
		let page = 1;

		while (hasNextPage) {
			this.logger.info(`Syncing sector categories for ${params.sector} - page ${page}`, params);

			const response = await this.axios.axiosRef.get(endpoint, {
				headers: this.axiosConfig.headers,
				params: { ...params, page },
			});

			const data = response.data;
			hasNextPage = page < data.last_page;

			if (data.results) {
				await this.persistActivityResponseData(data.results, params);
			}

			page++;
		}
	}

	private async persistMaterialActivityResponseData(material: materials, activity: any, openai: any): Promise<void> {
		const result = await this.prisma.materials.update({
			where: { id: material.id },
			data: {
				metadata: merge({}, material.metadata, { autopilot_response: activity }, { openai_response: openai }),
				activity_id: activity?.estimate?.emission_factor?.activity_id,
				data_source: activity?.estimate?.emission_factor?.source,
				emissions_factor: material.emissions_factor ? material.emissions_factor : activity?.estimate?.co2e,
				ai_description: openai.material_description,
			},
		});

		this.logger.info(`Mapped ${activity.estimate.emission_factor.name} to ${material.name}`, { ...pick(activity.estimate, ['emission_factor']), material: result });
	}

	private async persistActivityResponseData(results: any[], params: any): Promise<void> {
		for (const item of results) {
			if (item.sector === params.sector) {
				const activity = await this.prisma.climatiq_actvities.upsert({
					where: { id: item.id },
					update: { ...item },
					create: { ...item },
				});

				this.logger.info(`Synced sector category ${activity.name}`, { ...pick(activity, ['activity_id', 'sector', 'name']), params });
			}
		}
	}
}
