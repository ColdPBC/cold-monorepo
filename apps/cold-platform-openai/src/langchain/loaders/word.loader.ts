import { Injectable } from '@nestjs/common';
import { BaseWorker, S3Service } from '@coldpbc/nest';
import * as mammoth from 'mammoth';

@Injectable()
export class WordLoader extends BaseWorker {
  constructor(private s3: S3Service) {
    super(WordLoader.name);
  }

  async load(buffer: Buffer) {
    const { value } = await mammoth.extractRawText({ buffer });
    return value;
  }
}
