import { Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerS3 from 'multer-s3';
import { allRoles, coldAndCompanyAdmins, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, MqttService, Roles, RolesGuard, S3Service } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { OrganizationFilesService } from './organization.files.service';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organizations')
@UseFilters(new HttpExceptionFilter(OrganizationFilesController.name))
@Controller('organizations')
export class OrganizationFilesController {
  constructor(private readonly orgFiles: OrganizationFilesService, private readonly mqtt: MqttService) {}

  @Get(':orgId/files')
  @Roles(...allRoles)
  async getFiles(@Param('orgId') orgId: string, @Req() req: { user: IAuthenticatedUser }, @Query('bpc') bpc: boolean) {
    return this.orgFiles.getFiles(req, orgId, bpc);
  }

  @Delete(':orgId/files/:id')
  @Roles(...coldAndCompanyAdmins)
  async deleteFile(
    @Param('orgId') orgId: string,
    @Param('id') fileId: string,
    @Req()
    req: {
      user: IAuthenticatedUser;
    },
  ) {
    return this.orgFiles.deleteFile(req, orgId, fileId);
  }

  @Post(':orgId/files')
  @Roles(...allRoles)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3(S3Service.getMulterS3Config()),
    }),
  )
  async uploadFile(
    @Param('orgId') orgId: string,
    @Query('bpc') bpc: boolean,
    @UploadedFile() file: Express.MulterS3.File,
    @Req()
    req: {
      body: never;
      headers: never;
      query: never;
      user: IAuthenticatedUser;
    },
  ) {
    try {
      return this.orgFiles.uploadFile(req, orgId, file, bpc);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      throw new Error('Failed to process the uploaded file.');
    }
  }
}
