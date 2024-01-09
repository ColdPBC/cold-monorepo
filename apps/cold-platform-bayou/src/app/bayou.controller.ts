import { Body, Controller, HttpCode, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { BayouService } from './bayou.service';
import { AuthenticatedUser, HttpExceptionFilter, JwtAuthGuard, Public, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { BayouWebhookValidationPipe } from './pipes/webhook.validation.pipe';
import { BayouCustomerPayload } from './schemas/bayou.customer.schema';
import { BayouCustomerPayloadValidationPipe } from './pipes/customer.validation.pipe';
import { bill_parsedDTO } from './schemas/bayou.webhook.schema';

@Controller()
@UseFilters(new HttpExceptionFilter(BayouController.name))
export class BayouController {
  constructor(private readonly appService: BayouService) {}

  @Post('inbound')
  @Public()
  @HttpCode(202)
  processWebhook(@Body(new BayouWebhookValidationPipe('POST')) body: { event: string; object: bill_parsedDTO }) {
    switch (body.event) {
      case 'new_bill':
      case 'updated_bill':
        return this.appService.billWebhook(body);
      /*case 'bills_ready':
        if (!get(body.object, 'external_id', null)) throw new Error('No external_id found in payload');
        return this.appService.billsWebhook(body as unknown as bills_readyDTO);*/
      default:
        return { message: `${body.event} webhook not yet implemented` };
    }
  }

  @Post('organizations/:orgId/locations/:locId/customer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...[Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin])
  @HttpCode(202)
  createCustomer(
    @Param('orgId') orgId: string,
    @Param('locId') locId: string,
    @Req()
    req: {
      body: never;
      headers: never;
      query: never;
      user: AuthenticatedUser;
    },
    @Body(new BayouCustomerPayloadValidationPipe('POST')) body: BayouCustomerPayload,
  ) {
    return this.appService.createCustomer(req.user, orgId, locId, body);
  }
}
