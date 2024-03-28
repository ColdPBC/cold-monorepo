import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, CacheService, DarklyService, S3Service } from '@coldpbc/nest';
import { PineconeService } from '../pinecone/pinecone.service';
import { ConfigService } from '@nestjs/config';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { WordLoader } from './custom_loaders/word.loader';
import { XlsLoader } from './custom_loaders/xls.loader';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

@Injectable()
export class LangchainLoaderService extends BaseWorker implements OnModuleInit {
  chunkSize: number;
  overlapSize: number;

  constructor(
    private readonly darkly: DarklyService,
    private s3: S3Service,
    private readonly pc: PineconeService,
    private readonly config: ConfigService,
    private readonly wordLoader: WordLoader,
    private readonly xlsLoader: XlsLoader,
    private readonly cache: CacheService,
  ) {
    super(LangchainLoaderService.name);
  }

  async onModuleInit(): Promise<void> {
    console.log('LangchainLoaderService initialized');

    this.chunkSize = await this.darkly.getNumberFlag('dynamic-langchain-chunkSize', 1000);
    this.overlapSize = await this.darkly.getNumberFlag('dynamic-langchain-overlapSize', 100);
  }

  getCacheKey(file: any) {
    const split = `pinecone:${file.key.replaceAll('/', ':')}`.split(':');
    split.pop();
    split.push(file.checksum);
    return split.join(':');
  }

  async getDocContent(file: any, user: AuthenticatedUser): Promise<any> {
    const bucket = `cold-api-uploaded-files`;

    const extension = file.key.split('.').pop();
    const s3File = await this.s3.getObject(user, bucket, file.key);

    const cacheKey = this.getCacheKey(file);

    const exists = await this.cache.get(cacheKey);
    if (exists) {
      throw new ConflictException(`${file.key} (${file.checksum}) already ingested`);
    }

    switch (extension) {
      case 'docx':
        return await this.wordLoader.load(Buffer.from(await s3File.Body.transformToByteArray()));
      case 'xlsx': {
        const data = await this.xlsLoader.load(await s3File.Body.transformToByteArray());
        return { data, type: 'documents' };
      }
      case 'pdf': {
        const loader = new PDFLoader(new Blob([await s3File.Body.transformToByteArray()]), { splitPages: false });
        const data = await loader.load();
        return { data, type: 'pdf' };
      }
      case 'csv': {
        const loader = new CSVLoader(new Blob([await s3File.Body.transformToByteArray()], { type: 'text/csv' }));
        const data = await loader.load();
        return { data, type: 'csv' };
      }
      case 'json': {
        const loader = new JSONLoader(new Blob([await s3File.Body.transformToString()], { type: 'application/json' }));
        const data = await loader.load();
        return { data, type: 'json' };
      }
      default: {
        const loader = new TextLoader(new Blob([await s3File.Body.transformToString()], { type: 'text/plain' }));
        const data = loader.load();
        return { data, type: 'text' };
      }
    }
  }

  async ingestData(user: AuthenticatedUser, organization: any, payload: any, namespaceName?: string) {
    try {
      if (!(await this.darkly.getBooleanFlag('config-enable-pinecone-injestion'))) {
        const message = 'Pinecone ingestion is disabled.  To enable, turn on targeting for `config-enable-pinecone-injestion` flag in launch darkly';
        this.logger.warn(message);
        return message;
      }

      if (!namespaceName) {
        namespaceName = organization.name;
      }

      const openAIapiKey = this.config.get<string>('OPENAI_API_KEY');

      await this.pc.createIndex(organization.name);

      const index = this.pc.pinecone.Index(organization.name);

      const content = await this.getDocContent(payload, user);

      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: openAIapiKey as string,
      });

      if (Array.isArray(content.data) && content.type === 'documents') {
        await PineconeStore.fromDocuments(content, embeddings, {
          pineconeIndex: index,
          namespace: namespaceName as string,
        });
      } else if (content.type === 'html') {
        const textSplitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
          chunkSize: Number(this.chunkSize),
          chunkOverlap: Number(this.overlapSize),
        });

        const documents = await textSplitter.createDocuments([content.data]);
        const splitDocs = await textSplitter.splitDocuments(documents);

        await PineconeStore.fromDocuments(splitDocs, embeddings, {
          pineconeIndex: index,
          namespace: namespaceName as string,
        });
      } else {
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: Number(this.chunkSize),
          chunkOverlap: Number(this.overlapSize),
        });

        const document = await textSplitter.splitDocuments(content.data);

        await PineconeStore.fromDocuments(document, embeddings, {
          pineconeIndex: index,
          namespace: namespaceName as string,
          textKey: 'text',
        });
      }

      await this.cache.set(this.getCacheKey(payload), payload.checksum, { ttl: 0 });

      return { message: `${organization.name} S3 file ingestion complete` };
    } catch (error) {
      if (error instanceof ConflictException) {
        this.logger.warn(error.message);
        return;
      }
      console.log('error', error);
      throw new Error('Failed to ingest your data');
    }
  }
}
