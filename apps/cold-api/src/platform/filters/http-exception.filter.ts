import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Span, TraceService } from 'nestjs-ddtrace';
import * as process from 'process';
import { BaseWorker } from 'nest';
import safeStringify from 'fast-safe-stringify';

@Span()
@Catch(HttpException)
export class HttpExceptionFilter extends BaseWorker implements ExceptionFilter {
  private readonly traceService: TraceService = new TraceService();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.traceService.getTracer().appsec.setUser({ ...request['user']?.coldclimate_claims });

    if (status >= 400 && status < 500) {
      if (status !== 404) {
        this.logger.error(JSON.parse(safeStringify(exception)), {
          error: exception,
          stack: exception.stack,
          user: request['user'],
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
        user: request['user'],
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
      version: process.env.npm_package_version,
      timestamp: new Date().toISOString(),
      path: request.url,
      meta: { user: request['user']?.coldclimate_claims },
    });
  }
}
