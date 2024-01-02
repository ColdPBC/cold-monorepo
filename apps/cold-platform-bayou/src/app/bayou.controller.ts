import { Body, Controller, HttpCode, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { BayouService } from './bayou.service';
import { AuthenticatedUser, HttpExceptionFilter, JwtAuthGuard, Public, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { BayouWebhookDTO } from './schemas/bayou.webhook.schema';
import { BayouWebhookValidationPipe } from './pipes/webhook.validation.pipe';
import { BayouCustomerPayload } from './schemas/bayou.customer.schema';
import { BayouCustomerPayloadValidationPipe } from './pipes/customer.validation.pipe';

@Controller()
@UseFilters(new HttpExceptionFilter(BayouController.name))
export class BayouController {
  constructor(private readonly appService: BayouService) {}

  @Post('inbound')
  @Public()
  @HttpCode(202)
  processWebhook(@Body(new BayouWebhookValidationPipe('POST')) body: BayouWebhookDTO) {
    return this.appService.webhook(body);
  }

  @Post('customer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...[Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin])
  @HttpCode(202)
  createCustomer(
    @Req()
    req: {
      body: never;
      headers: never;
      query: never;
      user: AuthenticatedUser;
    },
    @Body(new BayouCustomerPayloadValidationPipe('POST')) body: BayouCustomerPayload,
  ) {
    return this.appService.createCustomer(req.user, body);
  }
}
