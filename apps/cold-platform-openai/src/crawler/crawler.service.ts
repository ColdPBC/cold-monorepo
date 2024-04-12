import { Injectable } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

interface Page {
  url: string;
  content: string;
}

@Injectable()
export class CrawlerService extends BaseWorker {
  private seen = new Set<string>();
  private pages: Page[] = [];
  private queue: { url: string; depth: number }[] = [];
  maxDepth: number;
  maxPages: number;

  constructor(@InjectQueue('openai_crawler') private crawlerQueue: Queue) {
    super(CrawlerService.name);
    this.maxDepth = 10;
    this.maxPages = 10;
  }

  async getJob(jobId: string) {
    return await this.crawlerQueue.getJob(jobId);
  }

  async addCrawlPageJob(data: any) {
    return await this.crawlerQueue.add('crawl_site', data, { removeOnFail: true, removeOnComplete: true, attempts: 2 });
  }
}
