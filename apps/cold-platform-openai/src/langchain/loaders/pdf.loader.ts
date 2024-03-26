import { Injectable } from '@nestjs/common';
import { BaseWorker, S3Service } from '@coldpbc/nest';
import pdfParse from 'pdf-parse';

@Injectable()
export class PDFLoader extends BaseWorker {
  constructor(private s3: S3Service) {
    super(PDFLoader.name);
  }

  async load(buffer: Buffer) {
    const pdfData = await pdfParse(buffer);
    return pdfData.text;
  }
}
