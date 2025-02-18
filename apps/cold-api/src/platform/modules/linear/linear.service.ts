import { Injectable } from '@nestjs/common';
import { Issue, LinearClient } from '@linear/sdk';
import { ConfigService } from '@nestjs/config';
import { BaseWorker, Cuid2Generator, GuidPrefixes, IAuthenticatedUser, PrismaService, S3Service } from '@coldpbc/nest';
import { file_types, organization_files, organizations, processing_status } from '@prisma/client';
import { buffer } from 'stream/consumers';
import { Readable } from 'stream';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { set } from 'lodash';

@Injectable()
export class LinearService extends BaseWorker {
	client: LinearClient;

	test_team_id = 'eed21186-e0f7-4b88-8028-1ab405ffed6d';
	customer_success_team_id = 'acf2cbe2-7dff-47ce-a58f-39a2dcc0d447';
	initial_workflow_state_id = '5dfae45e-3518-4bcb-ad4c-b94c6c7f894d';
	ingestion_project_id = 'e79c1550-2cf2-4e3e-b6d2-51fec4685c52';
	ingestion_other_label_id = 'ca2fe1a5-f5e0-46ef-85e8-92eabf9cef8f';
	ingestion_po_label_id = 'f1029d39-746c-4024-ab20-34f634ec3644';
	ingestion_sustainability_label_id = 'a377d813-82d0-4ea2-a57c-ae434cb0ad42';
	ingestion_costing_label_id = '46e03286-da88-4998-800f-893e35d95d35';
	ingestion_bom_label_id = 'bb111c92-da6a-474d-a80d-1ba87511fbf5';
	ai_processing_failed_label_id = 'd10fc7c7-4bfb-4cfe-88f5-4d5946f05a67';

	constructor(private readonly configService: ConfigService, readonly s3: S3Service, readonly prisma: PrismaService) {
		super(LinearService.name);
		this.client = new LinearClient({
			apiKey: this.configService.getOrThrow('LINEAR_API_KEY'),
		});
	}

	/** Update the file processing_status in the database whenever an issue is marked done. **/
	async updateFileStatus(req: any) {
		let file_status: any;

		const issueId = req.body.data.id;

		// Set the file status based on the issue status
		switch (req.body.data.state.name) {
			case 'Queued':
				return;
			case 'Done':
				file_status = processing_status.IMPORT_COMPLETE;
				break;
			default:
				file_status = processing_status.MANUAL_REVIEW;
		}

		// Update all files with the same linear_issue_id
		const updated = await this.prisma.organization_files.updateMany({
			where: {
				metadata: {
					path: ['linear_issue_id'],
					equals: issueId,
				},
			},
			data: { processing_status: file_status },
		});

		// archive the issue in Linear if we are in development or staging
		if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
			this.logger.info('Archiving issue', { issue: req.body.data });
			await this.client.archiveIssue(issueId);
		}
		return updated;
	}

	/** Fetches a file from S3. @throws */
	async getFile(orgFile: organization_files): Promise<File> {
		if (!orgFile.bucket || !orgFile.key) {
			throw new Error('Bucket or Key not found');
		}
		const command = new GetObjectCommand({ Bucket: orgFile.bucket, Key: orgFile.key });
		const response = await this.s3.client.send(command);

		// Check if response.Body is present
		if (!response.Body) {
			throw new Error('S3 response Body is undefined');
		}

		// Cast response.Body to a Readable stream so that the `buffer` function accepts it.
		const stream = response.Body as Readable;
		const dataBuffer = await buffer(stream);

		const mimeType = response.ContentType || 'application/octet-stream';
		const blob = new Blob([dataBuffer], { type: mimeType });
		const file = new File([blob], orgFile.original_name, { type: mimeType });

		return file;
	}

	/** Uploads a file to Linear, returning the uploaded URL. @throws */
	async uploadFileToLinear(file: File): Promise<string> {
		const uploadPayload = await this.client.fileUpload(file.type, file.name, file.size);

		if (!uploadPayload.success || !uploadPayload.uploadFile) {
			throw new Error('Failed to request upload URL');
		}

		const uploadUrl = uploadPayload.uploadFile.uploadUrl;
		const assetUrl = uploadPayload.uploadFile.assetUrl;

		// Make sure to copy the response headers for the PUT request
		const headers = new Headers();
		headers.set('Content-Type', file.type);
		headers.set('Cache-Control', 'public, max-age=31536000');
		uploadPayload.uploadFile.headers.forEach(({ key, value }) => headers.set(key, value));

		try {
			await fetch(uploadUrl, {
				method: 'PUT',
				headers,
				body: file,
			});

			return assetUrl;
		} catch (e) {
			console.error(e);
			throw new Error('Failed to upload file to Linear');
		}
	}

	/** Creates an issue in Linear. @throws */
	async createIssue(labels: string[], data: { organization: organizations; user: IAuthenticatedUser; orgFile: organization_files; error?: string }): Promise<Issue> {
		try {
			if (!data.organization.linear_webhook_id) {
				await this.createWebhook(data);
			}

			let title: string;
			let description: string;

			if (data.error) {
				const error = JSON.parse(data.error);
				title = `Review Failed Ingestion for ${data.organization.display_name} : ${data.orgFile.original_name} | ${data.orgFile.type}`;
				description = `The file uploaded by ${data.user.coldclimate_claims.email} failed to process due to the following error: ${error.message}`;
			} else {
				title = `Manual Review Request from ${data.organization.display_name} : ${data.orgFile.original_name} | ${data.orgFile.type}`;
				description = `User ${data.user.coldclimate_claims.email} from ${data.organization.display_name} uploaded a file with a ${data.orgFile.type} type for ingestion.`;
			}

			const payload = {
				// Use the customer success team for production and the test team for development or staging
				teamId: process.env.NODE_ENV === 'production' ? this.customer_success_team_id : this.test_team_id,
				title: title,
				description:
					description +
					`
				File Details:
				- Id: ${data.orgFile.id}
				- Name: ${data.orgFile.original_name}
				- Size: ${data.orgFile.size}
				- FileType: ${data.orgFile.type}
				- MimeType: ${data.orgFile.mimetype}
				- Metadata: ${JSON.stringify(data.orgFile?.metadata)}`,
				labelIds: labels,
			};

			// only set these for production
			if (process.env.NODE_ENV === 'production') {
				set(payload, 'projectId', this.ingestion_project_id);
				set(payload, 'stateId', this.initial_workflow_state_id);
			}

			// we need to first create the issue before we attach a file to it.
			const issueResponse = await this.client.createIssue(payload);

			const issue = await issueResponse.issue;

			if (!issue?.id) {
				throw new Error('Failed to create issue');
			}

			this.logger.info('Issue created', { issue });

			set(data, 'orgFile.metadata.linear_issue_id', issue.id);

			await this.prisma.organization_files.update({
				where: {
					id: data.orgFile.id,
				},
				data: { metadata: data.orgFile.metadata as object },
			});
			// Get the File object from S3 bucket
			const file = await this.getFile(data.orgFile);

			// Upload the file to Linear Cloud Storage
			const assetUrl = await this.uploadFileToLinear(file);

			// Attach the file to the issue
			await this.client.createAttachment({
				title: file.name,
				subtitle: data.orgFile.type,
				metadata: data.orgFile.metadata,
				issueId: issue.id,
				iconUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/white/Asset+7Symbol.svg',
				url: assetUrl,
			});

			this.logger.info('File Attached to Issue', { issue, file: data.orgFile });

			// /linear/webhook/organizations/:orgId
			return issue;
		} catch (e: any) {
			this.logger.error(e.message);
			throw e;
		}
	}

	private async createWebhook(data: { organization: organizations; user: IAuthenticatedUser; orgFile: organization_files }) {
		try {
			// Add Secret for processing linear webhooks
			if (!data.organization.linear_secret) {
				data.organization.linear_secret = new Cuid2Generator(GuidPrefixes.WebhookSecret).scopedId;
				await this.prisma.organizations.update({
					where: { id: data.organization.id },
					data: { linear_secret: data.organization.linear_secret },
				});
			}
			const webhookResponse = await this.client.createWebhook({
				enabled: true,
				url: `https://${process.env.NODE_ENV === 'staging' ? 'api.coldclimate.online' : 'api.coldclimate.com'}/linear/webhook/organizations/${data.organization.id}`,
				resourceTypes: ['Issue'],
				label: `${process.env.NODE_ENV} : ${data.organization.display_name} Webhook`,
				secret: data.organization.linear_secret,
				teamId: this.customer_success_team_id,
			});

			const webhook = await webhookResponse.webhook;

			if (!webhook?.id) {
				throw new Error('Failed to create webhook');
			}

			await this.prisma.organizations.update({
				where: { id: data.organization.id },
				data: { linear_webhook_id: webhook?.id },
			});

			return webhook;
		} catch (e) {
			this.logger.error(e.message);
			return;
		}
	}

	getLabel(type: string) {
		switch (type) {
			case file_types.OTHER:
				return this.ingestion_other_label_id;
			case file_types.PURCHASE_ORDER:
				return this.ingestion_po_label_id;
			case file_types.BILL_OF_MATERIALS:
				return this.ingestion_bom_label_id;
			default:
				return this.ingestion_sustainability_label_id;
		}
	}

	/** Creates an issue in Linear for ingestion. @throws */
	async createIngestionIssue(data: { organization: organizations; user: IAuthenticatedUser; orgFile: organization_files; bytes: Uint8Array }): Promise<any> {
		await this.createIssue([this.getLabel(data.orgFile.type)], data);
	}

	/** Creates an issue in Linear for ingestion failures. @throws */
	async createIngestionFailedIssue(data: any): Promise<any> {
		await this.createIssue([this.ai_processing_failed_label_id, this.getLabel(data.orgFile.type)], data);
	}
}
