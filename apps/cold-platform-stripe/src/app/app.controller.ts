import { Controller, Delete, Get, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { coldAdminOnly, coldAndCompanyAdmins, IRequest, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(...coldAndCompanyAdmins)
  @Get('stripe_products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Roles(...coldAndCompanyAdmins)
  @Get('customer_subscriptions/:orgId')
  getCustomerSubscriptions(@Param('orgId') orgId: string, @Req() req: IRequest) {
    return this.appService.getCustomerSubscriptions(req);
  }

  @Roles(...coldAndCompanyAdmins)
  @Get('portal_session/:orgId')
  createSession(@Param('orgId') orgId: string, @Req() req: IRequest) {
    return this.appService.createPortalSession(req);
  }

  @Roles(...coldAdminOnly)
  @Post('customers')
  createCustomer(@Req() req: IRequest) {
    return this.appService.createCustomer(req);
  }

  @Roles(...coldAdminOnly)
  @Delete('customers/:orgId')
  deleteCustomer(@Req() req: IRequest) {
    return this.appService.deleteCustomer(req);
  }
}
