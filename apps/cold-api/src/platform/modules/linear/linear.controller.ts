import { Controller, HttpStatus, Param, Post, Req, Res, UseFilters } from '@nestjs/common';
import { BaseWorker, HttpExceptionFilter, PrismaService } from '@coldpbc/nest';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { LinearService } from './linear.service';
import { LinearWebhooks } from '@linear/sdk';

interface RawRequest extends Request {
	rawBody?: Buffer;
}

@Controller('linear')
@UseFilters(new HttpExceptionFilter(LinearController.name))
export class LinearController extends BaseWorker {
	constructor(readonly linearService: LinearService, readonly prisma: PrismaService) {
		super(LinearController.name);
	}

	@Post('webhook/organizations/:orgId')
	@ApiTags('Linear : Webhooks')
	async incomingWebhook(
		@Req()
		req: RawRequest,
		@Param('orgId') orgId: string,
		@Res() res: Response,
	) {
		const organization = await this.prisma.organizations.findUnique({
			where: { id: orgId },
		});

		const rawBody = req.rawBody;
		if (!rawBody) {
			return res.status(HttpStatus.BAD_REQUEST).send('Missing raw body');
		}

		if (!organization || !organization.linear_secret) {
			throw new Error('Organization not found or missing linear_secret');
		}

		const signature = req.headers['linear-signature'];

		if (!signature || typeof signature !== 'string') {
			return res.status(HttpStatus.BAD_REQUEST).send('Missing or invalid signature header');
		}

		const timestamp = JSON.parse(rawBody.toString())['webhookTimestamp'];

		try {
			// Use the Linear SDK helper to verify the signature.
			// The helper should throw an error if verification fails.
			const verifier = new LinearWebhooks(organization.linear_secret);
			verifier.verify(rawBody, signature, timestamp);
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send('Invalid signature');
		}

		// Once verified, parse the raw body to JSON
		let payload;
		try {
			payload = JSON.parse(rawBody.toString());
		} catch (error) {
			return res.status(HttpStatus.BAD_REQUEST).send('Invalid JSON payload');
		}

		console.log('Verified webhook payload:', payload);

		// Process the webhook payload as needed...

		await this.linearService.updateFileStatus(req);

		return res.status(HttpStatus.OK).send('Webhook verified');
	}
}
