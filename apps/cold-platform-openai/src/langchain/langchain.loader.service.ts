import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, DarklyService, S3Service } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';
import { WordLoader } from './custom_loaders/word.loader';
import { XlsLoader } from './custom_loaders/xls.loader';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as Url from 'node:url';

@Injectable()
export class LangchainLoaderService extends BaseWorker implements OnModuleInit {
  chunkSize: number;
  overlapSize: number;

  constructor(
    private readonly darkly: DarklyService,
    private s3: S3Service,
    private readonly config: ConfigService,
    private readonly wordLoader: WordLoader,
    private readonly xlsLoader: XlsLoader,
  ) {
    super(LangchainLoaderService.name);
  }

  async onModuleInit(): Promise<void> {
    console.log('LangchainLoaderService initialized');

    this.chunkSize = await this.darkly.getNumberFlag('dynamic-langchain-chunkSize', 1000);
    this.overlapSize = await this.darkly.getNumberFlag('dynamic-langchain-overlap-size', 200);
  }

  async getWebFileContent(url: string) {
    const isPdf = new URL(url).pathname.endsWith('.pdf');
    const textSplitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
      chunkSize: Number(this.chunkSize),
      chunkOverlap: Number(this.overlapSize),
    });

    const response = await fetch(url);
    if (!isPdf) {
      throw new Error(`File type not supported by getWebFileContent(${url})`);
    }

    const loader = new PDFLoader(new Blob([await response.arrayBuffer()]), { splitPages: false });
    const documents = await loader.load();
    return await textSplitter.splitDocuments(documents);
  }

  async getDocContent(file: any, user: AuthenticatedUser | { coldclimate_claims: { email: string } }) {
    const bucket = `cold-api-uploaded-files`;

    const extension = file.key.split('.').pop();
    const s3File = await this.s3.getObject(user, bucket, file.key);

    if (!s3File.Body) {
      throw new Error(`File not found: ${file.key}`);
    }

    const textSplitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
      chunkSize: Number(this.chunkSize),
      chunkOverlap: Number(this.overlapSize),
    });

    switch (extension) {
      case 'docx': {
        const content = await this.wordLoader.load(Buffer.from(await s3File.Body.transformToByteArray()));
        const documents = await textSplitter.createDocuments([content.data]);
        return await textSplitter.splitDocuments(documents);
      }
      case 'xlsx': {
        const documents = await this.xlsLoader.load(await s3File.Body.transformToByteArray());
        return await textSplitter.splitDocuments(documents);
      }
      case 'pdf': {
        const fileBytes = await s3File?.Body.transformToByteArray();
        const loader = new PDFLoader(new Blob([fileBytes]), { splitPages: false });
        const documents = await loader.load();
        const content = await textSplitter.splitDocuments(documents);
        if (content.length > 0) {
          return content;
        } else {
          return { type: 'pdf', bytes: fileBytes };
        }
      }
      case 'csv': {
        const loader = new CSVLoader(new Blob([await s3File.Body.transformToByteArray()], { type: 'text/csv' }));
        const documents = await loader.load();
        return await textSplitter.splitDocuments(documents);
      }
      case 'json': {
        const loader = new JSONLoader(new Blob([await s3File.Body.transformToString()], { type: 'application/json' }));
        const documents = await loader.load();
        return await textSplitter.splitDocuments(documents);
      }
      default: {
        const loader = new TextLoader(new Blob([await s3File.Body.transformToString()], { type: 'text/plain' }));
        const data = await loader.load();
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: Number(this.chunkSize),
          chunkOverlap: Number(this.overlapSize),
        });

        return await textSplitter.splitDocuments(data);
      }
    }
  }
}
