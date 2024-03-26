import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, DarklyService, S3Service } from '@coldpbc/nest';
import { S3Loader } from 'langchain/document_loaders/web/s3';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeService } from '../pinecone/pinecone.service';
import { ConfigService } from '@nestjs/config';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

@Injectable()
export class LangchainLoaderService extends BaseWorker implements OnModuleInit {
  chunkSize: number;
  overlapSize: number;

  constructor(private readonly darkly: DarklyService, private s3Service: S3Service, private readonly pineconeService: PineconeService, private readonly config: ConfigService) {
    super(LangchainLoaderService.name);
  }

  async onModuleInit(): Promise<void> {
    console.log('LangchainLoaderService initialized');

    this.chunkSize = await this.darkly.getNumberFlag('dynamic-langchain-chunkSize', 1000);
    this.overlapSize = await this.darkly.getNumberFlag('dynamic-langchain-overlapSize', 100);
  }

  getFileType(filePath: string): string {
    const extension = filePath.split('.').pop();

    switch (extension) {
      case 'docx':
        return 'Word Document';
      case 'xlsx':
        return 'Excel Spreadsheet';
      default:
        return 'Unknown';
    }
  }

  async ingestData(user: AuthenticatedUser, organization: any, namespaceName?: string) {
    try {
      const tmpPath = process.env.NODE_ENV === 'production' ? '/tmp' : 'tmp';

      const openAIapiKey = this.config.get<string>('OPENAI_API_KEY');
      const bucket = `cold-api-uploaded-files/${process.env['NODE_ENV']}/${organization.id}`;
      const index = this.pineconeService.pinecone.Index(namespaceName);

      // Create index if it doesn't exist
      if (!index) {
        await this.pineconeService.createIndex(organization.name);
      }

      const s3Docs = await this.s3Service.listObjects(user, organization, bucket);

      for (const doc of s3Docs) {
        const loader = new S3Loader({
          bucket: bucket,
          key: doc.Key,
          s3Config: {
            region: 'us-east-1',
            credentials: {
              accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY_ID'),
              secretAccessKey: this.config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
          },
          unstructuredAPIURL: '',
          unstructuredAPIKey: '', // this will be soon required
        });

        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: Number(this.chunkSize),
          chunkOverlap: Number(this.overlapSize),
        });

        const rawDoc = await loader.load();

        const splitDoc = await textSplitter.splitDocuments(rawDoc);

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: openAIapiKey as string,
        });

        await PineconeStore.fromDocuments(splitDoc, embeddings, {
          pineconeIndex: index,
          namespace: namespaceName as string,
          textKey: 'text',
        });
      }

      return { message: `${organization.name} S3 file ingestion complete` };
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to ingest your data');
    }
  }
}
