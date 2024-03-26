import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, DarklyService, S3Service } from '@coldpbc/nest';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeService } from '../pinecone/pinecone.service';
import { ConfigService } from '@nestjs/config';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PDFLoader } from './loaders/pdf.loader';
import { WordLoader } from './loaders/word.loader';
import { XlsLoader } from './loaders/xls.loader';
import { TextLoader } from './loaders/text.loader';

@Injectable()
export class LangchainLoaderService extends BaseWorker implements OnModuleInit {
  chunkSize: number;
  overlapSize: number;

  constructor(
    private readonly darkly: DarklyService,
    private s3: S3Service,
    private readonly pc: PineconeService,
    private readonly config: ConfigService,
    private readonly pdfLoader: PDFLoader,
    private readonly wordLoader: WordLoader,
    private readonly xlsLoader: XlsLoader,
    private readonly textLoader: TextLoader,
  ) {
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
      const openAIapiKey = this.config.get<string>('OPENAI_API_KEY');
      const bucket = `cold-api-uploaded-files/${process.env['NODE_ENV']}/${organization.id}`;
      const index = this.pc.pinecone.Index(namespaceName);

      // Create index if it doesn't exist
      if (!index) {
        await this.pc.createIndex(organization.name);
      }

      const s3Docs = await this.s3.listObjects(user, organization, bucket);

      for (const doc of s3Docs) {
        const s3File = await this.s3.getObject(user, bucket, doc.Key);
        let content: any;

        switch (s3File.ContentType) {
          case 'application/pdf':
            content = await this.pdfLoader.load(s3File.Body as unknown as Buffer);
            break;
        }

        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: Number(this.chunkSize),
          chunkOverlap: Number(this.overlapSize),
        });

        const document = await textSplitter.splitDocuments(content);

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: openAIapiKey as string,
        });

        await PineconeStore.fromDocuments(document, embeddings, {
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
