import { Injectable } from '@nestjs/common';
import { BaseWorker, PrismaService, S3Service, EventService } from '@coldpbc/nest';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { pick } from 'lodash';

@Injectable()
export class EcoinventActivityService extends BaseWorker {
	constructor(
		private readonly s3: S3Service,
		private readonly prisma: PrismaService,
		@InjectQueue('ecoinvent:activity') readonly activityQueue: Queue,
		private readonly events: EventService,
	) {
		super(EcoinventActivityService.name);
	}
	ecoinventClassifications: any[];

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

		this.activityQueue.on('completed', async (job, result) => {
			this.logger.log(`Job completed: ${job.id}`);
		});

		this.activityQueue.on('failed', async (job, error) => {
			this.logger.error(`Job failed: ${job.id}`, error);
		});
	}

	async queueActivityMatchJobs(req: any, orgId: string, reclassifyMaterials?: boolean, clearClassification?: boolean): Promise<any> {
		const { user, organization } = req;

		// Match Cold Platform Material Classifications to ISIC rev.4 Ecoinvent Classifications
		if (reclassifyMaterials) {
			await this.findEcoinventClassifications(organization, user, clearClassification);
		}

		// Iterate over organization's products and match them to Ecoinvent activities.
		const products = await this.prisma.products.findMany({
			where: {
				organization_id: organization.id,
			},
		});

		// const product = products[10];
		// return await this.activityQueue.add(
		// 	'classify_product',
		// 	{
		// 		product,
		// 		organization,
		// 		user,
		// 	},
		// 	{ removeOnComplete: true },
		// );

		for (const product of products) {
			const job = await this.activityQueue.add(
				'classify_product',
				{
					product,
					organization,
					user,
					reclassifyMaterials,
					clearClassification,
				},
				{ removeOnComplete: true },
			);

			this.logger.info(`Queuing activity matching job for ${product.name}.`, { job: job.data });
		}
	}

	async findEcoinventClassifications(user, organization, clearClassification): Promise<any> {
		const material_classifications = await this.prisma.material_classification.findMany();

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

		for (const matClass of material_classifications) {
			// remove the id from each classification object in the array and return a new array to reduce token count
			const ecoinventClassificationNames = this.ecoinventClassifications.map(classification => pick(classification, ['name']));

			const system_prompt = `You are an assistant who is an expert in ISIC rev 4 classifications. The user will provide you with a material, please describe the processes that are necessary to create the specified material which will be used in making a consumer product. Please include processes necessary for a complete LCA and map them the appropriate ecoinvent ISIC v4 classifications provided to you and return the classification names and your reasoning including each classification.
					Ecoinvent ISIC v4 classifications: ${JSON.stringify(ecoinventClassificationNames)}
					`;
			const selected_ecoinvent_activity_classifications = await this.events.sendRPCEvent(
				'cold.platform.openai.rpc',
				'openai_question.sent',
				{
					user,
					organization,
					system_prompt: system_prompt,
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

			if (clearClassification) {
				// delete all existing ecoinvent classifications for the material
				try {
					await this.prisma.material_ecoinvent_classifications.deleteMany({
						where: {
							material_classification_id: matClass.id,
						},
					});
				} catch (e) {
					this.logger.warn(`Failed deleting material classification record: ${matClass.name}`, { error: e, matClass, organization, user });
				}
			}

			for (const ecoClass of selected_ecoinvent_activity_classifications.classifications) {
				if (!Array.isArray(selected_ecoinvent_activity_classifications.classifications) || selected_ecoinvent_activity_classifications?.classifications?.length < 1) {
					this.logger.warn(`No ecoinvent classifications found for material: ${matClass.name}`, { item: matClass, organization, user });
					continue;
				}

				// find the ecoinvent classification by name and get the id
				const ecoclassification = this.ecoinventClassifications.find(classification => classification.name === ecoClass.name);

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
						reasoning: ecoClass.reasoning,
					},
					update: {
						material_classification_id: matClass.id,
						ecoinvent_classification_id: ecoclassification.id,
						reasoning: ecoClass.reasoning,
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
}
