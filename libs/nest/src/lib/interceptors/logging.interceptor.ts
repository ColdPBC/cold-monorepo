import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Span, TraceService } from 'nestjs-ddtrace';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { tap } from 'rxjs/operators';
import { BaseWorker, WorkerLogger } from '@coldpbc/nest';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Span()
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger: WorkerLogger;
  tracer: TraceService = new TraceService();

  constructor(private config: ConfigService) {
    this.logger = new WorkerLogger(LoggingInterceptor.name, { version: config.get('DD_VERSION') || BaseWorker.getPkgVersion() });
    //this.logger = new WorkerLogger(LoggingInterceptor.name, { version: process.env['DD_VERSION'] });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        const user: any = get(request, 'user', { sub: '', coldclimate_claims: {} });
        this.logger = new WorkerLogger(LoggingInterceptor.name, {
          user: user?.coldclimate_claims,
          query: request.query,
          body: request.body,
          params: request.params,
          url: request.url,
          service: this.config.get('DD_SERVICE') || BaseWorker.getProjectName(),
          version: this.config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
          method: request.method,
        });

        const dd_user = {
          id: user?.sub,
          email: user?.coldclimate_claims?.email,
          org_id: user?.coldclimate_claims?.org_id,
          roles: user?.coldclimate_claims?.roles,
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

        this.logger.info(`${request.method} ${request.url}`, {
          query: request.query,
          user: dd_user,
          version: BaseWorker.getPkgVersion(),
          body: request.body,
          duration: `${Date.now() - now}ms`,
        });
      }),
    );
  }
}
