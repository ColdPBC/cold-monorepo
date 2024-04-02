import { Injectable } from '@nestjs/common';
import { BaseWorker, S3Service } from '@coldpbc/nest';

@Injectable()
export class TextLoader extends BaseWorker {
  constructor(private s3: S3Service) {
    super(TextLoader.name);
  }

  async load(body: any) {
    const text = body.toString();
    return text;
  }
}
