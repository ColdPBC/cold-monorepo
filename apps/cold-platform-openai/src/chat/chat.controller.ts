import { Controller, Delete, Injectable, NotFoundException, Param, Put, Req, UseFilters, UseGuards } from '@nestjs/common';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, PrismaService, Role, Roles, RolesGuard } from '@coldpbc/nest';
import { ChatService } from './chat.service';
import { ApiOAuth2 } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { PineconeService } from '../pinecone/pinecone.service';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid', 'email', 'profile'])
@Controller()
@UseFilters(new HttpExceptionFilter(ChatController.name))
@Injectable()
export class ChatController extends BaseWorker {
  constructor(private readonly chatService: ChatService, private readonly prisma: PrismaService, private readonly pc: PineconeService) {
    super(ChatController.name);
  }

  @Delete('indexes')
  @Roles(Role.ColdAdmin)
  async deleteIndexes(@Req() req: { user: IAuthenticatedUser; body: { indexes: string[] } }) {
    const deleted: string[] = [];
    for (const index of req.body.indexes) {
      await this.pc.deleteIndex(index);
      deleted.push(index);
    }

    return deleted;
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
      return await this.chatService.askQuestion({ prompt: req.body.question }, company.name, req.user);
    } else {
      return await this.chatService.askQuestion(req.body, company.name, req.user);
    }
  }

  // Add methods here
  @Put('organization/:orgId/search')
  @Roles(Role.ColdAdmin)
  // @ts-expect-error - TS6133: 'session' is declared but its value is never read.
  async search(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: { prompt?: string; query?: string };
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

    if (req.body.prompt) {
      return await this.chatService.getDocumentContent([], req.body, company.name, req.user);
    } else if (req.body.query) {
      return await this.pc.getContext(req.body.query, company.name, company.name, 0.2, false);
    }
  }
}
