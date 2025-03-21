import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { BaseWorker, Cuid2Generator, EventService, GuidPrefixes, PrismaService, S3Service } from '@coldpbc/nest';
import { EcoinventImportProcessorService } from './ecoinvent_import.processor.service';
import { omit, set } from 'lodash';

@Injectable()
@Processor('ecoinvent:activity')
export class EcoinventActivityProcessorService extends BaseWorker {
	constructor(readonly s3: S3Service, readonly events: EventService, readonly prisma: PrismaService) {
		super(EcoinventImportProcessorService.name);
	}

	@Process('classify_product')
	async classifyProduct(job: any): Promise<any> {
		try {
			this.logger.log(`Processing job: ${job.id}`);
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
								description: {
									type: 'string',
								},
							},
							required: ['name', 'description'],
						},
					},
				},
				required: ['ecoinvent_activities'],
			};
			const ecoinvent_classifications_schema = {
				$schema: 'http://json-schema.org/draft-07/schema#',
				type: 'object',
				properties: {
					ecoinvent_classifications: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								id: {
									type: 'string',
								},
								name: {
									type: 'string',
								},
							},
							required: ['id', 'name'],
						},
					},
				},
				required: ['ecoinvent_classifications'],
			};

			const { organization, product, user } = job.data;

			const ecoinventClassifications = await this.prisma.ecoinvent_classifications.findMany({
				where: {
					system: 'ISIC rev.4 ecoinvent',
				},
				select: {
					id: true,
					name: true,
				},
			});

			// Get the product materials.
			const materials: any[] = await this.prisma.product_materials.findMany({
				where: {
					product_id: product.id,
				},
				select: {
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

			const ignored_material_categories = [
				'Zippers',
				'Zipper',
				'Label/Hangtag/Packaging',
				'External branding',
				'Packaging',
				'Trolley',
				'Embellishment',
				'Hangtags and packaging',
				'Misc',
				'Tbd',
				'',
				'Labels',
				'Hangtag',
				'Buckle',
				'Eyelet',
				'Buttons',
				'Grip',
				'Rivet',
				'Logo',
				'Zipper pull',
				'box',
				'Rings',
				'Snaps',
				'Label/Sticker',
				'Buckles',
				'Shoe Box',
				'Sliders',
				'Structure',
				'Embross/Debross',
				'D-Ring',
				'Print',
				'Patch',
				'Lock',
				'Wheels + housing assemblies',
				'Puller',
				'Stiffiner',
				'Screenprint',
				'Hook',
				'Slider + tab',
			];
			// Iterate over materials and match them to Ecoinvent activities.
			for (const item of materials) {
				const material = item.material;
				const material_classification = material.material_classification.name + ' ' + material.material_classification?.core_classification?.name;

				if (ignored_material_categories.includes(material.material_classification) || ignored_material_categories.includes(material.material_subcategory)) {
					continue;
				}

				try {
					const product_classification_response = await this.events.sendRPCEvent(
						'cold.platform.openai.rpc',
						'openai_question.sent',
						{
							user,
							organization,
							system_prompt: 'You are an expert in consumer product manufacturing processes with deep understanding of sustainability and environmental impacts from production',
							question: `
								My company is manufacturing a consumer product named ${product.name} - ${product.description}, and we use a component we refer to as ${material.name} in the process of making our ${product.name}.  
								
								I am trying to understand the environmental impacts that come from manufacturing this component therefore I need to know the ecoinvent activities that are associated with the production of ${material.name}.  
								Use the information I have provided to do the following:
								- Use the information I provided along your deep understand of the production of consumer products to identify the core raw material used in the production of the provided component named ${material.name}
								- Please filter this array of ecoinvent classifications to only include those that are directly involved in the production of the provided component.
								- Do not modify the Id in the array
								- Do not modify the array in any other way.
								`,

							context: `
							component_name: ${material.name}${material.description} 
							component_categories: ${material_classification ? material_classification : material.material_category + ' ' + material.material_subcategory ? material.material_subcategory : ''}
							component_description: ${material.description}
							ecoinvent classifications: ${JSON.stringify(ecoinventClassifications)}`,
							schema: ecoinvent_classifications_schema,
							model: 'o3-mini',
						},
						{ timeout: 120000 },
					);

					const product_classification_ids: any[] = product_classification_response.ecoinvent_classifications.map((classification: any) => classification.id);

					const query = {
						where: {
							location: 'RoW',
						},
						select: {
							name: true,
							description: true,
						},
					};

					if (product_classification_ids?.length > 0) {
						set(query, 'where.ecoinvent_classification_id', {
							in: product_classification_ids,
						});
					}

					const source_activities = await this.prisma.ecoinvent_activities.findMany(query);

					const ecoinvent_activities = source_activities.map(activity => omit(activity, ['raw_data']));

					if (ecoinvent_activities.length > 0) {
						// use openAi to match the material to ecoinvent activities
						const material_classification_response = await this.events.sendRPCEvent(
							'cold.platform.openai.rpc',
							'openai_question.sent',
							{
								user,
								organization,
								system_prompt: 'You are an expert in consumer product manufacturing processes with deep understanding of sustainability and environmental impacts from production',
								question: `
								My company is manufacturing a consumer product named ${product.name} - ${product.description}, and we use a component we refer to as ${
									material.name
								} in the process of making our ${product.name}.  
								
								I am trying to understand the environmental impacts that come from manufacturing this component therefore I need to know the ecoinvent activities that are associated with the production of ${
									material.name
								}.  
								
								Please filter the array activities to include only those activities that are directly involved with the ${material.name} production.
								- Use your broad understanding of the production of consumer products to identify and understand the steps necessary to produce the provided material named ${material.name}
								- Match those steps up with the provided list of activities name and description 
								- Filter the array, removing any elements that are not directly involved with the production of ${material.name}.  
								- You should use your deep knowledge of how this material is manufactured and select only the activities that cover all the steps necessary to produce the material from th, preferring activities that broadly cover the most steps used in producing the component if possible.
								- If the component is made up of multiple materials, please include all activities that are associated with the production of each material.
								- If the component is made up of synthetic materials, that are turned into a textile/rope/chord also include all activities that are necessary to produce the textile (ie: yarn production, weaving, etc).
								- Do not include any duplicate or overlapping activities.  
								- If the component name or description includes the word "recycled" or "recycling" please include activities use the recycled raw material in the process.
								- Do not modify the array in any other way.
								
						
						product_name: ${product.name} - ${product.description}
						component_name: ${material.name}${product.description} 
						component_categories:  ${material_classification ? material_classification : material.material_category + ' ' + material.material_subcategory ? material.material_subcategory : ''}
						component_description: ${material.description}
						ecoinvent activities: ${JSON.stringify(ecoinvent_activities)}`,
								schema: ecoinvent_material_activities_schema,
								model: 'o3-mini',
							},
							{ timeout: 120000 },
						);

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
										},
									},
								},
							});

							if (!ecoinvent_activity || !ecoinvent_activity.ecoinvent_activity_impacts) {
								this.logger.error(`Ecoinvent activity not found: ${activity.name}`);
								continue;
							}

							let emFactor = await this.prisma.emission_factors.findFirst({
								where: {
									name: ecoinvent_activity.name,
								},
							});

							if (emFactor) {
								emFactor = await this.prisma.emission_factors.update({
									where: {
										id: emFactor.id,
									},
									data: {
										name: ecoinvent_activity.name,
										description: ecoinvent_activity?.description?.replace(/[\n\r]+/g, '').trim(),
										value: ecoinvent_activity.ecoinvent_activity_impacts[0].impact_value,
									},
								});
							} else {
								emFactor = await this.prisma.emission_factors.create({
									data: {
										name: ecoinvent_activity.name,
										description: ecoinvent_activity?.description?.replace(/[\n\r]+/g, '').trim(),
										value: ecoinvent_activity.ecoinvent_activity_impacts[0].impact_value,
									},
								});
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
						}
						this.logger.info(`Material classification response: ${JSON.stringify(material_classification_response)}`);
					}
				} catch (e) {
					this.logger.error(`Error processing material: ${material.name}`, { error: e, material });
					throw e;
				}
			}
			return {};
		} catch (error) {
			this.logger.error(`Error importing EcoSpold file: ${error.message}`, { job, ...error });
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
