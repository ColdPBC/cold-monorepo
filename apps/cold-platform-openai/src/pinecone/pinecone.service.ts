import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, CacheService, Cuid2Generator, DarklyService, PrismaService } from '@coldpbc/nest';
import { Index, Pinecone, PineconeRecord, RecordMetadata, ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { ConfigService } from '@nestjs/config';
import { PineconeStore } from '@langchain/pinecone';
import { Document } from '@langchain/core/documents';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import OpenAI from 'openai';
import { LangchainLoaderService } from '../langchain/langchain.loader.service';

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
  idGenerator = new Cuid2Generator('vector');

  constructor(
    private readonly config: ConfigService,
    private readonly cache: CacheService,
    private readonly darkly: DarklyService,
    private readonly lc: LangchainLoaderService,
    private readonly prisma: PrismaService,
  ) {
    super(PineconeService.name);
    this.openai = new OpenAI({
      organization: this.config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      this.pinecone = new Pinecone({
        apiKey: this.config.getOrThrow('PINECONE_API_KEY'),
      });
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to initialize Pinecone Client');
    }
  }

  // The function `getContext` is used to retrieve the context of a given message
  async getContext(message: string, namespace: string, indexName: string, minScore = 0.7, getOnlyText = true): Promise<string | ScoredPineconeRecord[]> {
    // Get the embeddings of the input message
    const embedding = await this.embedString(message);

    // Retrieve the matches for the embeddings from the specified namespace
    const matches = await this.getMatchesFromEmbeddings(embedding, 5, namespace, indexName);

    // Filter out the matches that have a score lower than the minimum score
    const qualifyingDocs = matches.filter(m => m.score && m.score > minScore);

    this.logger.info('Retrieved docs from index', qualifyingDocs);

    if (!getOnlyText) {
      return qualifyingDocs;
    }

    // Use a map to deduplicate matches by URL
    const docs = matches
      ? qualifyingDocs.map(match => {
          const item = {
            name: match.metadata['file_name'],
            text: match.metadata.chunk,
          };
          return JSON.stringify(item);
        })
      : [];

    // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
    return docs.join('\n').substring(0, 3000);
  }

  // The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
  async getMatchesFromEmbeddings(embeddings: number[], topK: number, namespace: string, indexName: string): Promise<ScoredPineconeRecord<PineconeMetadata>[]> {
    // Obtain a client for Pinecone
    const pinecone = new Pinecone({
      apiKey: this.config.getOrThrow('PINECONE_API_KEY'),
    });

    // Retrieve the list of indexes to check if expected index exists
    const indexes = await this.listIndexes();
    if (!indexes || indexes.filter(i => i.name === indexName).length !== 1) {
      throw new Error(`Index ${indexName} does not exist`);
    }

    // Get the Pinecone index
    const index = pinecone!.Index<PineconeMetadata>(indexName);

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
      this.logger.log('Error querying embeddings: ', e);
      throw new Error(`Error querying embeddings: ${e}`);
    }
  }

  async embedWebContent(doc: Document, metadata: any) {
    // Generate OpenAI embeddings for the document content
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

  async embedDocument(doc: Document, org_file: any): Promise<PineconeRecord> {
    try {
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

      await this.prisma.vector_records.create({
        data: {
          id: record.id,
          organization_id: org_file.organization_id,
          organization_file_id: org_file.id,
          metadata: record.metadata,
        },
      });

      return record;
    } catch (error) {
      console.log('Error embedding document: ', error);
      throw error;
    }
  }

  async embedString(input: string) {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: input.replace(/\n/g, ' '),
      });

      return response.data[0].embedding;
    } catch (e) {
      this.logger.log('Error calling OpenAI embedding API: ', e);
      throw new Error(`Error calling OpenAI embedding API: ${e}`);
    }
  }

  async ingestData(user: AuthenticatedUser, organization: any, filePayload: any, namespaceName?: string) {
    let vectors: PineconeRecord[];
    try {
      if (!(await this.darkly.getBooleanFlag('config-enable-pinecone-injestion'))) {
        const message = 'Pinecone ingestion is disabled.  To enable, turn on targeting for `config-enable-pinecone-injestion` flag in launch darkly';
        this.logger.warn(message);
        return message;
      }
      const cacheKey = this.getCacheKey(filePayload);

      const exists = await this.cache.get(cacheKey);
      if (exists) {
        throw new ConflictException(`${filePayload.key} (${filePayload.checksum}) already ingested`);
      }

      const org_file = await this.prisma.organization_files.findUnique({
        where: {
          s3Key: {
            organization_id: organization.id,
            key: filePayload.key,
            bucket: filePayload.bucket,
          },
        },
      });

      if (!namespaceName) {
        namespaceName = organization.name;
      }

      await this.createIndex(organization.name);

      const index = this.pinecone.Index(organization.name);

      // Load the document content from the file and split it into chunks
      const content = await this.lc.getDocContent(filePayload, user);

      // Get the vector embeddings for the documents
      vectors = await Promise.all(content.flat().map(doc => this.embedDocument(doc, org_file)));

      const chunkSize = await this.darkly.getNumberFlag('dynamic-langchain-chunkSize', 1000);

      // Upsert vectors into the Pinecone index
      await this.chunkedUpsert(index!, vectors, namespaceName, chunkSize);

      await this.cache.set(this.getCacheKey(filePayload), filePayload.checksum, { ttl: 0 });

      return { message: `${organization.name} S3 file ingestion complete` };
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

  async getVectorStore(indexName: string) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      await this.createIndex(indexName);

      const index = this.pinecone.Index(indexName);

      const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({
          openAIApiKey: this.config.getOrThrow('OPENAI_API_KEY') as string,
        }),
        {
          pineconeIndex: index,
          namespace: indexName,
        },
      );

      return vectorStore;
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw new Error('Error fetching vector store');
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

  async injestWebContent(targetIndex: string, embeddings: Array<PineconeRecord<any>>) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      const index = this.pinecone.Index(targetIndex);

      const upsertResponse = await index.upsert(embeddings);

      return upsertResponse;
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw error;
    }
  }

  async describeIndex(targetIndex: string) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      const index = this.pinecone.Index(targetIndex);

      const indexStatsResponse = await index.describeIndexStats();

      return indexStatsResponse;
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw error;
    }
  }

  async getIndex(targetIndex: string) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      const index = this.pinecone.Index(targetIndex);

      return index;
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw error;
    }
  }

  async createIndex(targetIndex: string, dimension: number = 1536) {
    if (!this.pinecone) {
      await this.onModuleInit();
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

      return idx;
    } catch (e) {
      if (e.statusCode !== 404) {
        this.logger.error(e.message, { ...e });
      }
    }
  }

  async chunkedUpsert(index: Index, vectors: Array<PineconeRecord<RecordMetadata>>, namespace: string, chunkSize = 1000) {
    try {
      // Split the vectors into chunks
      const chunks = this.sliceIntoChunks<PineconeRecord>(vectors, chunkSize);

      // Upsert each chunk of vectors into the index
      await Promise.allSettled(
        chunks.map(async chunk => {
          try {
            await index.namespace(namespace).upsert(chunk);
          } catch (e) {
            this.logger.error('Error upserting chunk', { error: e, namespace, chunk });
            throw e;
          }
        }),
      );

      this.logger.info('Upserted vectors into index', { namespace, chunkSize, total: vectors.length });

      return true;
    } catch (e) {
      this.logger.error('Encountered error when upserting into index', {
        error: e,
        namespace,
        pinecone_record: vectors,
      });
      throw new Error(`Error upserting vectors into index: ${e}`);
    }
  }

  async getIndexNamespaces(targetIndex: string) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      const index = this.pinecone.Index(targetIndex);

      const indexStatsResponse = await index.describeIndexStats();

      const namespaces = Object.keys(indexStatsResponse.namespaces);

      return namespaces;
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw error;
    }
  }

  async deleteIndex(targetIndex: string) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      await this.pinecone.deleteIndex(targetIndex);

      return { message: 'Index deleted successfully.' };
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw error;
    }
  }

  async deleteIndexNamespaces(targetIndex: string) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      const index = this.pinecone.Index(targetIndex);

      await index.deleteAll();

      return { message: 'Namespace deleted successfully.' };
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw error;
    }
  }

  getCacheKey(filePayload: any) {
    const split = `pinecone:${filePayload.key.replaceAll('/', ':')}`.split(':');
    split.pop();
    split.push(filePayload.checksum);
    return split.join(':');
  }

  sliceIntoChunks = <T>(arr: T[], chunkSize: number) => {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) => arr.slice(i * chunkSize, (i + 1) * chunkSize));
  };
}
