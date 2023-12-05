import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Span, TraceService } from 'nestjs-ddtrace';
import { get } from 'lodash';
import { BaseWorker } from '../worker';
import safeStringify from 'fast-safe-stringify';
import { ConfigService } from '@nestjs/config';

@Span()
@Catch(HttpException)
export class HttpExceptionFilter extends BaseWorker implements ExceptionFilter {
  private readonly traceService: TraceService = new TraceService();
  private readonly config: ConfigService = new ConfigService();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const user: { coldclimate_claims?: any } = get(request, 'user', { coldclimate_claims: {} });
    this.traceService.getTracer().appsec.setUser({ ...user.coldclimate_claims });

    if (status >= 400 && status < 500) {
      if (status !== 404) {
        this.logger.error(JSON.parse(safeStringify(exception)), {
          error: exception,
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
      this.logger.info(exception.message, {
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

    response.status(status).json({
      message: exception.message.replace(/\n/g, ''),
      statusCode: status,
      error: exception.name,
      service: this.config.get('DD_SERVICE') || this.config.getOrThrow('NX_TASK_TARGET_PROJECT'),
      version: this.config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
      timestamp: new Date().toISOString(),
      path: request.url,
      meta: { user: user?.coldclimate_claims },
    });
  }
}
