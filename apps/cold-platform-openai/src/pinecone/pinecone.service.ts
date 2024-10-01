import { BadRequestException, ConflictException, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, CacheService, Cuid2Generator, DarklyService, GuidPrefixes, IAuthenticatedUser, PrismaService, S3Service } from '@coldpbc/nest';
import { Pinecone, PineconeRecord, ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { ConfigService } from '@nestjs/config';
import { Document } from '@langchain/core/documents';
import OpenAI from 'openai';
import { LangchainLoaderService } from '../langchain/langchain.loader.service';
import { organization_files, organizations } from '@prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { fromBuffer } from 'pdf2pic';
import { Queue } from 'bull';
import { ExtractionService } from '../extraction/extraction.service';
import { ExtractionXlsxService } from '../extraction/extraction.xlsx.service';
import { PDFDocument } from 'pdf-lib';
import { pdfByteArrayToScreenshots } from '../extraction/screenShotPDFPages';

export type PineconeMetadata = {
	url: string;
	text: string;
	chunk: string;
	hash: string;
};

export interface OpenAiBase64ImageUrl {
	type: 'image_url';
	image_url: { url: string };
}

@Injectable()
export class PineconeService extends BaseWorker implements OnModuleInit {
	private pinecone: Pinecone;
	private openai: OpenAI;
	idGenerator = new Cuid2Generator(GuidPrefixes.Vector);

	constructor(
		readonly config: ConfigService,
		readonly cache: CacheService,
		readonly darkly: DarklyService,
		readonly lc: LangchainLoaderService,
		readonly prisma: PrismaService,
		readonly s3: S3Service,
		readonly extraction: ExtractionService,
		readonly xlsxService: ExtractionXlsxService,
		@InjectQueue('pinecone') readonly queue: Queue,
	) {
		super(PineconeService.name);
		this.openai = new OpenAI({
			organization: this.config.getOrThrow('OPENAI_ORG_ID'),
			apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
		});
	}

	async getIndexDetails(indexName?: string) {
		const config = {
			dimension: 3072,
			model: 'text-embedding-3-large',
			index: indexName ? indexName : 'cold-clients-3-large',
		};

		await this.createIndex(config.index, config.dimension);

		return { indexName: config.index, config };
	}

	async syncOrgFiles(user: IAuthenticatedUser, org: any, delay = 0, type: 'web' | 'files' | 'all') {
		if (!org) {
			throw new Error(`Organization not found: ${org.id}`);
		}

		const details = await this.getIndexDetails();

		const index = await this.getIndex();

		try {
			switch (type) {
				case 'web':
					{
						const vectors = await this.prisma.vector_records.findMany({
							where: {
								organization_id: org.id,
								NOT: {
									url: null,
								},
							},
						});

						await index.namespace(org.name).deleteMany(vectors.map(v => v.id));
						await this.prisma.vector_records.deleteMany({
							where: {
								id: {
									in: vectors.map(v => v.id),
								},
							},
						});
					}
					await index.namespace(org.name).deleteMany({
						type: { $eq: 'web' },
						org_id: { $eq: org.id },
					});
					break;
				case 'files':
					await index.namespace(org.name).deleteMany({
						type: { $eq: 'file' },
						org_id: { $eq: org.id },
					});
					break;
				case 'all':
					await index.namespace(org.name).deleteAll();
					break;
			}
		} catch (err) {
			err.statusCode !== 404 && this.logger.error(err.message, { stack: err.stack, message: err.message });
		}

		if (Array.isArray(org['organization_files']) && org['organization_files'].length > 0) {
			this.logger.info(`rebuilding ${org['organization_files'].length} file emeddings for ${org.name}`);
		}

		const files = await this.prisma.organization_files.findMany({
			where: {
				organization_id: org.id,
			},
		});

		for (const file of files) {
			this.logger.info(`adding job to sync ${file.original_name} for ${org.name} to queue`);

			await this.queue.add(
				'sync_files',
				{
					user,
					organization: org,
					file,
					index_details: details,
				},
				{ removeOnComplete: true, delay, priority: 10 },
			);

			this.logger.info(`Syncing org file ${file.original_name}`, { org, file });
		}

		return;
	}

	async syncAllOrgFiles(user: IAuthenticatedUser) {
		if (!user.isColdAdmin) {
			throw new UnauthorizedException('You do not have the correct role to execute this action');
		}

		this.logger.info('rebuilding pinecone data for all orgs...');

		await this.darkly.onModuleInit();
		const orgs = (await this.prisma.organizations.findMany({
			select: {
				id: true,
				name: true,
				organization_files: true,
			},
		})) as any[];

		const indexList: any = (await this.pinecone.listIndexes()) as { indexes: any[] };

		if (!indexList && !indexList.indexes) {
			//throw new NotFoundError('No pinecone indexes found');
			return;
		}

		this.logger.info(`deleting ${indexList.indexes.length} indexes in pinecone environment...`);

		for (const index of indexList.indexes as any[]) {
			this.logger.info(`deleting index ${index.name}`);
			await this.pinecone.deleteIndex(index.name);
		}

		for (const org of orgs) {
			this.logger.info(`deleting cached vectors for ${org.name}`);
			await this.prisma.vector_records.deleteMany({
				where: {
					organization_id: org.id,
				},
			});

			await this.syncOrgFiles(user, org, 0, 'all');
		}

		return { message: 'Sync jobs created for all files across all orgs', orgs };
	}

	async onModuleInit(): Promise<void> {
		try {
			this.pinecone = new Pinecone({
				apiKey: this.config.getOrThrow('PINECONE_API_KEY'),
			});

			/*const automateInjestion = await this.darkly.getBooleanFlag('config-enable-automated-pinecone-injestion', false);
      if (automateInjestion) {
        const orgs = (await this.prisma.organizations.findMany({
          select: {
            id: true,
            name: true,
          },
        })) as organizations[];

        for (const org of orgs) {
          await this.syncOrgFiles(
            {
              coldclimate_claims: {
                id: 'system',
                email: 'system',
                org_id: org.id,
                roles: ['cold:admin'],
              },
            },
            org,
            60000 * 4,
          );
        }
      }*/
		} catch (error) {
			console.log('error', error);
			throw new Error('Failed to initialize Pinecone Client');
		}
	}

	async getContext(message: string, namespace: string, indexName: string, minScore = 0.0, getOnlyText = true): Promise<string | ScoredPineconeRecord[]> {
		const indexDetails = await this.getIndexDetails();
		// Get the embeddings of the input message
		message =
			message
				.replace(/\n/g, ' ')
				// eslint-disable-next-line no-control-regex
				.replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, '')
				// eslint-disable-next-line
				.replace(/[^\x01-\x7F\n\r!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~A-Za-z0-9]/g, '') || '';

		const embedding = await this.embedString(message);

		// Retrieve the matches for the embeddings from the specified namespace
		const matches = await this.getMatchesFromEmbeddings(embedding, 5, namespace, indexDetails.indexName);

		if (!matches || matches.length < 1) {
			this.logger.warn('No documents matched embedding', { message, namespace, index: indexDetails.indexName });
			return [];
		}
		// Filter out the matches that have a score lower than the minimum score
		const qualifyingDocs: any = matches.filter(m => m.score && m.score > minScore);

		if (Array.isArray(qualifyingDocs) && qualifyingDocs.length < 1) {
			this.logger.info(`No qualifying docs found with score greater than ${minScore}`, {
				message,
				minScore,
				docs: matches.length,
				topk: 5,
				namespace,
				index: indexDetails.indexName,
			});
		} else {
			this.logger.info('Retrieved docs from index', {
				message,
				docs: qualifyingDocs.length,
				topK: 5,
				namespace,
				index: indexDetails.indexName,
			});
		}

		if (!getOnlyText) {
			return qualifyingDocs;
		}

		// Use a map to deduplicate matches by URL
		const docs = matches
			? qualifyingDocs.map(match => {
					if (!match?.metadata?.file_name && !match?.metadata?.url) {
						return '';
					}
					const item = {
						name: match.metadata['file_name'] || match.metadata['url'],
						text: match?.metadata?.chunk,
					};
					return JSON.stringify(item);
			  })
			: [];

		// Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
		return docs.join('\n');
	}

	async gets3File(file: any, user) {
		const bucket = `cold-api-uploaded-files`;

		const extension = file.key.split('.').pop();
		const s3File = await this.s3.getObject(user, bucket, file.key);

		if (!s3File.Body) {
			throw new Error(`File not found: ${file.key}`);
		}

		return { s3File, extension };
	}

	// The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
	async getMatchesFromEmbeddings(embeddings: number[], topK: number, namespace: string, indexName: string): Promise<ScoredPineconeRecord<PineconeMetadata>[]> {
		// Obtain a client for Pinecone
		const pinecone = new Pinecone({
			apiKey: this.config.getOrThrow('PINECONE_API_KEY'),
		});

		// Retrieve the list of indexes to check if expected index exists
		const indexes = await this.listIndexes();
		if (!indexes || indexes.filter(i => i.name === `${indexName}`).length !== 1) {
			throw new Error(`Index ${indexName} does not exist`);
		}

		// Get the Pinecone index
		const index = pinecone!.Index<PineconeMetadata>(`${indexName}`);

		// Get the namespace
		const pineconeNamespace = index.namespace(namespace ?? '');

		try {
			// Query the index with the defined request
			const queryResult = await pineconeNamespace.query({
				vector: embeddings,
				topK,
				includeMetadata: true,
			});
			return queryResult.matches || [];
		} catch (e) {
			// Log the error and throw it
			this.logger.log(`Error querying embeddings: ${e.message}`, { stack: e.stack, message: e.message });
			throw new Error(`Error querying embeddings: ${e}`);
		}
	}

	async embedWebContent(doc: Document, metadata: any) {
		// Generate OpenAI embeddings for the document content
		doc.pageContent =
			doc.pageContent
				.replace(/\n/g, ' ')
				// eslint-disable-next-line no-control-regex
				.replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, '')
				// eslint-disable-next-line
				.replace(/[^\x01-\x7F\n\r!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~A-Za-z0-9]/g, '') || '';

		const embedding = await this.embedString(doc.pageContent);

		// Return the vector embedding object
		const record = {
			id: this.idGenerator.generate().scopedId, // The ID of the vector
			values: embedding, // The vector values are the OpenAI embeddings
			metadata: {
				// The metadata includes details about the document
				chunk: doc.pageContent, // The chunk of text that the vector represents
				...metadata,
			},
		} as PineconeRecord;

		return record;
	}

	async embedDocument(doc: Document, org_file: any, org_name: string): Promise<PineconeRecord> {
		try {
			doc.pageContent =
				doc.pageContent
					.replace(/\n/g, ' ')
					// eslint-disable-next-line no-control-regex
					.replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, '')
					// eslint-disable-next-line
					.replace(/[^\x01-\x7F\n\r!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~A-Za-z0-9]/g, '') || '';

			// Generate OpenAI embeddings for the document content
			const embedding = await this.embedString(doc.pageContent);

			// Return the vector embedding object
			const record = {
				id: this.idGenerator.generate().scopedId, // The ID of the vector
				values: embedding, // The vector values are the OpenAI embeddings
				metadata: {
					// The metadata includes details about the document
					chunk: doc.pageContent, // The chunk of text that the vector represents
					cold_file_id: org_file.id,
					bucket: org_file.bucket,
					key: org_file.key,
					checksum: org_file.checksum,
					organization_id: org_file.organization_id,
					file_name: org_file.original_name,
					mimetype: org_file.mimetype,
					size: org_file.size.toString(),
				},
			} as PineconeRecord;

			const indexDetails = await this.getIndexDetails();

			try {
				await this.prisma.vector_records.create({
					data: {
						id: record.id,
						organization_id: org_file.organization_id,
						organization_file_id: org_file.id,
						values: embedding,
						namespace: org_name,
						index_name: indexDetails.indexName,
						metadata: record.metadata || {},
					},
				});
			} catch (e) {
				this.logger.error(e.message, { stack: e.stack, message: e.message });
			}

			return record;
		} catch (error) {
			console.log('Error embedding document: ', error);
			throw error;
		}
	}

	async embedWebDocument(doc: Document, org: any): Promise<PineconeRecord> {
		try {
			doc.pageContent =
				doc.pageContent
					.replace(/\n/g, ' ')
					// eslint-disable-next-line no-control-regex
					.replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, '')
					// eslint-disable-next-line
					.replace(/[^\x01-\x7F\n\r!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~A-Za-z0-9]/g, '') || '';

			// Generate OpenAI embeddings for the document content
			const embedding = await this.embedString(doc.pageContent);

			// Return the vector embedding object
			const record = {
				id: this.idGenerator.generate().scopedId, // The ID of the vector
				values: embedding, // The vector values are the OpenAI embeddings
				metadata: {
					type: 'web',
					org_id: org.id,
					org_name: org.name,
					year: new Date().getFullYear(),
					month: new Date().getMonth(),
					chunk: doc.pageContent, // The chunk of text that the vector represents
				},
			} as PineconeRecord;

			return record;
		} catch (error) {
			console.log('Error embedding document: ', error);
			throw error;
		}
	}

	async embedString(input: string) {
		try {
			if (!input) {
				throw new Error(`Input is requrired: ${input}`);
			}

			const indexDetail = await this.getIndexDetails();
			const embeddingConfig = {
				model: indexDetail.config.model,
				input,
			};

			const response = await this.openai.embeddings.create(embeddingConfig);

			return response.data[0].embedding;
		} catch (e) {
			this.logger.log('Error calling OpenAI embedding API: ', e);
			throw new Error(`Error calling OpenAI embedding API: ${e}`);
		}
	}

	async uploadData(organization: any, user: any, filePayload: any, index: any) {
		try {
			if (!filePayload) {
				throw new Error('No file payload found');
			}

			if (filePayload?.vector_records && filePayload?.vector_records.length > 0) {
				for (const v of filePayload.vector_records) {
					this.logger.info(`checking if ${v.id} of ${filePayload.original_name} exists in db`);
					const found = await index.namespace(organization.name).query({
						vector: v.values,
						topK: 1,
						includeValues: true,
					});
					if (found.matches < 1) {
						this.logger.info(`upserting missing ${v.id} of ${filePayload.original_name}`);
						const item = { id: v.id, values: v.values, metadata: v.metadata };
						index.namespace(organization.name).upsert([item]);
						this.logger.info(`upserted ${v.id} of ${filePayload.original_name} to namespace ${organization.name} in index ${index.name}`);
					}
				}
			}

			let extension = filePayload?.key.split('.').pop();

			let bytes: Uint8Array = new Uint8Array();

			if (['png', 'jpg', 'gif', 'bmp', 'tiff', 'jpeg', 'heic'].includes(extension.toLowerCase())) {
				const url = await this.s3.getSignedURL(user, filePayload?.bucket, filePayload?.key, 3600);
				const response = await this.extraction.extractDataFromContent(url, user, filePayload, organization);

				if (response) {
					// Encode the JSON string to a byte array
					const encoder = new TextEncoder();
					bytes = encoder.encode(JSON.stringify(response));
				}
			} else if (extension === 'xlsx') {
				const pdfBytes = await this.convertXlsToPdf(user, filePayload, organization);

				if (!pdfBytes) {
					throw new Error(`Failed to convert ${filePayload.original_name} to pdf`);
				}

				bytes = pdfBytes;
				// set extension to PDF since it's now been converted
				extension = 'pdf';
			} else {
				// Process PDF
				const bucket = `cold-api-uploaded-files`;
				const s3File = await this.s3.getObject(user, bucket, filePayload?.key);

				if (!s3File?.Body) {
					throw new Error(`File not found: ${filePayload?.key}`);
				}

				bytes = await s3File.Body.transformToByteArray();
			}

			if (!bytes || bytes.length < 1) {
				throw new Error(`No bytes found in ${filePayload?.original_name}`);
			}

			//const images: OpenAiBase64ImageUrl[] = await this.processPdfPages(bytes, filePayload, user, organization);

			//await this.extraction.extractDataFromImages(images, user, filePayload, organization);

			// Load the document content from the file and split it into chunks
			const content = await this.lc.getDocContent(extension, bytes, user);

			if (Array.isArray(content) && content.length > 0) {
				// Store the vector embeddings for the document
				await this.persistEmbeddings(index, content, filePayload, organization);

				//await this.extraction.extractDataFromContent(content, user, filePayload, organization);
			} else {
				// Attempt to convert PDF to Image since no text content found
				//this.logger.warn(`No text content found in ${filePayload?.original_name}; converting to image`);

				extension = 'pdf';

				// Create embedding for content
				//const embedding = (await this.lc.getDocContent('txt', bytes, user)) as Document<Record<string, any>>[];

				//await this.persistEmbeddings(index, embedding, filePayload, organization);
			}

			return { bytes, extension, organization, user, filePayload };
		} catch (e) {
			this.logger.error(e.message, { error: e, namespace: organization.name, file: filePayload });

			this.metrics.increment('pinecone.index.upsert', 1, { namespace: organization.name, status: 'failed' });
			throw e;
		}
	}

	private async convertXlsToPdf(user: any, filePayload: any, organization: any) {
		// Process Spreadsheet
		try {
			const s3File = await this.s3.getObject(user, filePayload.bucket, filePayload.key);
			const bytes = await s3File?.Body?.transformToByteArray();

			if (!bytes) {
				throw new BadRequestException('Failed to load file');
			}

			const fileData = await this.xlsxService.convertXLS(bytes, filePayload, user, organization);

			if (!fileData || !fileData.file || !fileData.bytes) {
				throw new Error(`Failed to convert ${filePayload.original_name} to pdf`);
			}

			return fileData.bytes;
		} catch (e) {
			this.logger.error('Error converting xlsx to image', { error: e, namespace: organization.name });
			throw e;
		}
	}

	async persistEmbeddings(index: any, content: Document<Record<string, any>>[], filePayload: any, organization: { name: string }) {
		// Get the vector embeddings for the document
		const embeddings = await Promise.all(content.flat().map(doc => this.embedDocument(doc, filePayload, organization.name)));
		for (const v of embeddings) {
			const record = { id: v.id, values: v.values, metadata: v.metadata };
			index.namespace(organization.name).upsert([record]);
		}
	}

	async ingestData(
		user:
			| AuthenticatedUser
			| {
					coldclimate_claims: { email: string };
			  },
		organization: any,
		filePayload: organization_files,
		indexDetails?: any,
	) {
		const vectors: PineconeRecord[] = [];
		try {
			/*if (!(await this.darkly.getBooleanFlag('config-enable-pinecone-injestion'))) {
        const message = 'Pinecone ingestion is disabled.  To enable, turn on targeting for `config-enable-pinecone-injestion` flag in launch darkly';
        this.logger.warn(message);
      }*/

			const details = indexDetails || (await this.getIndexDetails());

			const org_file = await this.prisma.organization_files.findUnique({
				where: {
					id: filePayload.id,
				},
				include: {
					vector_records: {
						where: {
							index_name: details.indexName,
							namespace: organization.name,
						},
					},
				},
			});

			const index = await this.getIndex();

			if (!org_file) {
				throw new Error(`File not found: ${filePayload.id}`);
			}

			return await this.uploadData(organization, user, org_file, index);
		} catch (error) {
			if (error instanceof ConflictException) {
				this.logger.warn(error.message);
				return;
			}

			this.logger.error('injesting files failed', error);

			this.prisma.vector_records.deleteMany({
				where: {
					id: {
						in: vectors.map(v => v.id),
					},
				},
			});

			throw error;
		}
	}

	async listIndexes() {
		if (!this.pinecone) {
			await this.onModuleInit();
		}

		try {
			const indexes = await this.pinecone.listIndexes();

			return indexes.indexes;
		} catch (error) {
			this.logger.error(error.message, { stack: error.stack, message: error.message });
			throw new Error('Error fetching indexes');
		}
	}

	async loadWebFile(url: string, org: organizations) {
		const details = await this.getIndexDetails();
		const index = await this.getIndex();
		const response = await this.lc.getWebFileContent(url);
		// Get the vector embeddings for the document
		const embeddings = await Promise.all(response.flat().map(doc => this.embedWebDocument(doc, org)));

		const urlParts = new URL(url);
		const parsedUrl = `${urlParts.protocol}//${urlParts.hostname}${urlParts.pathname}`;

		for (const v of embeddings) {
			const record = { id: v.id, values: v.values, metadata: { ...v.metadata, url: parsedUrl } };
			await index.namespace(org.name).upsert([record]);
		}

		try {
			await this.prisma.vector_records.create({
				data: {
					id: new Cuid2Generator(GuidPrefixes.Vector).scopedId,
					organization_id: org.id,
					values: embeddings,
					namespace: org.name,
					index_name: details.indexName,
					url: parsedUrl,
					metadata: { originalUrl: url },
				},
			});
		} catch (e) {
			this.logger.error(e.message, { stack: e.stack, message: e.message });
		}
	}

	async getIndex() {
		const details = await this.getIndexDetails();

		if (!this.pinecone) {
			await this.onModuleInit();
		}

		try {
			const index = this.pinecone.Index(details.indexName);

			return index;
		} catch (error) {
			this.logger.error(error.message, { stack: error.stack, message: error.message });
			throw error;
		}
	}

	async createIndex(targetIndex: string, dimension: number) {
		if (!this.pinecone) {
			await this.onModuleInit();
		}

		const response = await this.pinecone.listIndexes();
		if (response?.indexes?.some(item => item.name === targetIndex)) {
			return this.pinecone.index(targetIndex);
		}

		try {
			const idx = await this.pinecone.createIndex({
				name: targetIndex,
				dimension: dimension,
				spec: {
					serverless: {
						cloud: 'aws',
						region: 'us-east-1',
					},
				},
				suppressConflicts: true,
				waitUntilReady: true,
			});

			this.logger.info(`created ${targetIndex} index`);
			this.metrics.increment('pinecone.index', 1, { index: targetIndex, status: 'created' });
			return idx;
		} catch (e) {
			this.metrics.increment('pinecone.index', 1, { index: targetIndex, status: 'failed' });
			if (e.statusCode !== 404) {
				this.logger.error(e.message, { stack: e.stack, message: e.message });
			}
		}
	}

	async deleteIndex(targetIndex: string) {
		if (!this.pinecone) {
			await this.onModuleInit();
		}

		try {
			if (!this.pinecone) {
				await this.onModuleInit();
			}

			const response = await this.pinecone.listIndexes();
			if (response?.indexes?.some(item => item.name === targetIndex)) {
				const indexDetails = this.pinecone.index(targetIndex);
				if (!indexDetails) {
					await this.pinecone.deleteIndex(targetIndex);
				}
			}

			return { message: `Deleted ${targetIndex} index successfully.` };
		} catch (error) {
			this.logger.error(error.message, { stack: error.stack, message: error.message });
			throw error;
		}
	}

	async removeWebVectors(org: organizations) {
		try {
			const webVectors = await this.prisma.vector_records.findMany({
				where: {
					organization_id: org.id,
					NOT: {
						url: null,
					},
				},
			});

			const webVectorIds = webVectors.map(v => v.id);

			const index = await this.getIndex();
			// delete from pinecone
			if (webVectorIds.length > 0) {
				await index.namespace(org.name).deleteMany(webVectorIds);
				// delete from db
				await this.prisma.vector_records.deleteMany({
					where: {
						id: {
							in: webVectorIds,
						},
					},
				});
			}
		} catch (e) {
			this.logger.error(e.message, { stack: e.stack, message: e.message });
		}
	}

	getCacheKey(filePayload: any) {
		const split = `pinecone:${filePayload.key.replaceAll('/', ':')}`.split(':');
		split.pop();
		split.push(filePayload.checksum);
		return split.join(':');
	}

	async deleteNamespace(namespace: string) {
		const index = await this.getIndex();
		await index.namespace(namespace).deleteAll();
	}
}
