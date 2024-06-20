import { Controller, Injectable, NotFoundException, Param, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, PrismaService, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { CrawlerService } from './crawler.service';
import { ApiOAuth2 } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { PineconeService } from '../pinecone/pinecone.service';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid', 'email', 'profile'])
@Controller('crawler')
@UseFilters(new HttpExceptionFilter(CrawlerController.name))
@Injectable()
export class CrawlerController extends BaseWorker {
  constructor(private readonly crawler: CrawlerService, private readonly prisma: PrismaService, private readonly pc: PineconeService) {
    super(CrawlerController.name);
  }

  // Add methods here
  @Put('organization/:orgId')
  @Roles(Role.ColdAdmin)
  async prompt(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: { website: string; force?: boolean };
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    const company = await this.prisma.organizations.findUnique({
      where: {
        id: orgId,
      },
    });
    if (!company) {
      throw new NotFoundException(`Organization ${orgId} not found`);
    }

    if (req.body.website) {
      return await this.crawler.addCrawlPageJob({
        url: company.website ? company.website : req.body.website,
        force: req.body.force,
        organization: company,
        user: req.user,
      });
    }

    throw new NotFoundException(`Website not provided`);
  }
}
