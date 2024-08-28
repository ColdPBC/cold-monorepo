import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, CacheService, Cuid2Generator, DarklyService, GuidPrefixes, PrismaService, S3Service } from '@coldpbc/nest';
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

  constructor(
    private readonly crawler: CrawlerService,
    private readonly pc: PineconeService,
    private readonly darkly: DarklyService,
    private readonly cache: CacheService,
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
  ) {
    super(CrawlerConsumer.name);
    this.maxDepth = 3;
    this.maxPages = 10;
  }

  async onModuleInit(): Promise<void> {
    this.chunkSize = await this.darkly.getNumberFlag('dynamic-langchain-chunkSize', 1000);
  }

  @Process('organization.updated')
  async addUpdatedCrawlJob(job: any) {
    await this.crawler.addCrawlPageJob(job.data);
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
      this.logger.debug('Crawler killed in darkly', job.data.organization.name);
      return {};
    }

    // delete existing vectors before crawling website
    //await this.pc.removeWebVectors(job.data.organization);

    const htmlSplitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
      chunkSize: Number(1000),
    });

    try {
      job.data.url = this.cleanURL(job.data.url);

      if (await this.isAlreadySeen(job.data?.organization?.name, job.data.url)) {
        this.logger.debug('skipping url, already seen by crawler', job.data.url);
        return {};
      } else {
        await this.addToSeen(job.data?.organization?.name, job.data.url);
      }

      const details = await this.pc.getIndexDetails();
      const index = await this.pc.getIndex();

      // Check if we should continue crawling
      if (this.urlBlocked(job.data.url)) {
        this.logger.debug('URL blocked', job.data.url);
        return {};
      }
      // Extract hostname from URL
      const urlParts = new URL(job.data.url);
      const hostname = urlParts.hostname;

      // Fetch the HTML
      const html = await this.fetchPage(job.data.url, job.data?.organization);
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

        if (!job.data?.force) {
          if (
            !newURL.includes('blogs') &&
            !newURL.includes('blog') &&
            !newURL.includes('pages') &&
            !newURL.includes('news') &&
            !newURL.includes('press') &&
            !newURL.includes('articles')
          ) {
            await this.addToSeen(job.data?.organization?.name, newURL);

            continue;
          }
        }

        if (newURLParts.hostname === hostname) {
          const counts = await this.crawler.crawlerQueue.getJobCounts();
          if (counts.active > 1000 || counts.waiting > 1000 || counts.delayed > 1000) {
            this.logger.debug('Crawler queue full, skipping URL', newURL);
            continue;
          }
          const pjob = await this.crawler.addCrawlPageJob({
            url: newURL,
            depth: 0,
            parent: job.id,
            ...omit(job.data, ['url']),
          });

          this.logger.info('Added new URL to crawl page queue', { job: pjob.id, url: newURL });
        }
      }

      const checksum = await this.cache.calculateChecksum(Buffer.from(html));
      const cached = await this.cache.get(`crawler:${job.data.organization.name}:${checksum}`);

      if (cached) {
        this.logger.debug('Skipping page, already indexed', job.data.url);
        return {};
      }

      if (
        !html.toLowerCase().includes('sustainability') &&
        !html.toLowerCase().includes('sustainable') &&
        !html.toLowerCase().includes('environment') &&
        !html.toLowerCase().includes('climate') &&
        !html.toLowerCase().includes('green') &&
        !html.toLowerCase().includes('eco') &&
        !html.toLowerCase().includes('dei') &&
        !html.toLowerCase().includes('diversity') &&
        !html.toLowerCase().includes('equity') &&
        !html.toLowerCase().includes('inclusion') &&
        !html.toLowerCase().includes('justice') &&
        !html.toLowerCase().includes('equality') &&
        !html.toLowerCase().includes('inequality') &&
        !html.toLowerCase().includes('racism') &&
        !html.toLowerCase().includes('sexism') &&
        !html.toLowerCase().includes('discrimination') &&
        !html.toLowerCase().includes('bias') &&
        !html.toLowerCase().includes('equity') &&
        !html.toLowerCase().includes('inclusion') &&
        !html.toLowerCase().includes('partners') &&
        !html.toLowerCase().includes('partnerships') &&
        !html.toLowerCase().includes('community') &&
        !html.toLowerCase().includes('impact') &&
        !html.toLowerCase().includes('social') &&
        !html.toLowerCase().includes('responsibility') &&
        !html.toLowerCase().includes('esg') &&
        !html.toLowerCase().includes('csr') &&
        !html.toLowerCase().includes('pfas')
      ) {
        this.logger.debug('Skipping page, no relevant content', job.data.url);
        return {};
      }
      // Parse the HTML and create a Pinecone document
      const documents = await htmlSplitter.createDocuments([this.parseHtml(html)]);

      // Create embeddings for the document and upsert them into the Pinecone index
      const vectors = await Promise.all(
        documents.flat().map(page =>
          this.pc.embedWebContent(page, {
            organization: job.data?.organization?.name,
            type: 'web',
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            url: job?.data?.url,
          }),
        ),
      );

      try {
        if (vectors.length < 1) {
          this.logger.error('No vectors found for page', { url: job.data.url, documents });
          return {};
        }

        await index.namespace(job.data.organization.name).upsert(vectors);
        try {
          const parsed = new URL(job.data.url);
          const parsedUrl = `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`;
          await this.prisma.vector_records.create({
            data: {
              id: new Cuid2Generator(GuidPrefixes.Vector).scopedId,
              organization_id: job.data?.organization?.id,
              values: vectors,
              namespace: job.data?.organization.name,
              index_name: details.indexName,
              url: parsedUrl,
              metadata: {
                originalUrl: job.data.url,
                organization: job.data?.organization?.name,
                type: 'web',
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                url: parsedUrl,
              },
            },
          });
        } catch (e) {
          this.logger.error(e.message, { ...e });
        }

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
      await this.cache.set(
        `crawler:${job.data.organization.name}:${checksum}`,
        {
          organization: job.data.organization.name,
          type: 'web',
          url: job.data.url,
        },
        { ttl: 60 },
      );

      this.logger.debug('indexed page', job.data?.url);
      this.metrics.increment('crawler.jobs', 1, { organization_name: job.data.organization.name, status: 'completed' });
    } catch (e) {
      this.logger.error('Failed to crawl pages', e);
      this.metrics.increment('crawler.jobs', 1, { organization_name: job.data.organization.name, status: 'failed' });
    }

    return {};
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

    const seen = await this.cache.get(`crawler:${company_name}:seen:${url}`);
    return !!seen;
  }

  private async addToSeen(company_name: string, url: string) {
    url = this.cleanURL(url);

    const seen = await this.cache.get(`crawler:${company_name}:seen:${url}`);
    if (!seen) {
      await this.cache.set(`crawler:${company_name}:seen:${url}`, [], { ttl: 1000 * 60 * 60 * 72 });
      this.logger.debug(`Added URL to seen list: ${url}`);
      //seen.push(url);
    }
  }

  private async fetchPage(url: string, org: any): Promise<string | undefined> {
    const pathname = new URL(url).pathname;

    try {
      if (pathname.includes('.pdf')) {
        this.logger.info('Fetched PDF from website', url);
        await this.pc.loadWebFile(url, org);

        return;
      }

      const response = await fetch(url);
      this.logger.info('Fetched page', url);

      return response.text();
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

    return false;
  }

  private extractUrls(html: string, baseUrl: string): string[] {
    const $ = cheerio.load(html);
    const relativeUrls = $('a')
      .map((_, link) => $(link).attr('href'))
      .get() as string[];
    return relativeUrls.map(relativeUrl => new URL(relativeUrl, baseUrl).href);
  }
}
