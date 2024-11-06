import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Span, TraceService } from 'nestjs-ddtrace';
import { get } from 'lodash';
import { BaseWorker } from '../worker';
import { ConfigService } from '@nestjs/config';

@Span()
@Catch(HttpException)
export class HttpExceptionFilter extends BaseWorker implements ExceptionFilter {
	private readonly config: ConfigService = new ConfigService();

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		const user: { coldclimate_claims?: any } = get(request, 'user', { coldclimate_claims: {} });
		this.tracer.appsec.setUser({ ...user.coldclimate_claims });

		if (status >= 400) {
			if (status !== 404) {
				this.logger.error(exception.message, {
					error: exception.getResponse(),
					stack: exception.stack,
					user: user,
					url: request.url,
					method: request.method,
					body: request.body,
					params: request.params,
					headers: request.headers,
					path: request.path,
					query: request.query,
				});
			}
		}
		if (status < 300) {
			this.logger.warn(exception.message, {
				user: user,
				response: exception.getResponse(),
				url: request.url,
				method: request.method,
				body: request.body,
				params: request.params,
				headers: request.headers,
				path: request.path,
				query: request.query,
			});
		}

		response.status(status).json({
			statusCode: status,
			error: exception.getResponse(),
			version: this.config.get('npm_package_version', this.config.get('DD_VERSION')) || BaseWorker.getPkgVersion(),
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
