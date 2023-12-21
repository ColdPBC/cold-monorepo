import { Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResourceValidationPipe } from '../../../cold-api/src/platform/pipes/resource.pipe';
import { newsSchema } from '@coldpbc/nest';
import { CreateArticleDto } from '../../../cold-api/src/platform/modules/resources/news/dto/news-article.dto';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('webhook')
  @HttpCode(201)
  getData(@Body(new ResourceValidationPipe(newsSchema, 'POST')) body: CreateArticleDto) {
    return this.appService.webhook(body);
  }
}
