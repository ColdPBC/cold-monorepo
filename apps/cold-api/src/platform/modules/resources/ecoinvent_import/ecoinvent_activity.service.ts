import { Injectable } from '@nestjs/common';
import { BaseWorker, PrismaService, S3Service } from '@coldpbc/nest';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EcoinventActivityService extends BaseWorker {
	constructor(private readonly s3: S3Service, private readonly prisma: PrismaService, @InjectQueue('ecoinvent:activity') readonly activityQueue: Queue) {
		super(EcoinventActivityService.name);
	}

	override async onModuleInit(): Promise<void> {
		await super.onModuleInit();

		this.activityQueue.on('completed', async (job, result) => {
			this.logger.log(`Job completed: ${job.id}`);
		});

		this.activityQueue.on('failed', async (job, error) => {
			this.logger.error(`Job failed: ${job.id}`, error);
		});
	}

	async queueActivityMatchJobs(req: any, orgId: string): Promise<void> {
		const { user, organization } = req;

		// Iterate over organization's products and match them to Ecoinvent activities.
		const products = await this.prisma.products.findMany({
			where: {
				organization_id: organization.id,
			},
		});

		// const product = products[10];
		// const job = await this.activityQueue.add(
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
				},
				{ removeOnComplete: true },
			);

			this.logger.info(`Queuing activity matching job for ${product.name}.`, { job: job.data });
		}
	}
}
