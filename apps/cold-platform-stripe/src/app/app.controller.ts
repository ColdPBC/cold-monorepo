import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard, RolesGuard } from '@coldpbc/nest';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Get('customer_subscriptions/:orgId')
  getCustomerSubscriptions(@Param('orgId') orgId: string) {
    return this.appService.getCustomerSubscriptions(orgId);
  }

  @Get('portal_session/:orgId')
  createSession(@Param('orgId') orgId: string) {
    return this.appService.createPortalSession(orgId);
  }
}
