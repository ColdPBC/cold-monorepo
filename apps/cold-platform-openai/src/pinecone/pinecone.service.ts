import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { Pinecone } from '@pinecone-database/pinecone';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PineconeService extends BaseWorker implements OnModuleInit {
  public pinecone: Pinecone;

  constructor(private readonly config: ConfigService) {
    super(PineconeService.name);
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

  async listIndexes() {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    try {
      const indexes = await this.pinecone.listIndexes();

      return indexes;
    } catch (error) {
      this.logger.error(error.message, { ...error });
      throw new Error('Error fetching indexes');
    }
  }

  async addOpenAIEmbeddings(targetIndex: string, embeddings: any[]) {
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

  async createIndex(targetIndex: string, dimension: number = 1536) {
    if (!this.pinecone) {
      await this.onModuleInit();
    }

    const index = this.pinecone.Index(targetIndex);
    if (index) {
      throw new ConflictException(`Index ${targetIndex} already exists`);
    }

    await this.pinecone.createIndex({
      name: targetIndex,
      dimension: dimension,
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
      waitUntilReady: true,
    });

    return await this.describeIndex(targetIndex);
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
}
