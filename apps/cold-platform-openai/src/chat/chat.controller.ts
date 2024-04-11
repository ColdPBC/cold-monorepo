import { Controller, Injectable, NotFoundException, Param, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, PrismaService, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { ChatService } from './chat.service';
import { ApiOAuth2 } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid', 'email', 'profile'])
@Controller()
@UseFilters(new HttpExceptionFilter(ChatController.name))
@Injectable()
export class ChatController extends BaseWorker {
  constructor(private readonly chatService: ChatService, private readonly prisma: PrismaService) {
    super(ChatController.name);
  }

  // Add methods here
  @Put('organization/:orgId/prompt')
  @Roles(Role.ColdAdmin)
  async prompt(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
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

    if (req.body.question) {
      return await this.chatService.askQuestion(req.body.question, company.name, req.user);
    } else {
      return await this.chatService.askSurveyQuestion(req.body, company.name, req.user);
    }
  }
}
