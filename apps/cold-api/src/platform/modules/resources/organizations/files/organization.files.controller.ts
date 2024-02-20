import { Controller, Delete, Get, OnModuleInit, Param, ParseFilePipe, Post, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import multerS3 from 'multer-s3';
import { allRoles, coldAndCompanyAdmins, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, Roles, RolesGuard, S3ConfigurationService, S3Service } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { OrganizationFilesService } from './organization.files.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organizations')
@UseFilters(new HttpExceptionFilter(OrganizationFilesController.name))
@Controller('organizations')
export class OrganizationFilesController implements OnModuleInit {
  multerConfig: any;

  constructor(
    private readonly orgFiles: OrganizationFilesService,
    private readonly config: ConfigService,
    private readonly s3Config: S3ConfigurationService,
    private readonly s3: S3Service,
  ) {}

  async onModuleInit() {
    this.multerConfig = {
      storage: multerS3({
        s3: this.s3.client,
        bucket: 'cold-api-uploaded-files',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: async (req, file, cb) => {
          const hash = await S3Service.calculateChecksum(file);
          console.log(`${file.filename} Checksum: ${hash}`);
          // Add custom metadata, such as the calculated hash
          cb(null, { md5Hash: hash });
        },
        key: function (req, file, cb) {
          const user = req['user'] as IAuthenticatedUser;
          const orgId = req['orgId'];

          // Adjust this based on your actual user object structure
          cb(null, `${process.env['NODE_ENV']}/${orgId}/${user.coldclimate_claims.email}/${file.originalname}`);
        },
      }),
    };
  }

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
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('orgId') orgId: string,
    @Query('bpc') bpc: boolean,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
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
