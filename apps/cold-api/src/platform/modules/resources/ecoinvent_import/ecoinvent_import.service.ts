import { Injectable } from '@nestjs/common';
import { BaseWorker, PrismaService, S3Service } from '@coldpbc/nest';
import { EcoSpold2Schema } from './validation/ecoSpold2.schema';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ecoinvent_imports } from '@prisma/client';
import { v4 } from 'uuid';
@Injectable()
export class EcoinventImportService extends BaseWorker {
	ecoSpoldSchema = EcoSpold2Schema;
	batchSize = 25;

	constructor(private readonly s3: S3Service, private readonly prisma: PrismaService, @InjectQueue('ecoinvent:import') readonly queue: Queue) {
		super(EcoinventImportService.name);
	}

	override async onModuleInit(): Promise<void> {
		await super.onModuleInit();

		this.queue.on('completed', async (job, result) => {
			this.logger.log(`Job completed: ${job.id}`);
			const import_row = await this.prisma.ecoinvent_imports.findUnique({ where: { id: job.data.jobId } });
			if (import_row) {
				await this.prisma.ecoinvent_imports.update({
					where: { id: job.data.jobId },
					data: {
						processing_status: 'IMPORT_COMPLETE',
						job_status: await job.getState(),
					},
				});
			}

			await job.discard();
		});

		this.queue.on('failed', async (job, error) => {
			const import_row = await this.prisma.ecoinvent_imports.findUnique({ where: { id: job.data.jobId } });
			if (import_row) {
				await this.prisma.ecoinvent_imports.update({
					where: { id: job.data.jobId },
					data: {
						processing_status: 'PROCESSING_ERROR',
						job_status: await job.getState(),
					},
				});
			}
		});
	}

	/**
	 * Imports CSV data from an S3 bucket.
	 * This function inserts each row into the EcoinventImport model.
	 * (This part remains largely unchanged.)
	 * @param bucketName Name of the S3 bucket.
	 * @param csvFileKey Key (filename) of the CSV file.
	 */
	async importCsv(req: any, bucketName = 'cold-ecoinvent-data', csvFileKey = 'ecoinvent_ecospold2_3_11_cutoff/FilenameToActivityLookup.csv'): Promise<void> {
		// Retrieve CSV file from S3.
		const s3Object = await this.s3.getObject(req.user, bucketName, csvFileKey);
		const folder = `${csvFileKey.split('/')[0]}/datasets`;

		if (!s3Object) {
			this.logger.error(`File not found in S3: ${csvFileKey}`);
			return;
		}

		this.logger.info(`Importing ECOInvent CSV file from S3: ${csvFileKey}`, { bucket: bucketName, key: csvFileKey, user: req.user });

		// Ensure we can create a stream from the S3 object Body.
		const csvContent = await s3Object.Body?.transformToString('utf-8');
		if (!csvContent) {
			this.logger.error(`Error reading CSV file content from S3: ${csvFileKey}`, { bucket: bucketName, key: csvFileKey, user: req.user });
			return;
		}

		// Create a readable stream from the file content.
		const stream = Readable.from(csvContent);
		const parser = csvParser({ separator: ';' });
		const batchRows: Array<ecoinvent_imports> = [];

		this.logger.info('Pausing job queue to process CSV file.', { bucket: bucketName, key: csvFileKey, user: req.user });

		stream
			.pipe(parser)
			.on('data', async row => {
				parser.pause();
				this.logger.info(`Processing row: ${row.Filename}`, { bucket: bucketName, key: csvFileKey, user: req.user, csv_row: row });
				const existingRow = await this.prisma.ecoinvent_imports.findUnique({
					where: { key: `${folder}/${row.Filename}` },
				});

				if (existingRow) {
					this.logger.warn(`Existing job found for file ${row.Filename} will be replaced with new job`, {
						existing_row: existingRow,
						bucket: bucketName,
						key: `${folder}/${row.Filename}`,
						user: req.user,
						csv_row: row,
					});
					// Cancel job if one already exists
					const existingJob = await this.queue.getJob(existingRow?.id);
					if (existingJob) {
						await existingJob.discard();
						this.logger.warn(`Existing job for file ${folder}/${row.Filename} canceled`, {
							existing_row: existingRow,
							bucket: bucketName,
							key: csvFileKey,
							user: req.user,
							csv_row: row,
						});
					}
				}

				const rowData = {
					id: v4().toString(),
					job_status: 'PENDING',
					created_at: new Date(),
					updated_at: new Date(),
					bucket: bucketName,
					key: `${folder}/${row.Filename}`,
					activity_name: row.ActivityName,
					location: row.Location,
					reference_product: row.ReferenceProduct,
					processing_status: 'PENDING',
				} as ecoinvent_imports;

				// Map CSV columns to corresponding DB fields.
				batchRows.push(rowData);

				// When batch size is reached, insert rows in bulk.
				if (batchRows.length >= this.batchSize) {
					try {
						await this.prisma.ecoinvent_imports.createMany({
							data: batchRows,
							// Skip duplicates if key is unique.
							skipDuplicates: true,
						});
						batchRows.length = 0;
						this.logger.info('Batch inserted successfully.', {
							bucket: bucketName,
							key: csvFileKey,
							user: req.user,
						});
					} catch (error) {
						this.logger.error(`Bulk insert error: ${error}`);
						parser.destroy(error);
					}
				}
				parser?.resume();
			})
			.on('end', async () => {
				// Insert any remaining rows.
				if (batchRows.length > 0) {
					try {
						await this.prisma.ecoinvent_imports.createMany({
							data: batchRows,
							skipDuplicates: true,
						});
						this.logger.info('Batch inserted successfully.', {
							bucket: bucketName,
							key: csvFileKey,
							user: req.user,
						});
					} catch (error) {
						this.logger.error(`Bulk insert error on final batch: ${error}`);
					}
				}

				this.logger.log('CSV import completed successfully.');
				this.logger.info('Resuming job queue to process EcoInvent imports.', { bucket: bucketName, key: csvFileKey, user: req.user });
			})
			.on('error', error => {
				this.logger.error(`Error reading CSV: ${error}`);
				this.logger.info('Resuming job queue to process EcoInvent imports.', { bucket: bucketName, key: csvFileKey, user: req.user });
			});
	}

	async queueImportJobs(req: any, location?: string, reprocess?: boolean): Promise<any> {
		const filter: any[] = [];

		if (!reprocess) {
			filter.push({ job_status: 'PENDING' });
		}

		if (location) {
			filter.push({ location: location });
		}

		const imports = await this.prisma.ecoinvent_imports.findMany({
			where: {
				AND: filter,
			},
		});

		for (const row of imports) {
			const keyParts = row.key.split('.');

			const job = await this.queue.add(
				{
					jobId: row.id,
					bucket: row.bucket,
					user: req.user,
					organization: req.organization,
					key: row.key,
					lcia_key: `${keyParts[0]}.${keyParts[1]}.lcia_data.${keyParts[2]}`,
					activity_name: row.activity_name,
					location: row.location,
					reference_product: row.reference_product,
				},
				{ removeOnComplete: true },
			);

			await this.prisma.ecoinvent_imports.update({
				where: {
					id: row.id,
				},
				data: {
					job_status: 'QUEUED',
				},
			});

			this.logger.info(`Queuing import job for file ${row.key}.`, { bucket: row.bucket, key: row.key, user: req.user, job: job.data });
		}
	}
}
