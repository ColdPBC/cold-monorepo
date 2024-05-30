import { Injectable } from '@nestjs/common';
import { BaseWorker, S3Service } from '@coldpbc/nest';
import xlsx from 'xlsx';
import { Document } from '@langchain/core/documents';

@Injectable()
export class XlsLoader extends BaseWorker {
  constructor(private s3: S3Service) {
    super(XlsLoader.name);
  }

  async load(data: Uint8Array): Promise<any> {
    const workbook = xlsx.read(data, { type: 'array' });
    // This will convert each worksheet to JSON and push it to an array.
    const sheets = workbook.SheetNames || [];

    const documents: any = [];

    for (const sheet of sheets) {
      const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]) as any[];
      for (const row in jsonData) {
        const keys = Object.keys(jsonData[row]);
        const content = JSON.stringify(jsonData[row]);
        const document = new Document({
          metadata: {
            sheet,
            ...keys,
          },
          pageContent: content,
        });

        documents.push(document);
      }
    }
    return documents;
  }
}
