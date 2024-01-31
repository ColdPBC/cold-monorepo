import { Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { allRoles, AuthenticatedUser, BaseWorker, coldAdminOnly, HttpExceptionFilter, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './assistant/files/file.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OpenAIController.name))
@Controller()
export class OpenAIController extends BaseWorker {
  constructor(private app: AppService, private readonly files: FileService) {
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

  @Put('assistant/:id/files/:fileId')
  @HttpCode(201)
  @Roles(...coldAdminOnly)
  linkFileToAssistant(
    @Param('id') id: string,
    @Param('fileId') fileId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.files.linkFileToAssistant(req.user, id, fileId);
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
    return this.files.uploadToOpenAI(req.user, file);
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
    return this.files.listAssistantFiles(req.user, orgId);
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
    return this.files.getAssistantFile(req.user, orgId, fileId);
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
    return this.files.listFiles(req.user);
  }
}
