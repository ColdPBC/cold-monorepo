import { Controller, Delete, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser, BaseWorker, ColdRabbitService } from '@coldpbc/nest';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express'; //const config = new ConfigService();

//const config = new ConfigService();

@Controller()
export class AppController extends BaseWorker {
  constructor(private config: ConfigService, private app: AppService, private rabbit: ColdRabbitService, private openAI: AppService) {
    super(AppController.name);
  }

  @Get('models')
  getModels(
    @Req()
    req: {
      user: AuthenticatedUser;
    },
  ) {
    return this.app.listModels(req.user);
  }

  @Delete('assistants/:id')
  deleteAssistant(
    @Req()
    req: {
      user: AuthenticatedUser;
    },
    @Param('id') assistantId: string,
  ) {
    return this.app.deleteAssistant(req.user, assistantId);
  }

  @Get('assistants')
  getAssistants(
    @Req()
    req: {
      user: AuthenticatedUser;
    },
  ) {
    return this.app.listAssistants(req.user);
  }

  @Post('organization/:orgId/files')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
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
    try {
      return this.app.uploadToOpenAI(req.user, orgId, file); //this.rabbit.publish('cold.platform.openai', { orgId, uploaded: file }, 'file.uploaded');

      //  this.logger.info(`Created new file ${file.id} for assistant}`, { file });
    } catch (error) {
      console.error('Error uploading file:', error.message);
      throw new Error('Failed to process the uploaded file.');
    }
  }
}
