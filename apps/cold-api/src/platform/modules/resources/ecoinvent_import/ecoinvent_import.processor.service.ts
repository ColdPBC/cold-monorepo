import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { BaseWorker, EventService, MqttService, PrismaService, S3Service } from '@coldpbc/nest';
import { parseStringPromise } from 'xml2js';
import { EcoSpold2Schema } from './validation/ecoSpold2.schema';

@Injectable()
@Processor('ecoinvent:import')
export class EcoinventImportProcessorService extends BaseWorker {
	constructor(readonly s3: S3Service, readonly events: EventService, readonly prisma: PrismaService, readonly mqtt: MqttService) {
		super(EcoinventImportProcessorService.name);
	}

	/**
	 * Imports an EcoSpold file from S3, parses the XML, validates it via Zod, and persists
	 * both the raw XML and the parsed JSON into the EcoinventFile model.
	 * @param bucketName Name of the S3 bucket.
	 * @param fileKey Key (filename) of the EcoSpold file.
	 */

	@Process('*')
	async importEcoSpoldFile(job: any): Promise<any> {
		const { jobId, bucket, organization, key, activity_name, location, reference_product, user } = job.data;
		try {
			const fileObject = await this.s3.getObject(user, bucket, key);
			if (!fileObject) {
				throw new Error(`Error reading EcoSpold file from S3: ${key}`);
			}

			const xmlContent = await fileObject?.Body?.transformToString('utf-8');

			if (!xmlContent) {
				throw new Error(`Error reading EcoSpold file from S3: ${key}`);
			}
			// Parse XML with attributes merged into objects
			const parsedXML = await parseStringPromise(xmlContent, {
				explicitArray: false,
				mergeAttrs: true,
			});

			// Validate and convert the parsed XML using the Zod schema
			const validatedData = EcoSpold2Schema.safeParse(parsedXML);

			const name = parsedXML.ecoSpold.childActivityDataset.activityDescription.activity.activityName._;
			const location = parsedXML.ecoSpold.childActivityDataset.activityDescription.geography.shortname._;
			let description = `${parsedXML.ecoSpold.childActivityDataset.activityDescription.activity.includedActivitiesStart._ || ''} \n ${
				parsedXML.ecoSpold.childActivityDataset.activityDescription.activity.includedActivitiesEnd._ || ''
			}`;

			const genComment = parsedXML.ecoSpold.childActivityDataset.activityDescription.activity.generalComment.text;
			if (genComment && Array.isArray(genComment)) {
				for (const comment of genComment) {
					description = `${description} ${comment._}`;
				}
			}

			// Persist the raw XML and validated JSON data.
			await this.prisma.ecoinvent_data.upsert({
				where: { key: key },
				update: {
					import_id: jobId,
					xml: xmlContent,
					description: description,
					location: location,
					activity_name: name,
					updated_at: new Date(),
					parsed: parsedXML,
				},
				create: {
					import_id: jobId,
					key: key,
					xml: xmlContent,
					description: description,
					location: location,
					activity_name: name,
					updated_at: new Date(),
					parsed: parsedXML,
				},
			});

			this.logger.log(`Successfully imported EcoSpold file: ${key}`);

			return {};
		} catch (error) {
			this.logger.error(`Error importing EcoSpold file: ${key}`, { job, error });
			return error;
		}
	}
}
