import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, DarklyService } from '@coldpbc/nest';
import cheerio from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CrawlerService } from './crawler.service';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeService } from '../pinecone/pinecone.service';

interface Page {
  url: string;
  content: string;
}

@Injectable()
@Processor('openai_crawler')
export class CrawlerConsumer extends BaseWorker implements OnModuleInit {
  private seen = new Set<string>();
  private pages: Page[] = [];
  private queue: { url: string; depth: number }[] = [];
  maxDepth: number;
  maxPages: number;

  chunkSize: number;

  constructor(private readonly crawler: CrawlerService, private readonly pc: PineconeService, private readonly darkly: DarklyService) {
    super(CrawlerConsumer.name);
    this.maxDepth = 3;
    this.maxPages = 10;
  }

  async onModuleInit(): Promise<void> {
    this.chunkSize = await this.darkly.getNumberFlag('dynamic-langchain-chunkSize', 1000);
  }

  @Process('organization.created')
  async addCrawlJob(job: any) {
    await this.crawler.addCrawlPageJob(job.data);
  }

  @Process('crawl_site')
  async crawl(job: Job): Promise<any> {
    const htmlSplitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
      chunkSize: Number(1000),
    });

    try {
      const index = await this.pc.getIndex(job.data.organization.name);

      // Add the start URL to the queue
      //this.addToQueue(job.data.url);
      const urlParts = new URL(job.data.url);
      const hostname = urlParts.hostname;

      this.logger.info('Added start URL to queue', job.data.url);
      // While there are URLs in the queue and we haven't reached the maximum number of pages...
      while (await this.shouldContinueCrawling(job.id)) {
        // Dequeue the next URL and depth
        //const { url, depth } = this.queue.shift()!;

        // If the depth is too great or we've already seen this URL, skip it
        if (this.isAlreadySeen(job.data.url)) {
          job.log(`Skipping URL ${job.data.url}`);
          return {};
        }
        // Add the URL to the set of seen URLs
        this.seen.add(job.data.url);

        // Fetch the page HTML
        const html = await this.fetchPage(job.data.url);
        if (!html) continue;

        // Parse the HTML and add the page to the list of crawled pages
        const documents = await htmlSplitter.createDocuments([this.parseHtml(html)]);

        const vectors = await Promise.all(
          documents.flat().map(page =>
            this.pc.embedWebContent(page, {
              organization: job.data.organization.name,
              type: 'webpage',
              url: job.data.url,
            }),
          ),
        );
        await this.pc.chunkedUpsert(index, vectors, job.data.organization.name);

        this.logger.info('indexed page', job.data.url);

        const newURLS = this.extractUrls(html, job.data.url);
        for (const newURL of newURLS) {
          if (this.isAlreadySeen(newURL)) {
            this.logger.info('Skipping seen URL', newURL);
            continue;
          }
          const newURLParts = new URL(newURL);
          if (newURLParts.hostname === hostname) {
            delete job.data.url;
            const pjob = await this.crawler.addCrawlPageJob({
              url: newURL,
              depth: 0,
              parent: job.id,
              ...job.data,
            });
            this.logger.info('Added new URL to crawl page queue', pjob.id);
          }
        }
      }
    } catch (e) {
      this.logger.error('Failed to crawl pages', e);
      throw e;
    }

    return {};
  }

  private isTooDeep(depth: number) {
    return depth > this.maxDepth;
  }

  private isAlreadySeen(url: string) {
    return this.seen.has(url);
  }

  private async shouldContinueCrawling(jobId: any) {
    const job = await this.crawler.getJob(jobId);
    if (job.data.parent) {
      const parentJob = await this.crawler.getJob(job.data.parent);
      this.logger.info(`Parent job is active: ${await parentJob?.isActive()}`);
      //return await parentJob?.isActive();
    }
    this.logger.info(`Job is active: ${await job?.isActive()}`);
    return job?.isActive();
  }

  private addToQueue(url: string, depth = 0) {
    this.queue.push({ url, depth });
  }

  private addNewUrlsToQueue(urls: string[], depth: number) {
    this.queue.push(...urls.map(url => ({ url, depth: depth + 1 })));
  }

  private async fetchPage(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      this.logger.info('Fetched page', url);

      return await response.text();
    } catch (error) {
      console.error(`Failed to fetch ${url}: ${error}`);
      return '';
    }
  }

  private parseHtml(html: string): string {
    const $ = cheerio.load(html);
    $('a').removeAttr('href');

    this.logger.info('Parsed page');
    return NodeHtmlMarkdown.translate($.html());
  }

  private extractUrls(html: string, baseUrl: string): string[] {
    const $ = cheerio.load(html);
    const relativeUrls = $('a')
      .map((_, link) => $(link).attr('href'))
      .get() as string[];
    return relativeUrls.map(relativeUrl => new URL(relativeUrl, baseUrl).href);
  }
}
