import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BaseWorker, Cuid2Generator, GuidPrefixes, PrismaService } from '@coldpbc/nest';
import { ClimatiqService } from '../climatiq/climatiq.service';
import { emissions } from '../../../../libs/nest/src/validation/generated/modelSchema/emissionsSchema';

@Processor('climatiq')
export class OutboundQueueProcessor extends BaseWorker {
	constructor(private readonly climatiq: ClimatiqService, private readonly prisma: PrismaService) {
		super(OutboundQueueProcessor.name);
	}

	@OnQueueActive()
	onActive(job: Job) {
		this.logger.info(`Processing job ${job.id} of type ${job.name} with data ${job.data}`, job);
	}

	@OnQueueFailed()
	onFailed(job: Job) {
		this.logger.error(`Job ${job.id} of type ${job.name} FAILED ${job.failedReason}`, job);
	}

	@Process('new_bill')
	async processMessages(job: Job) {
		this.logger.info(`Received new bill event`, { name: job.name, id: job.id, data: job.data });

		const { integration_id, facility_id, integration_data, payload } = job.data;

		const emission = await this.climatiq.getEmissionEstimate(payload);

		const insertData: emissions = {
			id: new Cuid2Generator(GuidPrefixes.EmissionSource).scopedId,
			co2e: emission['co2e'],
			co2e_calculation_origin: emission['co2e_calculation_origin'],
			co2e_unit: emission['co2e_unit'],
			co2_calculation_method: emission['co2e_calculation_method'],
			facility_id: facility_id || job.data.facility_id,
			integration_id: integration_id || job.data.integration.id,
			emission_factor: emission['emission_factor'],
			activity_data: emission['activity_data'],
			constituent_gases: emission['constituent_gases'],
			integration_data: integration_data,
			name: emission.emission_factor['name'],
			category: emission.emission_factor['category'],
			region: emission.emission_factor['region'],
			deleted: false,
		};

		await this.prisma.emissions.create({
			data: {
				...insertData,
			},
		});
		this.logger.info(`Emission estimate: ${JSON.stringify(emission)}`, {
			name: job.name,
			id: job.id,
			data: job.data,
		});
	}
}
