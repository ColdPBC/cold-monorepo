import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, CacheService, DarklyService } from '@coldpbc/nest';
import cheerio from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CrawlerService } from './crawler.service';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeService } from '../pinecone/pinecone.service';
import { omit } from 'lodash';

@Injectable()
@Processor('openai_crawler')
export class CrawlerConsumer extends BaseWorker implements OnModuleInit {
  maxDepth: number;
  maxPages: number;

  chunkSize: number;

  constructor(private readonly crawler: CrawlerService, private readonly pc: PineconeService, private readonly darkly: DarklyService, private readonly cache: CacheService) {
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
    const killCrawler = await this.darkly.getBooleanFlag('kill-crawler', false, {
      kind: 'organization',
      key: job.data.organization.name,
      name: job.data.organization.displayName,
    });

    if (killCrawler) {
      this.logger.info('Crawler killed in darkly', job.data.organization.name);
      return {};
    }

    const htmlSplitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
      chunkSize: Number(1000),
    });

    try {
      job.data.url = this.cleanURL(job.data.url);

      await this.addToSeen(job.data?.organization?.name, job.data.url);

      const index = await this.pc.getIndex(job.data.organization.name);

      // Check if we should continue crawling
      if (this.urlBlocked(job.data.url)) {
        this.logger.info('URL blocked', job.data.url);
        return {};
      }
      // Extract hostname from URL
      const urlParts = new URL(job.data.url);
      const hostname = urlParts.hostname;

      // Fetch the HTML
      const html = await this.fetchPage(job.data.url);
      if (!html) {
        return {};
      }

      // Extract new URLs from the HTML
      const newURLS = this.extractUrls(html, job.data?.url);
      // loop through the newly discovered URLs
      for (let newURL of newURLS) {
        newURL = this.cleanURL(newURL);
        // skip if we've already seen this URL
        if (await this.isAlreadySeen(job.data?.organization?.name, newURL)) {
          continue;
        }

        // If the URL is on the same domain, add it to the queue
        const newURLParts = new URL(newURL);
        if (newURLParts.hostname === hostname) {
          const pjob = await this.crawler.addCrawlPageJob({
            url: newURL,
            depth: 0,
            parent: job.id,
            ...omit(job.data, ['url']),
          });

          this.logger.info('Added new URL to crawl page queue', { job: pjob.id, url: newURL });
          // Cache the URL as seen
          await this.addToSeen(job.data?.organization?.name, newURL);
        }
      }

      const checksum = await this.cache.calculateChecksum(Buffer.from(html));
      const cached = await this.cache.get(`crawler:${job.data.organization.name}:${checksum}`);

      if (cached) {
        this.logger.info('Skipping page, already indexed', job.data.url);
        return {};
      }
      // Parse the HTML and create a Pinecone document
      const documents = await htmlSplitter.createDocuments([this.parseHtml(html)]);

      // Create embeddings for the document and upsert them into the Pinecone index
      const vectors = await Promise.all(
        documents.flat().map(page =>
          this.pc.embedWebContent(page, {
            organization: job.data?.organization?.name,
            type: 'webpage',
            url: job?.data?.url,
          }),
        ),
      );

      try {
        await index.namespace(job.data.organization.name).upsert(vectors);
        this.metrics.increment('pinecone.index.upsert', 1, {
          namespace: job.data.organization.name,
          status: 'completed',
        });
      } catch (e) {
        this.logger.error('Error upserting chunk', { error: e, namespace: job.data.organization.name });
        this.metrics.increment('pinecone.index.upsert', 1, { namespace: job.data.organization.name, status: 'failed' });
        throw e;
      }

      ///await this.pc.chunkedUpsert(index, vectors, job?.data?.organization?.name);

      // Cache the checksum of the page
      await this.cache.set(`crawler:${job.data.organization.name}:${checksum}`, {
        organization: job.data.organization.name,
        type: 'webpage',
        url: job.data.url,
      });

      this.logger.info('indexed page', job.data?.url);
      this.metrics.increment('crawler.jobs', 1, { organization_name: job.data.organization.name, status: 'completed' });
    } catch (e) {
      this.logger.error('Failed to crawl pages', e);
      this.metrics.increment('crawler.jobs', 1, { organization_name: job.data.organization.name, status: 'failed' });
      throw e;
    }

    return {};
  }

  private isTooDeep(depth: number) {
    return depth > this.maxDepth;
  }

  private cleanURL(url: string) {
    const lastSlash = url.lastIndexOf('#');
    if (lastSlash > -1) {
      url = url.slice(0, lastSlash);
    }

    return this.stripLastSlash(url);
  }

  private stripLastSlash(url: string) {
    const lastSlash = url.lastIndexOf('/');
    if (lastSlash === url.length - 1) {
      url = url.slice(0, -1);
    }
    return url;
  }

  private async isAlreadySeen(company_name: string, url: string) {
    url = this.cleanURL(url);

    const seen = ((await this.cache.get(`crawler:${company_name}:seen`)) as string[]) || [];
    const isSeen = seen.indexOf(url) > -1;
    return isSeen;
  }

  private async addToSeen(company_name: string, url: string) {
    url = this.cleanURL(url);

    const seen = ((await this.cache.get(`crawler:${company_name}:seen`)) as string[]) || [];
    if (!seen.includes(url)) {
      seen.push(url);
      this.logger.info(`Added URL to seen list: ${url}`);
    }

    await this.cache.set(`crawler:${company_name}:seen`, seen);
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

  private urlBlocked(url: string): boolean {
    const parsed = new URL(url);

    if (
      url.includes('mailto:') ||
      url.includes('tel:') ||
      url.includes('javascript:') ||
      parsed.pathname.endsWith('jpg') ||
      parsed.pathname.endsWith('png') ||
      parsed.pathname.endsWith('bmp') ||
      parsed.pathname.endsWith('gif') ||
      parsed.pathname.endsWith('mp4') ||
      parsed.pathname.endsWith('zip') ||
      parsed.pathname.endsWith('gzip') ||
      parsed.pathname.endsWith('gz')
    ) {
      return true;
    }
  }

  private extractUrls(html: string, baseUrl: string): string[] {
    const $ = cheerio.load(html);
    const relativeUrls = $('a')
      .map((_, link) => $(link).attr('href'))
      .get() as string[];
    return relativeUrls.map(relativeUrl => new URL(relativeUrl, baseUrl).href);
  }
}
