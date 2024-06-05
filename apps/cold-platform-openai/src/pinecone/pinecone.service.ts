import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, CacheService, Cuid2Generator, DarklyService, GuidPrefixes, PrismaService } from '@coldpbc/nest';
import { Pinecone, PineconeRecord, ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { ConfigService } from '@nestjs/config';
import { Document } from '@langchain/core/documents';
import OpenAI from 'openai';
import { LangchainLoaderService } from '../langchain/langchain.loader.service';
import { organization_files, organizations } from '@prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export type PineconeMetadata = {
  url: string;
  text: string;
  chunk: string;
  hash: string;
};

@Injectable()
export class PineconeService extends BaseWorker implements OnModuleInit {
  public pinecone: Pinecone;
  public openai: OpenAI;
  idGenerator = new Cuid2Generator(GuidPrefixes.Vector);

  constructor(
    readonly config: ConfigService,
    readonly cache: CacheService,
    readonly darkly: DarklyService,
    readonly lc: LangchainLoaderService,
    readonly prisma: PrismaService,
    @InjectQueue('pinecone') readonly queue: Queue,
  ) {
    super(PineconeService.name);
    this.openai = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async getIndexDetails(org_name) {
    let config = await this.darkly.getJSONFlag(
      'config-embedding-model',

      {
        kind: 'organization',
        key: org_name,
        name: org_name,
      },
    );

    if (!config) {
      config = {
        dimension: 3072,
        model: 'text-embedding-3-large',
      };
    }

    const indexName = `${org_name}-${config.model.split('-').slice(2).join('-')}`;

    await this.createIndex(indexName, config.dimension);

    return { indexName, config };
  }

  async syncOrgFiles(
    user:
      | AuthenticatedUser
      | {
          coldclimate_claims: { org_id: string; roles: string[]; id: string; email: string };
        },
    orgId: string,
    delay: number = 0,
  ) {
    const org = await this.prisma.organizations.findUnique({
      where: {
        id: orgId,
      },
      include: {
        organization_files: true,
      },
    });

    if (!org) {
      throw new Error(`Organization not found: ${orgId}`);
    }

    const details = await this.getIndexDetails(org.name);

    for (const file of org.organization_files) {
      await this.queue.add(
        'sync_files',
        {
          user,
          organization: org,
          file,
          index_details: details,
        },
        { removeOnComplete: true, delay },
      );
    }

    return { message: 'Syncing org files', org };
  }

  async syncAllOrgFiles(user: AuthenticatedUser) {
    await this.darkly.onModuleInit();
    const orgs = await this.prisma.organizations.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    for (const org of orgs) {
      this.syncOrgFiles(user, org.id);
    }

    return { message: 'Sync jobs created for all files across all orgs', orgs };
  }

  async onModuleInit(): Promise<void> {
    try {
      this.pinecone = new Pinecone({
        apiKey: this.config.getOrThrow('PINECONE_API_KEY'),
      });

      const automateInjestion = await this.darkly.getBooleanFlag('config-enable-automated-pinecone-injestion', false);
      if (automateInjestion) {
        const orgs = await this.prisma.organizations.findMany({
          select: {
            id: true,
            name: true,
          },
        });

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
            org.id,
            60000 * 4,
          );
        }
      }
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to initialize Pinecone Client');
    }
  }

  // The function `getContext` is used to retrieve the context of a given message
  async getContext(message: string, namespace: string, indexName: string, minScore = 0.7, getOnlyText = true): Promise<string | ScoredPineconeRecord[]> {
    const indexDetails = await this.getIndexDetails(indexName);
    // Get the embeddings of the input message
    const embedding = await this.embedString(message, indexName);

    // Retrieve the matches for the embeddings from the specified namespace
    const matches = await this.getMatchesFromEmbeddings(embedding, 5, namespace, indexDetails.indexName);

    // Filter out the matches that have a score lower than the minimum score
    const qualifyingDocs: any = matches.filter(m => m.score && m.score > minScore);

    if (!qualifyingDocs) {
      this.logger.info('No qualifying docs found', {
        message,
        docs: qualifyingDocs,
        topk: 5,
        namespace,
        index: indexDetails.indexName,
      });
    } else {
      this.logger.info('Retrieved docs from index', {
        message,
        docs: qualifyingDocs,
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
      this.logger.log(`Error querying embeddings: ${e.message}`, { ...e });
      throw new Error(`Error querying embeddings: ${e}`);
    }
  }

  async embedWebContent(doc: Document, metadata: any) {
    // Generate OpenAI embeddings for the document content
    const embedding = await this.embedString(doc.pageContent, metadata.organization);

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
      // Generate OpenAI embeddings for the document content
      const embedding = await this.embedString(doc.pageContent, org_name);

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

      const indexDetails = await this.getIndexDetails(org_name);

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
        this.logger.error(e.message, { ...e });
      }

      return record;
    } catch (error) {
      console.log('Error embedding document: ', error);
      throw error;
    }
  }

  async embedString(input: string, org_name: string) {
    try {
      if (!input) {
        throw new Error(`Input is requrired: ${input}`);
      }

      const indexDetail = await this.getIndexDetails(org_name);
      const embeddingConfig = {
        model: indexDetail.config.model,
        // eslint-disable-next-line no-control-regex
        input: input?.replace(/\n/g, ' ').replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, '') || '',
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
      if (filePayload.vector_records && filePayload.vector_records.length > 0) {
        for (const v of filePayload.vector_records) {
          const found = await index.namespace(organization.name).query({
            vector: v.values,
            topK: 1,
            includeValues: true,
          });
          if (found.matches < 1) {
            this.logger.info(`upserting missing ${v.id} of ${filePayload.original_name}`);
            const item = { id: v.id, values: v.values, metadata: v.metadata };
            index.namespace(organization.name).upsert([item]);
          } else {
            this.logger.info(`${v.id} of ${filePayload.original_name} already injected`);
          }
        }
      } else {
        // Load the document content from the file and split it into chunks
        const content = await this.lc.getDocContent(filePayload, user);

        // Get the vector embeddings for the document
        const embeddings = await Promise.all(content.flat().map(doc => this.embedDocument(doc, filePayload, organization.name)));
        for (const v of embeddings) {
          const record = { id: v.id, values: v.values, metadata: v.metadata };
          index.namespace(organization.name).upsert([record]);
        }
      }
    } catch (e) {
      this.logger.error('Error upserting chunk', { error: e, namespace: organization.name });

      this.metrics.increment('pinecone.index.upsert', 1, { namespace: organization.name, status: 'failed' });
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
    namespaceName?: string,
    indexDetails?: any,
  ) {
    const vectors: PineconeRecord[] = [];
    try {
      if (!(await this.darkly.getBooleanFlag('config-enable-pinecone-injestion'))) {
        const message = 'Pinecone ingestion is disabled.  To enable, turn on targeting for `config-enable-pinecone-injestion` flag in launch darkly';
        this.logger.warn(message);
      }

      const details = indexDetails || (await this.getIndexDetails(organization.name));
      if (!namespaceName) {
        namespaceName = organization.name;
      }

      const org_file = await this.prisma.organization_files.findUnique({
        where: {
          id: filePayload.id,
        },
        include: {
          vector_records: {
            where: {
              index_name: details.indexName,
              namespace: namespaceName,
            },
          },
        },
      });

      const index = await this.getIndex(organization.name);

      await this.uploadData(organization, user, org_file, index);
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

      throw new Error('Failed to ingest your data');
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
      this.logger.error(error.message, { ...error });
      throw new Error('Error fetching indexes');
    }
  }

  async getIndex(targetIndex: string) {
    const details = await this.getIndexDetails(targetIndex);

    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      const index = this.pinecone.Index(details.indexName);

      return index;
    } catch (error) {
      this.logger.error(error.message, { ...error });
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

      this.logger.info(`created index for ${targetIndex}`);
      this.metrics.increment('pinecone.index', 1, { index: targetIndex, status: 'created' });
      return idx;
    } catch (e) {
      this.metrics.increment('pinecone.index', 1, { index: targetIndex, status: 'failed' });
      if (e.statusCode !== 404) {
        this.logger.error(e.message, { ...e });
      }
    }
  }

  async deleteIndex(targetIndex: string) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      const indexDetails = await this.getIndexDetails(targetIndex);
      await this.pinecone.deleteIndex(indexDetails.indexName);

      return { message: 'Index deleted successfully.' };
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw error;
    }
  }

  async removeWebVectors(org: organizations) {
    const webVectors = await this.prisma.vector_records.findMany({
      where: {
        organization_id: org.id,
        url: org.website,
      },
    });

    const webVectorIds = webVectors.map(v => v.id);

    const details = await this.getIndexDetails(org.name);
    const index = await this.getIndex(details.indexName);
    // delete from pinecone
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

  getCacheKey(filePayload: any) {
    const split = `pinecone:${filePayload.key.replaceAll('/', ':')}`.split(':');
    split.pop();
    split.push(filePayload.checksum);
    return split.join(':');
  }
}
