import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Span, TraceService } from 'nestjs-ddtrace';
import { Observable } from 'rxjs';
import { merge, get } from 'lodash';
import { tap } from 'rxjs/operators';
import { WorkerLogger } from '@coldpbc/nest';
import { Request } from 'express';

@Span()
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new WorkerLogger('LoggingInterceptor');
  tracer: TraceService = new TraceService();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        const user: any = get(request, 'user', { sub: '', coldclimate_claims: {} });
        this.logger.tags = merge(this.logger.tags, {
          user: user?.coldclimate_claims,
          query: request.query,
          body: request.body,
          params: request.params,
          url: request.url,
          version: process.env['DD_VERSION'],
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
          version: process.env['DD_VERSION'],
          body: request.body,
          duration: `${Date.now() - now}ms`,
        });
      }),
    );
  }
}
