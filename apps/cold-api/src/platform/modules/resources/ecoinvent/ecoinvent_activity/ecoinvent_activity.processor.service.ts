import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { BaseWorker, CacheService, Cuid2Generator, EventService, GuidPrefixes, PrismaService, S3Service } from '@coldpbc/nest';
import { EcoinventImportProcessorService } from '../ecoinvent_import.processor.service';
import { pick, set } from 'lodash';
import { ProductCarbonFootprintCalculator } from './pcf_calculator';
import { getCalculatedWeight } from './yield_to_weight.service';

@Injectable()
@Processor('ecoinvent:activity')
export class EcoinventActivityProcessorService extends BaseWorker {
	pcfc: ProductCarbonFootprintCalculator;
	ecoinventClassificationNames: any[];

	constructor(readonly s3: S3Service, readonly events: EventService, readonly prisma: PrismaService, readonly cache: CacheService) {
		super(EcoinventImportProcessorService.name);
	}

	override async onModuleInit(): Promise<void> {
		await super.onModuleInit();
		await this.setEcoinventClassifications();
	}

	/**
	 * This function retrieves all ecoinvent classifications from the database and stores them in a local array.
	 * @private
	 */
	private async setEcoinventClassifications() {
		const ecoinventClassifications = await this.prisma.ecoinvent_classifications.findMany({
			where: {
				system: 'ISIC rev.4 ecoinvent',
			},
			select: {
				id: true,
				name: true,
				description: true,
			},
		});

		// remove the id from each classification object in the array and return a new array to reduce token count
		this.ecoinventClassificationNames = ecoinventClassifications.map(classification => pick(classification, ['name']));
	}

	/**
	 * This function retrieves material classifications from the database to send as context to openAi in order to classify a material,
	 * logs the response, updates the material with the assigned classification in the database, and returns the assigned classification.
	 * @param material
	 * @param user
	 * @param organization
	 */
	async assignColdPlatformMaterialClassification(material: any, user, organization): Promise<any> {
		const material_classifications = await this.prisma.material_classification.findMany({
			select: {
				id: true,
				name: true,
				material_ecoinvent_classifications: true,
				core_classification: {
					select: {
						name: true,
					},
				},
			},
		});

		const material_classifications_schema = {
			type: 'object',
			properties: {
				name: {
					type: 'string',
					description: 'The name of the material classification',
				},
			},
			required: ['name'],
			additionalProperties: false,
		};

		if (!material_classifications || material_classifications.length < 1) {
			this.logger.error(`No material classifications found for material: ${material.name}`, { material, organization, user });
			throw new Error(`No material classifications found for material: ${material.name}`);
		}

		const classification = await this.events.sendRPCEvent(
			'cold.platform.openai.rpc',
			'openai_question.sent',
			{
				user,
				organization,
				system_prompt: `You are an expert in manufacturing processes with deep understanding all the processes necessary to produce a raw material and finished good.  The user will provide a material name or description.  Your job is search through the provided classification array and select classification that best fits the material.
						classifications: ${JSON.stringify(material_classifications.map(classification => classification.name))}
						`,
				question: `${material.name}: ${material.description}`,
				schema: material_classifications_schema,
				strict: true,
				model: 'gpt-4o',
			},
			{ timeout: 120000 },
		);

		this.logger.info(`Received material classification response`, {
			classification,
			organization,
			material,
			user,
		});

		if (!classification.name) {
			this.logger.error(`No material classification found for material: ${material.name}`, { material, organization, user });
			throw new Error(`No material classification found for material: ${material.name}`);
		}

		const selected_classification = material_classifications.find(item => item.name === classification.name);
		await this.prisma.materials.update({
			where: {
				id: material.id,
			},
			data: {
				material_classification_id: selected_classification?.id,
			},
		});

		return selected_classification;
	}

	@Process('classify_product')
	async classifyProduct(job: any): Promise<any> {
		try {
			this.logger.log(`Processing job: ${job.id}`);

			this.pcfc = new ProductCarbonFootprintCalculator();

			const { organization, product, user } = job.data;

			const materials = await this.getProductMaterials(product, organization, user);

			// Iterate over materials and match them to Ecoinvent activities.
			for (const productMaterial of materials) {
				if (job.data.reclassifyMaterials && product.use_for_material_classifications) {
					await this.findEcoinventClassifications(productMaterial.material, product, user, organization, job.data.clearClassification);
				}

				await this.estimate_weights(productMaterial, product, organization, user);

				const material = productMaterial.material;

				try {
					if (!material?.material_classification?.material_ecoinvent_classifications || material?.material_classification?.material_ecoinvent_classifications?.length === 0) {
						this.logger.warn(`No ecoinvent classifications found for material: ${material.name}`, { material, organization, product, user });
						continue;
					}

					// get the ecoinvent activities that match the material classifications
					const ecoinvent_activities = await this.get_activities_by_classifications(
						material?.material_classification?.material_ecoinvent_classifications,
						material,
						organization,
						product,
						user,
					);

					if (!ecoinvent_activities || ecoinvent_activities.length === 0) {
						this.logger.warn(`No ecoinvent activities found for material: ${material.name}`, { material, organization, product, user });
						continue;
					}

					const material_classification_string = await this.determineMaterialCategory(material, organization, product, user);

					// use openAi to classify the ecoinvent activities for the material
					const material_classification_response = await this.getMaterialActivityClassificationResponse(
						material_classification_string,
						material,
						ecoinvent_activities,
						product,
						user,
						organization,
					);

					// If nothing is returned from openAi, continue to the next material since we cannot calculate the total CO2e for the material without a
					// list of ecoinvent activities.
					if (!material_classification_response) {
						continue;
					}

					// If no ecoinvent activities are found, continue to the since we cannot calculate the total CO2e for the material.
					if (!Array.isArray(material_classification_response.ecoinvent_activities) || material_classification_response.ecoinvent_activities.length < 1) {
						this.logger.error(`No ecoinvent activities found for material: ${material.name}`, { material, organization, product, user });
						continue;
					}

					// Iterate over the ecoinvent activities and calculate the total CO2e for the material.
					for (const activity of material_classification_response.ecoinvent_activities) {
						// find the actual ecoinvent activity identified by openAi from the db by name
						const ecoinvent_activity = await this.getEcoinventActivityByName(activity.name);

						// If activity specified by openAi is not found, continue with next activity since we cannot calculate the total CO2e without it.
						if (!ecoinvent_activity) {
							this.logger.error(`Ecoinvent activity not found: ${activity}`, { activity, material, organization, product, user });
							continue;
						}

						const emFactor = await this.processEmissionFactorsForActivity(ecoinvent_activity, organization, user);

						// If no emission factor is found, continue since we cannot calculate the total CO2e for the material.
						if (!emFactor) {
							continue;
						}

						//link material to emission factor and ecoinvent activity
						await this.upsertMaterialEmissionFactors(material, emFactor, ecoinvent_activity, organization, user);

						// Calculate the total CO2e for the material and update the product material.
						if (productMaterial?.weight) {
							await this.calculateAndPersistMaterialEmissions(productMaterial, ecoinvent_activity, organization, user);
						}
					}
				} catch (e) {
					this.logger.error(`Error processing material: ${material.name}`, { error: e, material });
					throw e;
				}
			}

			const total_co2e = this.pcfc.calculateTotal();

			await this.updateProductCarbonFootprint(total_co2e, product, organization, user);

			return {};
		} catch (error) {
			this.logger.error(`Error processing product emissions job: ${error.message}`, { job, ...error });
			throw error;
		}
	}

	private async updateProductCarbonFootprint(total_co2e: number, product, organization, user) {
		if (isNaN(total_co2e)) {
			const breakdown = this.pcfc.getBreakdown();
			this.logger.info(`Product carbon footprint calculated: ${total_co2e} KgCO2e`, { product, organization, user });
			this.logger.info(`Product carbon footprint breakdown: ${breakdown}`, { product, organization, user });

			await this.prisma.products.update({
				where: {
					id: product.id,
				},
				data: {
					total_co2e,
				},
			});
		}
	}

	/**
	 * This function calculates the total CO2e for a product material using an ecoinvent activity, logs the calculation, updates the database with the
	 * total CO2e, and logs the update.
	 * @param productMaterial
	 * @param ecoinvent_activity
	 * @param organization
	 * @param user
	 * @private
	 */
	private async calculateAndPersistMaterialEmissions(productMaterial, ecoinvent_activity, organization, user) {
		if (
			!ecoinvent_activity.ecoinvent_activity_impacts ||
			(Array.isArray(ecoinvent_activity.ecoinvent_activity_impacts) && ecoinvent_activity.ecoinvent_activity_impacts.length < 1)
		) {
			this.logger.warn(
				`no ecoinvent_activity_impacts found in activity; Since there weren't any impacts provided, this activity will not be included in PCF calculation.  ${ecoinvent_activity.name}`,
				{
					ecoinvent_activity,
					productMaterial,
					organization,
					user,
				},
			);

			return;
		}

		productMaterial.total_co2e = this.pcfc.addActivity(ecoinvent_activity.name, productMaterial.weight, ecoinvent_activity.ecoinvent_activity_impacts[0].impact_value);

		this.logger.info(`Added activity to PCF calculator: ${ecoinvent_activity.name} - ${productMaterial.total_co2e} KgCO2e`, {
			activity: ecoinvent_activity,
			product_material: productMaterial,
			organization,
			user,
		});

		await this.prisma.product_materials.update({
			where: {
				id: productMaterial.id,
			},
			data: {
				total_co2e: productMaterial.total_co2e,
			},
		});

		this.logger.info(`Updated product material with total CO2e: ${productMaterial.total_co2e}`, { ecoinvent_activity, product_material: productMaterial, organization, user });
	}

	/**
	 * This function sends a request to an OpenAI service to classify ecoinvent activities for a material, logs the process, and returns the
	 * classification response
	 * @param material_classification_string
	 * @param material
	 * @param activitiy_names
	 * @param product
	 * @param user
	 * @param organization
	 * @private
	 */
	private async getMaterialActivityClassificationResponse(material_classification_string: string, material: any, activitiy_names: string[], product: any, user, organization) {
		// Get the organization and product.
		const ecoinvent_material_activities_schema = {
			$schema: 'http://json-schema.org/draft-07/schema#',
			type: 'object',
			properties: {
				ecoinvent_activities: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
							},
							reasoning: {
								type: 'string',
							},
						},
						required: ['name', 'reasoning'],
					},
				},
			},
			required: ['ecoinvent_activities'],
		};

		// use openAi to filter the activities to only those that are directly involved in the production of the material
		this.logger.info(`Matching ecoinvent activities for material: ${material.name}`, { material, organization, product, user });

		const material_classification_response = await this.events.sendRPCEvent(
			'cold.platform.openai.rpc',
			'openai_question.sent',
			{
				user,
				organization,
				system_prompt: `You are an assistant who is an expert in ISIC rev 4 classifications and product lifecycle analysis for the purposes of measuring environmental impacts using ecoinvent data. The user will provide you with a material, please describe the processes that are necessary to create the specified material which will be used in making a consumer product.`,
				question: `Please identify the processes that are necessary to create ${material_classification_string} ${
					material.description ? ', which is described as ' + material.description : ''
				} which used in creating a consumer ${product.category ? product.category + ' product' : 'product'} named ${
					product.name
				} including processes necessary for a complete LCA and map them the appropriate ecoinvent activities provided to you and return the activity names and your reasoning including each activity.
						Ecoinvent activities: ${JSON.stringify(activitiy_names)}`,
				schema: ecoinvent_material_activities_schema,
				model: 'gpt-4o',
			},
			{ timeout: 120000 },
		);

		if (!material_classification_response) {
			this.logger.error(`No material classification response found for material: ${material.name}`, { material, organization, product, user });
			return null;
		}

		this.logger.info(`Received material classification response: ${JSON.stringify(material_classification_response)}`);

		return material_classification_response;
	}

	/**
	 * This function retrieves an ecoinvent activity by name, logs the process, and returns the activity or null if not found.
	 * @param name
	 * @private
	 */
	private async getEcoinventActivityByName(name: string) {
		try {
			const ecoinvent_activity = await this.prisma.ecoinvent_activities.findFirst({
				where: {
					name: name,
				},
				select: {
					id: true,
					name: true,
					description: true,
					location: true,
					ecoinvent_classification_id: true,
					ecoinvent_activity_impacts: {
						where: {
							impact_category_id: '1a0b55c7-46dd-49c5-8495-b8be84b6298a',
							indicator_name: 'climate change',
						},
					},
				},
			});

			if (!ecoinvent_activity || !ecoinvent_activity.ecoinvent_activity_impacts) {
				return null;
			}

			return ecoinvent_activity;
		} catch (e) {
			this.logger.error(`Error finding ecoinvent activity by name: ${name}`, { name, error: e });

			return null;
		}
	}

	/**
	 * This function retrieves the ecoinvent classifications for a material, and deletes existing classifications if clearClassification is true,
	 * @param material
	 * @param product
	 * @param user
	 * @param organization
	 * @param clearClassification
	 * @private
	 */
	private async findEcoinventClassifications(material: any, product, user, organization, clearClassification: boolean): Promise<any> {
		const ecoinvent_classifications_schema = {
			type: 'object',
			properties: {
				classifications: {
					type: 'array',
					description: 'An array containing classification ecoinvent_activity_classification data',
					items: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
								description: 'The name of the ecoinvent classification',
							},
							reasoning: {
								type: 'string',
								description: 'The reasoning that explains why the classification is appropriate',
							},
						},
						required: ['name', 'reasoning'],
					},
				},
			},
			required: ['classifications'],
			additionalProperties: false,
		};

		if (!this.ecoinventClassificationNames) {
			await this.setEcoinventClassifications();
		}

		const system_prompt = `You are an assistant who is an expert in ISIC rev 4 classifications.`;

		const user_question = `Please describe the processes that are necessary to create ${material.name} ${
			material.description ? ':' + material.description : ''
		} used in creating a consumer ${product.category ? product.category + ' product' : 'product'} named ${
			product.name
		}. Please include processes necessary for a complete LCA and map them the appropriate ecoinvent ISIC v4 classifications provided to you and return the classification names and your reasoning including each classification.
					Ecoinvent ISIC v4 classifications: ${JSON.stringify(this.ecoinventClassificationNames)}`;

		this.logger.info('sending prompt to openAI to identify material_ecoinvent_classifications', { user_question, system_prompt, material, product, organization, user });

		const selected_ecoinvent_activity_classifications = await this.events.sendRPCEvent(
			'cold.platform.openai.rpc',
			'openai_question.sent',
			{
				user,
				organization,
				system_prompt: system_prompt,
				question: user_question,
				schema: ecoinvent_classifications_schema,
				strict: true,
				model: 'gpt-4o',
			},
			{ timeout: 120000 },
		);

		this.logger.info(`Received material classification response from OpenAi`, {
			item: material.material_classification_id,
			selected_ecoinvent_activity_classifications,
			product,
			material,
			user_question,
			system_prompt,
			organization,
			user,
		});

		if (!material.material_classification?.id) {
			return false;
		}

		if (clearClassification) {
			// delete all existing ecoinvent classifications for the material
			try {
				await this.prisma.material_ecoinvent_classifications.deleteMany({
					where: {
						material_classification_id: material.material_classification.id,
					},
				});
			} catch (e) {
				this.logger.warn(`Failed deleting material classification record: ${material.name}`, { error: e, product, material, organization, user });
			}
		}

		for (const ecoClass of selected_ecoinvent_activity_classifications.classifications) {
			if (!Array.isArray(selected_ecoinvent_activity_classifications.classifications) || selected_ecoinvent_activity_classifications?.classifications?.length < 1) {
				this.logger.warn(`No ecoinvent classifications found for material: ${material.name}`, {
					classification: material.material_classification.name,
					organization,
					product,
					user,
				});
				continue;
			}

			// find the ecoinvent classification by name and get the id
			const ecoclassification = this.ecoinventClassificationNames.find(classification => classification.name === ecoClass.name);

			if (!ecoclassification || !ecoclassification.id) {
				this.logger.error(`Ecoinvent classification not found: ${ecoClass}`, { ecoClass, material: material.material_classification, organization, user });
				continue;
			}

			await this.prisma.material_ecoinvent_classifications.upsert({
				where: {
					materialEcoinventClassificationKey: {
						material_classification_id: material.material_classification.id,
						ecoinvent_classification_id: ecoclassification?.id,
					},
				},
				create: {
					material_classification_id: material.material_classification.id,
					ecoinvent_classification_id: ecoclassification.id,
					reasoning: ecoClass.reasoning ? ecoClass.reasoning : null,
				},
				update: {
					material_classification_id: material.material_classification.id,
					ecoinvent_classification_id: ecoclassification.id,
					reasoning: ecoClass.reasoning ? ecoClass.reasoning : null,
				},
			});

			this.logger.info(`Material ${material.name} linked to Classification: ${material.material_classification.name} in material_ecoinvent_classifications`, {
				ecoinvent_classification: ecoClass,
				material_classification: material.material_classification.name,
				product,
				classification: ecoClass,
				organization,
				user,
			});
		}
	}

	/**
	 * This function upserts a material emission factor record in the database, logs the process, and returns the upserted record.
	 * @param material
	 * @param emFactor
	 * @param ecoinvent_activity
	 * @param organization
	 * @param user
	 * @private
	 */
	private async upsertMaterialEmissionFactors(material, emFactor, ecoinvent_activity, organization, user) {
		await this.prisma.material_emission_factors.upsert({
			where: {
				materialActivityEmissionFactorKey: {
					material_id: material.id,
					emission_factor_id: emFactor.id,
					eco_invent_activity_id: ecoinvent_activity.id,
				},
			},
			create: {
				id: new Cuid2Generator(GuidPrefixes.MaterialFactor).scopedId,
				material_id: material.id,
				eco_invent_activity_id: ecoinvent_activity.id,
				emission_factor_id: emFactor.id,
			},
			update: {
				material_id: material.id,
				eco_invent_activity_id: ecoinvent_activity.id,
				emission_factor_id: emFactor.id,
			},
		});

		this.logger.info(`Material emission factor record upserted for: ${material.name}`, {
			activity: ecoinvent_activity,
			emission_factor: emFactor,
			material,
			organization,
			user,
		});
	}

	/**
	 * This function retrieves the materials for a given product from the database, including their details and classifications, and logs the process.
	 * @param product
	 * @param organization
	 * @param user
	 * @private
	 */
	private async getProductMaterials(product, organization, user) {
		this.logger.info(`Getting materials for product: ${product.name}`, { organization, product, user });

		// Get the product materials.
		const materials: any[] = await this.prisma.product_materials.findMany({
			where: {
				product_id: product.id,
			},
			select: {
				id: true,
				weight: true,
				yield: true,
				unit_of_measure: true,
				material: {
					select: {
						id: true,
						name: true,
						description: true,
						weight_factor: true,
						weight_factor_unit_of_measure: true,
						width: true,
						width_unit_of_measure: true,
						material_category: true,
						material_subcategory: true,
						material_classification: {
							select: {
								id: true,
								name: true,
								category: true,
								weight_factor: true,
								material_ecoinvent_classifications: {
									select: {
										ecoinvent_classification: true,
									},
								},
								core_classification: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
					},
				},
			},
		});
		return materials;
	}

	/**
	 * This function retrieves ecoinvent activities based on the classification IDs of a material, logs a warning if no classifications are found,
	 * constructs a query to filter activities by location and classification IDs, executes the query, and returns the activities without raw data.
	 * @param material_ecoinvent_classifications
	 * @param material
	 * @param organization
	 * @param product
	 * @param user
	 * @private
	 */
	private async get_activities_by_classifications(material_ecoinvent_classifications: Array<any>, material: any, organization: any, product: any, user: any) {
		// get the ecoinvent classification ids from the material to pass to ecoinvent_activities query
		const component_classification_ids: any[] = material_ecoinvent_classifications.map((classification: any) => classification.ecoinvent_classification.id);

		if (!component_classification_ids || component_classification_ids?.length === 0) {
			this.logger.warn(`No ecoinvent classifications found for material: ${material.name}`, { material, organization, product, user });
			return null;
		}

		const query = {
			where: {
				OR: [{ location: 'RoW' }, { location: 'GLO' }],
			},
			select: {
				name: true,
				description: false,
			},
		};

		if (component_classification_ids?.length > 0) {
			set(query, 'where.ecoinvent_classification_id', {
				in: component_classification_ids,
			});
		}

		const source_activities = await this.prisma.ecoinvent_activities.findMany(query);

		if (!source_activities || source_activities.length < 1) {
			return null;
		}

		const activity_names = source_activities.map(activity => activity.name);

		return activity_names;
	}

	/**
	 * This function constructs a material classification string by concatenating various classification attributes of a material, creating a new
	 * classification if it doesn't exist, and returning the final classification string.
	 * @param material
	 * @param organization
	 * @param product
	 * @param user
	 * @private
	 */
	private async determineMaterialCategory(material, organization, product, user) {
		let material_classification = material.material_classification?.name ? material.material_classification?.name : '';

		// Create Cold Platform material classification if it doesn't exist.
		if (!material_classification) {
			this.logger.warn(`No material classification found for material: ${material.name}`, { material, organization, product, user });
			material.material_classification = await this.assignColdPlatformMaterialClassification(material, user, organization);
		}

		if (material.material_classification?.core_classification?.name) {
			material_classification = material_classification + ' ' + material.material_classification?.core_classification?.name;
		}

		if (material.material_category) {
			material_classification = material_classification + ' ' + material.material_category;
		}

		if (material.material_subcategory) {
			material_classification = material_classification + ' ' + material.material_subcategory;
		}

		if (material.material_classification?.core_classification?.name) {
			material_classification = material_classification + ' ' + material.material_classification?.core_classification?.name;
		}
		return material_classification;
	}

	/**
	 * This function calculates the weight of a product material based on its yield and weight factor, updates the database with the calculated weight,
	 * and logs the result or any errors encountered.
	 * @param item
	 * @param product
	 * @param organization
	 * @param user
	 * @private
	 */
	private async estimate_weights(item, product, organization, user) {
		// Calculate and persist weight for the product_material based on the yield and weight factor.
		try {
			const weight_response = getCalculatedWeight(item);

			if (typeof weight_response === 'object' && 'error' in weight_response) {
				throw new Error(weight_response.error);
			}

			item.weight = weight_response.weightInKg;

			await this.prisma.product_materials.update({
				where: {
					id: item.id,
				},
				data: {
					weight: item.weight,
					metadata: { ...item.metadata, calculated_weight_response: weight_response },
				},
			});

			this.logger.info('Calculated weight for material', { item, product, organization, user, ...weight_response });
		} catch (e) {
			this.logger.warn(`Error calculating weight for material ${item.material.name}: ${e.message}`, {
				material: item.material,
				organization,
				product,
				user,
				error: e,
			});
		}
	}

	/**
	 * The function attempts to find an existing emission factor in the database that matches the name of the ecoinvent_activity,
	 * calculates the total CO2e by looking for the 'climate change' indicator or summing all impact values, updates or creates
	 * the emission factor with the new total CO2e value and description, logs the update or creation, handles errors by logging
	 * and returning null if processing fails, and finally returns the processed emission factor.
	 * @param {Object} ecoinvent_activity - The ecoinvent activity object.
	 * @param {string} organization - The organization related to the emission factor.
	 * @param {string} user - The user responsible for the process.
	 * @private
	 * @return {Object} - The updated or created emission factor object.
	 */
	private async processEmissionFactorsForActivity(ecoinvent_activity, organization, user) {
		//emission factors are stored in the database and are used to calculate the total co2e for the material
		let emFactor = await this.prisma.emission_factors.findFirst({
			where: {
				name: ecoinvent_activity.name,
			},
		});

		// use the ecoinvent_activity_impact with the 'climate change' indicator_name
		let total_co2e = ecoinvent_activity.ecoinvent_activity_impacts.find(item => item.indicator_name === 'climate change')?.impact_value;

		if (!total_co2e) {
			// Otherwise, sum up all the impact_value properties
			total_co2e = ecoinvent_activity.ecoinvent_activity_impacts.reduce((total, item) => total + item.impact_value, 0);
		}

		if (emFactor) {
			emFactor = await this.prisma.emission_factors.update({
				where: {
					id: emFactor.id,
				},
				data: {
					name: ecoinvent_activity.name,
					description: ecoinvent_activity?.description?.replace(/[\n\r]+/g, '').trim(),
					value: total_co2e,
				},
			});

			this.logger.info(`Emission factor updated: ${emFactor.name}`, { emission_factor: emFactor, organization, user });
		} else {
			emFactor = await this.prisma.emission_factors.create({
				data: {
					name: ecoinvent_activity.name,
					description: ecoinvent_activity?.description?.replace(/[\n\r]+/g, '').trim(),
					value: total_co2e,
				},
			});

			this.logger.info(`Emission factor created: ${emFactor.name}`, { activity: ecoinvent_activity, emission_factor: emFactor, organization, user });
		}

		if (!emFactor) {
			this.logger.error(`Error processing emission factor for activity: ${ecoinvent_activity.name}`, { activity: ecoinvent_activity, organization, user });
			return null;
		}

		return emFactor;
	}

	/**
	 * Iterates over product materials and matches them to Ecoinvent activities.
	 */
	@Process('*')
	async defaultProcessor(job: any): Promise<any> {
		try {
			this.logger.log(`Processing job: ${job.id}`);
			// Get the organization and product.
			const { organization, product, user } = job.data;

			const ecoinventClassifications = await this.prisma.ecoinvent_classifications.findMany({
				select: {
					name: true,
					id: true,
				},
			});

			const classifcation_system_prompt =
				'You are an expert in consume product manufacturing processes.  The user will provide a product name and a list of ecoinvent activity classification names and ids.  Please generate a prompt to instruct the LLM to return all ecoinvent_classification ids that are associated with the production of the provided product.';

			// Get the product materials.
			const materials = await this.prisma.product_materials.findMany({
				where: {
					product_id: product.id,
				},
				select: {
					material: true,
				},
			});

			// Iterate over materials and match them to Ecoinvent activities.
			for (const material of materials) {
				// Get the material's Ecoinvent activity.
			}
			return {};
		} catch (error) {
			this.logger.error(`Error importing EcoSpold file: ${error.message}`, { job, ...error });
			throw error;
		}
	}
}
