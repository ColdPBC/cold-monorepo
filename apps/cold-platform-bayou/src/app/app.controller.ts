import { Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@coldpbc/nest';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { BayouWebhookDTO } from './schemas/bayou.webhook.schema';
import { BayouValidationPipe } from './pipes/validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('webhook')
  @Public()
  @HttpCode(202)
  getData(@Body(new BayouValidationPipe('POST')) body: BayouWebhookDTO) {
    return this.appService.webhook(body);
  }
}
