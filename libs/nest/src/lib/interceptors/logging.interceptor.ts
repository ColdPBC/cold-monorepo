import { CallHandler, ExecutionContext, Injectable, NestInterceptor, OnModuleInit } from '@nestjs/common';
import { Span, TraceService } from 'nestjs-ddtrace';
import { Observable } from 'rxjs';
import { get, pick } from 'lodash';
import { tap } from 'rxjs/operators';
import { BaseWorker, WorkerLogger } from '../worker';
import { DarklyService } from '../darkly';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import process from 'process';

@Span()
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	logger: WorkerLogger;
	tracer: TraceService = new TraceService();
	darkly: DarklyService;
	enableHealthLogs = false;
	project_path: string;
	constructor(readonly config: ConfigService) {
		this.logger = new WorkerLogger(LoggingInterceptor.name);
		//this.logger = new WorkerLogger(LoggingInterceptor.name, { version: process.env['DD_VERSION'] });
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const isRabbit = isRabbitContext(context);
		const now = Date.now();
		if (!isRabbit) {
			const ctx = context.switchToHttp();
			const request = ctx.getRequest<Request>();

			return next.handle().pipe(
				tap(() => {
					const user: any = get(request, 'user', { sub: '', coldclimate_claims: {} });

					this.logger = new WorkerLogger(LoggingInterceptor.name);

					const dd_user = {
						id: user?.sub,
						email: user?.coldclimate_claims?.email,
						org_id: user?.coldclimate_claims?.org_id,
						roles: user?.coldclimate_claims?.roles,
					};

					const tags = {
						user: user?.coldclimate_claims,
						query: request.query,
						body: request.body,
						params: request.params,
						url: request.url,
						status: request.statusCode,
						method: request.method,
					};

					if (request.query['impersonateOrg']) {
						if (!user.isColdAdmin) {
							this.tracer.getTracer().appsec.trackCustomEvent('Attempted Impersonation', {
								...dd_user,
								...request.query,
							});
						} else {
							this.tracer.getTracer().appsec.trackCustomEvent('Org Impersonated', {
								...dd_user,
								...request.query,
							});
						}
					}

					this.tracer.getTracer().appsec.setUser(dd_user);
					this.tracer.getTracer().setUser(dd_user);
					this.logger.info(`${request.method} ${request.url}`, { duration: Date.now() - now, ...tags });
				}),
			);
		} else {
			return next.handle().pipe(
				tap(() => {
					const data = {
						//data: context.getArgs()[0].data,
						fields: context.getArgs()[1].fields,
						properties: context.getArgs()[1].properties,
						content: pick(JSON.parse(Buffer.from(context.getArgs()[1].content).toString()), ['event', 'from', 'user', 'metadata']),
						method: context.getArgs()[1].properties?.replyTo ? 'REQUEST' : 'PUBLISH',
					};
					this.logger = new WorkerLogger(LoggingInterceptor.name);
					this.logger.log(`Processed ${data.content.event} message from ${data.content.from}`, { duration: Date.now() - now, ...data });
				}),
			);
		}
	}
}
