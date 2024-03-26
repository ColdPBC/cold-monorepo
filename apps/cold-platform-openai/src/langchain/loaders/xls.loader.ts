import { Injectable } from '@nestjs/common';
import { BaseWorker, S3Service } from '@coldpbc/nest';
import xlsx from 'xlsx';

@Injectable()
export class XlsLoader extends BaseWorker {
  constructor(private s3: S3Service) {
    super(XlsLoader.name);
  }

  async load(buffer: Buffer) {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    // This will convert the first worksheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    return jsonData;
  }
}
