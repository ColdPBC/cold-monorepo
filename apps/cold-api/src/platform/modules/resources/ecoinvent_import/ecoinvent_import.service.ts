import { Injectable } from '@nestjs/common';
import { CreateEcoinventImportDto } from './dto/create-ecoinvent_import.dto';
import { UpdateEcoinventImportDto } from './dto/update-ecoinvent_import.dto';
import { BaseWorker, PrismaService, S3Service } from '@coldpbc/nest';
import { EcoSpold2Schema } from './validation/ecoSpold2.schema';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EcoinventImportService extends BaseWorker {
	ecoSpoldSchema = EcoSpold2Schema;

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
	 * Parses CSV data into an array of objects.
	 * @param data CSV file content as string.
	 */
	private parseCSV(data: string): Promise<any[]> {
		return new Promise((resolve, reject) => {
			const results: any[] = [];
			const stream = Readable.from(data);
			stream
				.pipe(
					csvParser({
						separator: ';',
					}),
				)
				.on('data', row => results.push(row))
				.on('end', () => resolve(results))
				.on('error', err => reject(err));
		});
	}

	/**
	 * Imports CSV data from an S3 bucket.
	 * This function inserts each row into the EcoinventImport model.
	 * (This part remains largely unchanged.)
	 * @param bucketName Name of the S3 bucket.
	 * @param csvFileKey Key (filename) of the CSV file.
	 */
	async importCSVFromBucket(req: any, bucketName = 'cold-ecoinvent-data', csvFileKey = 'ecoinvent_ecospold2_3_11_cutoff/FilenameToActivityLookup.csv'): Promise<any> {
		try {
			const csvObject = await this.s3.getObject(req.user, bucketName, csvFileKey);

			const csvData = await csvObject?.Body?.transformToString('utf-8');

			if (!csvData) {
				this.logger.error(`Error reading CSV file from S3: ${csvFileKey}`);
				return;
			}

			const folder = `${csvFileKey.split('/')[0]}/datasets`;
			const rows = await this.parseCSV(csvData);
			this.logger.log(`Found ${rows.length} rows in CSV.`);

			for (const row of rows) {
				try {
					// Check if the file exists in S3
					await this.s3.getObject(req.user, bucketName, `${folder}/${row.Filename}`);
				} catch (e) {
					this.logger.error(`Error reading file from S3: ${folder}/${row.Filename}`);
					continue;
				}
				// Insert new record if it does not exist already.
				// (Assumes fileKey is unique.)
				try {
					let importRow = await this.prisma.ecoinvent_imports.upsert({
						where: { key: `${folder}/${row.Filename}` },
						update: {
							processing_status: 'PENDING',
						},
						create: {
							bucket: bucketName,
							key: `${folder}/${row.Filename}`,
							activity_name: row.ActivityName,
							location: row.Location,
							reference_product: row.ReferenceProduct,
							processing_status: 'PENDING',
						},
					});

					// Cancel job if one already exists
					const existingJob = await this.queue.getJob(importRow.id);
					if (existingJob) {
						await existingJob.discard();
					}

					// Queue a job to process the record.
					const job = await this.queue.add({
						jobId: importRow.id,
						bucket: bucketName,
						user: req.user,
						organization: req.organization,
						key: `${folder}/${row.Filename}`,
						activity_name: row.ActivityName,
						location: row.Location,
						reference_product: row.ReferenceProduct,
					});

					// Update the record with the job ID and status.
					importRow = await this.prisma.ecoinvent_imports.update({
						where: { id: importRow.id },
						data: {
							job_status: await job.getState(),
							processing_status: 'JOB_PROCESSING',
						},
					});

					this.logger.log(`Upserted and queued record for file ${row.Filename}`, importRow);
				} catch (insertError) {
					this.logger.error(`Error upserting record for file ${row.Filename}`, insertError);
					// Update the record with the job ID and status.
					const failed = await this.prisma.ecoinvent_imports.upsert({
						where: { key: `${folder}/${row.Filename}` },
						update: {
							processing_status: 'PROCESSING_ERROR',
						},
						create: {
							bucket: bucketName,
							key: `${folder}/${row.Filename}`,
							activity_name: row.ActivityName,
							location: row.Location,
							reference_product: row.ReferenceProduct,
							processing_status: 'PROCESSING_ERROR',
						},
					});

					this.logger.error(`Upserted record with error status for file ${row.Filename}`, { failed_row: failed, error: insertError });
				}
			}
		} catch (error) {
			this.logger.error('Error importing CSV file from S3', error);
			return { error };
		}
	}

	create(createEcoinventImportDto: CreateEcoinventImportDto) {
		return 'This action adds a new ecoinventImport';
	}

	findAll() {
		return `This action returns all ecoinventImport`;
	}

	findOne(id: number) {
		return `This action returns a #${id} ecoinventImport`;
	}

	update(id: number, updateEcoinventImportDto: UpdateEcoinventImportDto) {
		return `This action updates a #${id} ecoinventImport`;
	}

	remove(id: number) {
		return `This action removes a #${id} ecoinventImport`;
	}
}
