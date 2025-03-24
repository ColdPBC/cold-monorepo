import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { BaseWorker, CacheService, Cuid2Generator, EventService, GuidPrefixes, PrismaService, S3Service } from '@coldpbc/nest';
import { EcoinventImportProcessorService } from './ecoinvent_import.processor.service';
import { omit, set } from 'lodash';
import { ProductCarbonFootprintCalculator } from './pcf_calculator';

@Injectable()
@Processor('ecoinvent:activity')
export class EcoinventActivityProcessorService extends BaseWorker {
	ecoinventClassifications: { id: string; description: string | null; name: string }[];
	pcfc: ProductCarbonFootprintCalculator;

	constructor(readonly s3: S3Service, readonly events: EventService, readonly prisma: PrismaService, readonly cache: CacheService) {
		super(EcoinventImportProcessorService.name);
	}

	override async onModuleInit(): Promise<void> {
		await super.onModuleInit();

		this.ecoinventClassifications = await this.prisma.ecoinvent_classifications.findMany({
			where: {
				system: 'ISIC rev.4 ecoinvent',
			},
			select: {
				id: true,
				name: true,
				description: true,
			},
		});
	}

	/**
	 * Find ecoinvent classifications that match the material classifications
	 */
	@Process('match_material_and_ecoinvent_classifications')
	async findEcoinventClassifications(material: any, user, organization): Promise<any> {
		const material_classifications = await this.prisma.material_classification.findMany();

		const ecoinvent_classifications_schema = {
			type: 'object',
			properties: {
				classifications: {
					type: 'array',
					description: 'An array containing classification names',
					items: {
						type: 'string',
					},
				},
			},
			required: ['classifications'],
			additionalProperties: false,
		};

		for (const matClass of material_classifications) {
			// remove the id from each classification object in the array and return a new array to reduce token count
			const filteredClassifications = this.ecoinventClassifications.map(classification => omit(classification, ['id', 'description']));

			const selected_ecoinvent_activity_classifications = await this.events.sendRPCEvent(
				'cold.platform.openai.rpc',
				'openai_question.sent',
				{
					user,
					organization,
					system_prompt: `You are an expert in manufacturing processes with deep understanding all the processes necessary to produce a raw material and finished good.  The user will provide a material classification name.  Your job is search through the provided classification array and find all the items that are directly involved in the production of the material and return those items in a new array.
						- If the classification is made from natural fibers (cotton, wool, etc) please include all classifications necessary to produce the raw material (ie: raising the animal, cotton farming, wool shearing, etc).
						- If the classification is made from synthetic fibers, please include all classifications necessary to produce the raw material (ie: oil extraction, polymer production, etc).
						- If the classification is made from recycled materials, please include all classifications necessary to produce the finished product from recycled materials
						- If the classification is fabric or textile, also include all classifications necessary to produce the fabric (ie: yarn production, weaving, etc).
						
						classifications: ${JSON.stringify(filteredClassifications)}
						`,
					question: `${matClass.name}: ${matClass.category}`,
					schema: ecoinvent_classifications_schema,
					strict: true,
					model: 'gpt-4o',
				},
				{ timeout: 120000 },
			);

			this.logger.info(`Received material classification response from OpenAi`, {
				item: matClass,
				selected_ecoinvent_activity_classifications,
				organization,
				user,
			});

			for (const ecoClass of selected_ecoinvent_activity_classifications.classifications) {
				if (!Array.isArray(selected_ecoinvent_activity_classifications.classifications) || selected_ecoinvent_activity_classifications?.classifications?.length < 1) {
					this.logger.warn(`No ecoinvent classifications found for material: ${matClass.name}`, { item: matClass, organization, user });
					continue;
				}

				// find the ecoinvent classification by name and get the id
				const ecoclassification = this.ecoinventClassifications.find(classification => classification.name === ecoClass);

				if (!ecoclassification || !ecoclassification.id) {
					this.logger.error(`Ecoinvent classification not found: ${ecoClass}`, { ecoClass, matClass, organization, user });
					continue;
				}

				await this.prisma.material_ecoinvent_classifications.upsert({
					where: {
						materialEcoinventClassificationKey: {
							material_classification_id: matClass.id,
							ecoinvent_classification_id: ecoclassification?.id,
						},
					},
					create: {
						material_classification_id: matClass.id,
						ecoinvent_classification_id: ecoclassification.id,
					},
					update: {
						material_classification_id: matClass.id,
						ecoinvent_classification_id: ecoclassification.id,
					},
				});

				this.logger.info(`Material classification record upserted for: ${matClass.name}`, {
					ecoinvent_classification: ecoClass,
					material_classification: matClass.name,
					organization,
					user,
				});
			}
		}
	}

	async classifyMaterial(material: any, user, organization): Promise<any> {
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
							},
							required: ['name'],
						},
					},
				},
				required: ['ecoinvent_activities'],
			};

			const { organization, product, user } = job.data;

			this.logger.info(`Getting materials for product: ${product.name}`, { organization, product, user });

			// Get the product materials.
			const materials: any[] = await this.prisma.product_materials.findMany({
				where: {
					product_id: product.id,
				},
				select: {
					id: true,
					weight: true,
					material: {
						select: {
							id: true,
							name: true,
							description: true,
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

			const ignored_material_categories = ['External branding', 'Trolley', 'Embellishment', 'Hangtags and packaging', '', 'Logo'];
			// Iterate over materials and match them to Ecoinvent activities.
			for (const item of materials) {
				const material = item.material;
				let material_classification = material.material_classification?.name ? material.material_classification?.name : '';

				if (!material_classification) {
					this.logger.warn(`No material classification found for material: ${material.name}`, { material, organization, product, user });
					material.material_classification = await this.classifyMaterial(material, user, organization);
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

				try {
					if (!material?.material_classification?.material_ecoinvent_classifications || material?.material_classification?.material_ecoinvent_classifications?.length === 0) {
						this.logger.warn(`No ecoinvent classifications found for material: ${material.name}`, { material, organization, product, user });
						continue;
					}

					const component_classification_ids: any[] = material?.material_classification?.material_ecoinvent_classifications.map(
						(classification: any) => classification.ecoinvent_classification.id,
					);

					if (!component_classification_ids || component_classification_ids?.length === 0) {
						this.logger.warn(`No ecoinvent classifications found for material: ${material.name}`, { material, organization, product, user });
						continue;
					}

					const query = {
						where: {
							location: 'RoW',
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
						this.logger.error(`No ecoinvent activities found for material: ${material.name}`, { material, organization, product, user });
						continue;
					}

					const ecoinvent_activities = source_activities.map(activity => omit(activity, ['raw_data']));

					this.logger.info(`Matching ecoinvent activities for material: ${material.name}`, { material, organization, product, user });

					// use openAi to filter the activities to only those that are directly involved in the production of the material
					const material_classification_response = await this.events.sendRPCEvent(
						'cold.platform.openai.rpc',
						'openai_question.sent',
						{
							user,
							organization,
							system_prompt: `The user will provide the classification of a material used in manufacturing a consumer product and 
								your job is to filter the activities array to include not only those processes directly involved in 
								making the material from cradle-to-gate (raw material processing and intermediate processing) but 
								also the downstream processes or manufacturing stages that lead to the final product. This can 
								include additional processes such as weaving, knitting, dyeing, finishing, and any other assembly steps 
								involved in producing the final fabric or textile.
								
								activities array: ${JSON.stringify(ecoinvent_activities)}
								`,
							question: `${material_classification}`,
							schema: ecoinvent_material_activities_schema,
							model: 'gpt-4o',
						},
						{ timeout: 120000 },
					);

					this.logger.info(`Received material classification response: ${JSON.stringify(material_classification_response)}`);

					if (!Array.isArray(material_classification_response.ecoinvent_activities) || material_classification_response.ecoinvent_activities.length < 1) {
						this.logger.error(`No ecoinvent activities found for material: ${material.name}`, { material, organization, product, user });
						continue;
					}

					for (const activity of material_classification_response.ecoinvent_activities) {
						const ecoinvent_activity = await this.prisma.ecoinvent_activities.findFirst({
							where: {
								name: {
									contains: activity.name,
								},
							},
							include: {
								ecoinvent_activity_impacts: {
									where: {
										impact_category_id: '1a0b55c7-46dd-49c5-8495-b8be84b6298a',
										indicator_name: 'climate change',
									},
								},
							},
						});

						if (!ecoinvent_activity || !ecoinvent_activity.ecoinvent_activity_impacts) {
							this.logger.error(`Ecoinvent activity not found: ${activity.name}`, { activity, material, organization, product, user });
							continue;
						}

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

							this.logger.info(`Emission factor updated: ${emFactor.name}`, { emission_factor: emFactor, product, material, organization, user });
						} else {
							emFactor = await this.prisma.emission_factors.create({
								data: {
									name: ecoinvent_activity.name,
									description: ecoinvent_activity?.description?.replace(/[\n\r]+/g, '').trim(),
									value: total_co2e,
								},
							});

							this.logger.info(`Emission factor created: ${emFactor.name}`, { emission_factor: emFactor, product, material, organization, user });
						}

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
							emission_factor: emFactor,
							product,
							material,
							organization,
							user,
						});

						// Calculate the total CO2e for the material and update the product material.
						if (item?.weight) {
							item.total_co2e = this.pcfc.addActivity(ecoinvent_activity.name, item.weight, ecoinvent_activity.ecoinvent_activity_impacts[0].impact_value);

							this.logger.info(`Added activity to PCF calculator: ${ecoinvent_activity.name} - ${item.total_co2e} KgCO2e`, {
								activity: ecoinvent_activity,
								product,
								material,
								organization,
								user,
							});

							await this.prisma.product_materials.update({
								where: {
									id: item.id,
								},
								data: {
									total_co2e: item.total_co2e,
								},
							});

							this.logger.info(`Updated product material with total CO2e: ${item.total_co2e}`, { product, material, organization, user });
						}
					}
				} catch (e) {
					this.logger.error(`Error processing material: ${material.name}`, { error: e, material });
					throw e;
				}
			}

			const total_co2e = this.pcfc.calculateTotal();

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

			return {};
		} catch (error) {
			this.logger.error(`Error processing product emissions job: ${error.message}`, { job, ...error });
			throw error;
		}
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
