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
		const { jobId, bucket, organization, key, activity_name, location, user } = job.data;

		try {
			const fileObject = await this.s3.getObject(user, bucket, key);
			const lciaKeyParts = key.split('/');
			const lcia_key = `${lciaKeyParts[0]}/${lciaKeyParts[1]}/lcia_data/${lciaKeyParts[2]}`;
			const lciaFileObject = await this.s3.getObject(user, bucket, lcia_key);

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

			const lciaContent = await lciaFileObject?.Body?.transformToString('utf-8');

			if (!lciaContent) {
				throw new Error(`Error reading LCIA file from S3: ${lcia_key}`);
			}

			const parsedLCIA = await parseStringPromise(lciaContent, {
				explicitArray: false,
				mergeAttrs: true,
			});

			// Validate and convert the parsed XML using the Zod schema
			const validatedData = EcoSpold2Schema.safeParse(parsedXML);

			const fileActivity = parsedXML.ecoSpold?.childActivityDataset?.activityDescription?.activity;

			if (!fileActivity && !fileActivity.activityName) {
				this.logger.error('No activity found in EcoSpold file', { file_activity: fileActivity });
				throw new Error('No activity found in EcoSpold file');
			}

			const name = fileActivity.activityName?._;
			const location = parsedXML.ecoSpold?.childActivityDataset?.activityDescription?.geography?.shortname?._;
			let description = `${fileActivity.includedActivitiesStart?._ || ''} \n ${fileActivity.includedActivitiesEnd?._ || ''}`;

			const genComment = fileActivity.generalComment?.text;
			if (genComment && Array.isArray(genComment)) {
				for (const comment of genComment) {
					description = `${description} ${comment._}`;
				}
			} else {
				description = `${description} ${genComment._ || ''}`;
			}

			if (!name || !location || !description) {
				throw new Error('Missing name, location, or description in EcoSpold file');
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

			this.logger.log(`Successfully parsed EcoSpold file: ${key}`);

			// Persist ecoinvent activity.
			const activity = await this.prisma.ecoinvent_activities.upsert({
				where: { id: fileActivity.id },
				update: {
					name: fileActivity.activityName._,
					parent_activity_id: fileActivity.parentActivityId,
					description: description,
					location: location,
					raw_data: parsedLCIA,
					updated_at: new Date(),
				},
				create: {
					id: fileActivity.id,
					name: fileActivity.activityName._,
					parent_activity_id: fileActivity.parentActivityId,
					description: description,
					raw_data: parsedLCIA,
					location: location,
					updated_at: new Date(),
				},
			});

			this.logger.log(`Successfully upserted EcoSpold activity: ${key}`, { activity });

			// process activity classifications
			const classifications = Array.isArray(parsedLCIA.ecoSpold.childActivityDataset.activityDescription.classification)
				? parsedLCIA.ecoSpold.childActivityDataset.activityDescription.classification
				: [parsedLCIA.ecoSpold.childActivityDataset.activityDescription.classification];

			for (const classification of classifications) {
				const classificationId = classification.classificationId;
				const classificationName = classification.classificationValue._;

				// Persist classification if it doesn't exist.
				await this.prisma.ecoinvent_classifications.upsert({
					where: {
						id: classificationId,
					},
					create: {
						id: classificationId,
						name: classificationName,
						system: classification.classificationSystem._,
						updated_at: new Date(),
					},
					update: {
						name: classificationName,
						updated_at: new Date(),
					},
				});

				this.logger.log(`Successfully imported EcoSpold classification: ${classificationName}`, classification);

				// Persist classification.
				let existing_activity_classification = await this.prisma.ecoinvent_activity_classifications.findUnique({
					where: {
						ecoinventActivityClassificationKey: {
							ecoinvent_activity_id: activity.id,
							ecoinvent_classification_id: classificationId,
						},
					},
				});

				if (!existing_activity_classification) {
					try {
						// Persist activity classification.
						existing_activity_classification = await this.prisma.ecoinvent_activity_classifications.create({
							data: {
								ecoinvent_activity_id: activity.id,
								ecoinvent_classification_id: classificationId,
							},
						});

						this.logger.info(`Successfully linked classification (${classificationName}) to activity: ${activity.id}`);
					} catch (e) {
						this.logger.error(`Error linking classification (${classificationName}) to activity: ${activity.id}`, { error: e });
						throw e;
					}
				}

				this.logger.log(`Activity classification already linked: ${classificationName}`, existing_activity_classification);
			}

			// process activity impacts
			const impacts = parsedLCIA.ecoSpold.childActivityDataset.flowData.impactIndicator as any[];
			for (const impact of impacts) {
				const categoryId = impact.impactCategoryId;
				const impactName = impact.name;

				const impactCategory = await this.prisma.ecoinvent_impact_categories.upsert({
					where: {
						ecoinventImpactCategoryNameMethod: {
							impact_method: impact.impactMethodName,
							name: impactName,
						},
					},
					create: {
						id: categoryId,
						impact_method: impact.impactMethodName,
						name: impactName,
						updated_at: new Date(),
					},
					update: {
						name: impactName,
						updated_at: new Date(),
					},
				});

				this.logger.log(`Upserted impact category ${impactName} using impact method: ${impact.impactMethodName}`, impactCategory);
				// Persist impact.
				const activityImpact = await this.prisma.ecoinvent_activity_impacts.upsert({
					where: {
						ecoinventActivityImpactKey: {
							ecoinvent_activity_id: activity.id,
							impact_category_id: impactCategory.id,
							impact_method_name: impact.impactMethodName,
						},
					},
					create: {
						ecoinvent_activity_id: activity.id,
						impact_category_id: impactCategory.id,
						impact_method_name: impact.impactMethodName,
						impact_value: +impact.amount,
						impact_unit_name: impact.unitName,
					},
					update: {
						impact_value: +impact.amount,
					},
				});

				this.logger.log(`Upserted activity impact ${activity.name} in category ${impactCategory.name} using impact method: ${impact.impactMethodName}`, {
					activity_impact: activityImpact,
				});
			}

			job = null;

			return {};
		} catch (error) {
			this.logger.error(`Error importing EcoSpold file: ${error.message}`, { job, ...error });
			throw error;
		}
	}
}
