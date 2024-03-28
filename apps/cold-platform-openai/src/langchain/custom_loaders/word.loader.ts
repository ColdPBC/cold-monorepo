import { Injectable } from '@nestjs/common';
import { BaseWorker, S3Service } from '@coldpbc/nest';
import * as mammoth from 'mammoth';

@Injectable()
export class WordLoader extends BaseWorker {
  constructor(private s3: S3Service) {
    super(WordLoader.name);
  }

  async load(buffer: Buffer): Promise<any> {
    const { value } = await mammoth.convertToHtml({ buffer });
    return { data: value, type: 'html' };
  }
}
