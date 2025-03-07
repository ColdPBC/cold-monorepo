import { Controller, Delete, Get, HttpCode, NotImplementedException, Param, Post, Put, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { allRoles, BaseWorker, coldAdminOnly, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, OrgUserInterceptor, PrismaService, Roles, RolesGuard } from '@coldpbc/nest';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './assistant/files/file.service';
import { filter } from 'lodash';
import { PineconeService } from './pinecone/pinecone.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(OpenAIController.name))
@Controller()
export class OpenAIController extends BaseWorker {
	constructor(private app: AppService, private readonly files: FileService, private readonly prisma: PrismaService, private readonly pc: PineconeService) {
		super(OpenAIController.name);
	}

	@Get('models')
	@Roles(...coldAdminOnly)
	getModels(
		@Req()
		req: {
			user: IAuthenticatedUser;
		},
	) {
		return this.app.listModels(req.user);
	}

	@Get('files/organization/:orgId')
	@Roles(...coldAdminOnly)
	syncOrgFiles(
		@Param('orgId') orgId: string,
		@Req()
		req: any,
		@Query('type') type: 'web' | 'files' | 'all',
	) {
		// const org = this.prisma.organizations.findUnique({ where: { id: orgId } }) as any;

		//return this.pc.syncOrgFiles(req.user, req.organization, 0, type);

		throw new NotImplementedException('Not implemented');
	}

	@Get('files')
	@Roles(...coldAdminOnly)
	syncAllOrgFiles(
		@Req()
		req: {
			user: IAuthenticatedUser;
		},
	) {
		return this.pc.syncAllOrgFiles(req.user);
	}

	@Delete('assistants/:id')
	@Roles(...coldAdminOnly)
	deleteAssistant(
		@Req()
		req: {
			user: IAuthenticatedUser;
		},
		@Param('id') assistantId: string,
	) {
		return this.app.deleteAssistant({ user: req.user, integration: { id: assistantId } });
	}

	@Delete('assistants')
	@Roles(...coldAdminOnly)
	async deleteAllAssistants(
		@Req()
		req: {
			user: IAuthenticatedUser;
		},
	) {
		const protectedAsst = [
			'bombas',
			'peak-design',
			'ovative-group',
			'branch-basics',
			'cold-climate-production',
			'cold-climate-staging',
			'cold-demo-account',
			'e-2-e-test-company',
			'cold-climate-development',
		];
		const deleted: any = [];
		const failed: any = [];
		const assts = await this.app.listAssistants(req.user);

		const deleteMe = filter(assts, item => {
			if (!item.name) return false;
			return !protectedAsst.includes(item.name);
		});

		for (const asst of deleteMe) {
			try {
				await this.app.deleteAssistant({ user: req.user, integration: { id: asst.id } });
				deleted.push(asst.name);
			} catch (e) {
				this.logger.error(e.message, e);
				failed.push(asst.name);
			}
		}
		/*for (const asst of assts) {
      const int = await this.prisma.integrations.findUnique({ where: { id: asst.id } });
      if (!int) {
        this.logger.warn(`No integration found for assistant ${asst.name}(${asst.id}) in ${process.env['NODE_ENV']}`);
      }

      const org = await this.prisma.organizations.findUnique({ where: { name: asst.name } });
      if (!org) {
        this.logger.warn(`No organization found for assistant ${asst.name}(${asst.id}) in ${process.env['NODE_ENV']}`);
      } else if (org?.isTest) {
        this.logger.warn(`deleting assistant ${asst.name}(${asst.id})`, { org, integration: int });
        await this.app.deleteAssistant({ user: req.user, integration: { id: asst.id } });
        deletedCount.push({ id: asst.id, name: asst.name });
      }
    }*/
		return { deleted, failed, assts };
	}

	@Roles(...coldAdminOnly)
	@UseInterceptors(OrgUserInterceptor)
	@Get('assistants')
	getAssistants(
		@Req()
		req: {
			user: IAuthenticatedUser;
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
			user: IAuthenticatedUser;
		},
	) {
		return this.files.linkFileToVectorStore(req.user, id, fileId);
	}

	@Post('files')
	@UseInterceptors(FileInterceptor('file'))
	@Roles(...coldAdminOnly)
	async uploadFile(
		@UploadedFile() file: any,
		@Req()
		req: {
			body: never;
			headers: never;
			query: never;
			user: IAuthenticatedUser;
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
		@UploadedFile() file: any,
		@Req()
		req: {
			body: never;
			headers: never;
			query: never;
			user: IAuthenticatedUser;
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
			user: IAuthenticatedUser;
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
			user: IAuthenticatedUser;
		},
	) {
		return this.files.listFiles(req.user);
	}

	@Delete('pinecone/namespace/:namespace')
	@Roles(...coldAdminOnly)
	async deleteNamespace(
		@Param('namespace') namespace: string,
		@Req()
		req: {
			body: never;
			headers: never;
			query: never;
			user: IAuthenticatedUser;
		},
	) {
		return this.pc.deleteNamespace(namespace);
	}
}
