import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import { BaseWorker, HttpExceptionFilter, IRequest, JwtAuthGuard, newsSchema, Roles, RolesGuard } from '@coldpbc/nest';
import { bpcDecoratorOptions, coldAdminOnly, skipDecoratorOptions, takeDecoratorOptions } from '../_global/global.params';
import { CreateArticleDto } from './dto/news-article.dto';
import { postNewsExample } from './examples/news.examples';
import { NewsService } from './news.service';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid'])
@ApiTags('News')
@UseFilters(new HttpExceptionFilter(NewsController.name))
@Controller('news')
export class NewsController extends BaseWorker {
  constructor(private readonly newsService: NewsService) {
    super(NewsService.name);
  }

  @ApiOperation({
    summary: 'Get News Articles',
    operationId: 'GetNewsArticles',
  })
  @Get()
  @ApiQuery(bpcDecoratorOptions)
  @ApiQuery(takeDecoratorOptions)
  @ApiQuery(skipDecoratorOptions)
  @ApiQuery(bpcDecoratorOptions)
  getArticles(
    @Req()
    req: IRequest,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('bpc', new ParseBoolPipe({ optional: true })) bpc: boolean,
    @Query('publish', new ParseBoolPipe({ optional: true })) publish: boolean,
  ) {
    if (!take) take = 3;
    if (!skip) skip = 0;
    if (!bpc) bpc = false;

    return this.newsService.getArticles(req, parseInt(String(take)), parseInt(String(skip)), bpc, publish);
  }

  @ApiOperation({
    summary: 'Create News Articles',
    operationId: 'CreateNewsArticles',
  })
  @Post()
  @Roles(...coldAdminOnly)
  @ApiBody({
    type: CreateArticleDto,
    schema: {
      example: postNewsExample,
    },
  })
  create(
    @Body(new ResourceValidationPipe(newsSchema, 'POST')) body: CreateArticleDto,
    @Req()
    req: IRequest,
  ) {
    return this.newsService.create(req, body as CreateArticleDto);
  }

  @ApiOperation({
    summary: 'Delete News Article',
    operationId: 'DeleteNewsArticle',
  })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    example: '{{test_article_id}}',
  })
  @Roles(...coldAdminOnly)
  Delete(
    @Param('id') id: string,
    @Req()
    req: IRequest,
  ) {
    return this.newsService.delete(req, id);
  }
}
