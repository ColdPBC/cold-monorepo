import { Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { allRoles, AuthenticatedUser, BaseWorker, coldAdminOnly, ColdRabbitService, HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

//const config = new ConfigService();

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OpenAIController.name))
@Controller()
export class OpenAIController extends BaseWorker {
  constructor(private config: ConfigService, private app: AppService, private rabbit: ColdRabbitService, private openAI: AppService) {
    super(OpenAIController.name);
  }

  @Get('models')
  @Roles(...coldAdminOnly)
  getModels(
    @Req()
    req: {
      user: AuthenticatedUser;
    },
  ) {
    return this.app.listModels(req.user);
  }

  @Delete('assistants/:id')
  @Roles(...coldAdminOnly)
  deleteAssistant(
    @Req()
    req: {
      user: AuthenticatedUser;
    },
    @Param('id') assistantId: string,
  ) {
    return this.app.deleteAssistant(req.user, assistantId);
  }

  @Roles(...coldAdminOnly)
  @UseInterceptors(OrgUserInterceptor)
  @Get('assistants')
  getAssistants(
    @Req()
    req: {
      user: AuthenticatedUser;
    },
  ) {
    return this.app.listAssistants(req.user);
  }

  @Put('organization/:orgId/files/:fileId')
  @HttpCode(201)
  @Roles(...coldAdminOnly)
  linkFileToAssistant(
    @Param('orgId') orgId: string,
    @Param('fileId') fileId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.app.linkFileToAssistant(req.user, orgId, fileId);
  }

  @Post('organization/:orgId/files')
  @UseInterceptors(OrgUserInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Roles(...allRoles)
  async uploadOrgFile(
    @Param('orgId') orgId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req()
    req: {
      body: never;
      headers: never;
      query: never;
      user: AuthenticatedUser;
    },
  ) {
    return this.app.uploadOrgFilesToOpenAI(req.user, orgId, file); //this.rabbit.publish('cold.platform.openai', { orgId, uploaded: file }, 'file.uploaded');
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(...coldAdminOnly)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req()
    req: {
      body: never;
      headers: never;
      query: never;
      user: AuthenticatedUser;
    },
  ) {
    return this.app.uploadToOpenAI(file); //this.rabbit.publish('cold.platform.openai', { orgId, uploaded: file }, 'file.uploaded');
  }

  @Get('organization/:orgId/files')
  @UseInterceptors(OrgUserInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Roles(...allRoles)
  async listFiles(
    @Param('orgId') orgId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req()
    req: {
      body: never;
      headers: never;
      query: never;
      user: AuthenticatedUser;
    },
  ) {
    return this.app.listAssistantFiles(req.user, orgId); //this.rabbit.publish('cold.platform.openai', { orgId, uploaded: file }, 'file.uploaded');
  }

  @Get('organization/:orgId/file/:fileId')
  @UseInterceptors(OrgUserInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Roles(...allRoles)
  async getFile(
    @Param('orgId') orgId: string,
    @Param('fileId') fileId: string,
    @Req()
    req: {
      body: never;
      headers: never;
      query: never;
      user: AuthenticatedUser;
    },
  ) {
    return this.app.getAssistantFile(req.user, orgId, fileId); //this.rabbit.publish('cold.platform.openai', { orgId, uploaded: file }, 'file.uploaded');
  }

  @Get('files')
  @Roles(...coldAdminOnly)
  async getFiles(
    @Req()
    req: {
      body: never;
      headers: never;
      query: never;
      user: AuthenticatedUser;
    },
  ) {
    return this.app.listFiles(req.user);
  }
}
