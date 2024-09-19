import { Body, Controller, Delete, Get, OnModuleInit, Param, Patch, Post, Query, Req, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import multerS3 from 'multer-s3';
import { allRoles, coldAndCompanyAdmins, HttpExceptionFilter, IAuthenticatedUser, IRequest, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard, S3Service } from '@coldpbc/nest';
import { Span } from 'nestjs-ddtrace';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { OrganizationFilesService } from './organization.files.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organizations', 'files')
@UseFilters(new HttpExceptionFilter(OrganizationFilesController.name))
@Controller('organizations/:orgId/files')
export class OrganizationFilesController implements OnModuleInit {
	multerConfig: any;

	constructor(private readonly orgFiles: OrganizationFilesService, private readonly s3: S3Service) {}

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

	@Get()
	@Roles(...allRoles)
	async getFiles(@Param('orgId') orgId: string, @Req() req: IRequest, @Query('bpc') bpc: boolean) {
		return this.orgFiles.getFiles(req, orgId, bpc);
	}

	@Get(':id/url')
	@Roles(...allRoles)
	async getUrl(
		@Param('orgId') orgId: string,
		@Param('id') fileId: string,
		@Req()
		req: IRequest,
	) {
		return this.orgFiles.getUrl(req, fileId);
	}

	@Delete(':id')
	@Roles(...coldAndCompanyAdmins)
	async deleteFile(
		@Param('orgId') orgId: string,
		@Param('id') fileId: string,
		@Req()
		req: IRequest,
	) {
		return this.orgFiles.deleteFile(req, orgId, Array.isArray(fileId) ? fileId : [fileId]);
	}

	@Post()
	@Roles(...allRoles)
	@UseInterceptors(AnyFilesInterceptor())
	async uploadFile(
		@Param('orgId') orgId: string,
		@Query('bpc') bpc: boolean,
		@UploadedFiles()
		file: Array<Express.Multer.File>,
		@Req()
		req: IRequest,
	) {
		try {
			return this.orgFiles.uploadFile(req, orgId, file, bpc);
		} catch (error) {
			console.error('Error uploading file:', error.message);
			throw new Error('Failed to process the uploaded file.');
		}
	}

	@Patch(`:id`)
	@Roles(...allRoles)
	@UseInterceptors(AnyFilesInterceptor())
	async updateFile(
		@Param('orgId') orgId: string,
		@Param('id') fileId: string,
		@Body() data: { effective_end_date?: string; effective_start_date?: string; type?: string },
		@Req()
		req: IRequest,
	) {
		return this.orgFiles.update(req, fileId, data);
	}
}
