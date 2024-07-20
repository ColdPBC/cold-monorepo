import { LoggerService } from '@nestjs/common';
import safeStringify from 'fast-safe-stringify';
import winstonConfig from './winston.config';
import winston, { createLogger } from 'winston';
import { RedactorService } from '../redactor';
import { BaseWorker } from './worker.class';
import { Tags } from '../primitives';
import { merge } from 'lodash';
import { ConfigService } from '@nestjs/config'; /// test
import tracer from 'dd-trace';
import formats from 'dd-trace/ext/formats'; /// test

/// test
export class WorkerLogger implements LoggerService {
  tags: Tags;
  redactor: RedactorService;
  logger: winston.Logger;
  context: string;
  config: ConfigService;
  isDev: boolean;

  /**
   * Creates an instance of WorkerLogger.
   * @param className
   * @param meta
   */
  constructor(className: string, meta?: any) {
    this.config = new ConfigService();
    this.context = className;
    this.logger = createLogger(winstonConfig(className, meta)).child({
      context: className,
      meta,
    });

    this.isDev = this.config.get('NODE_ENV') !== 'production' && this.config.get('NODE_ENV') !== 'staging';
    const pkg = BaseWorker.getParsedJSON('package.json');

    this.tags = {
      app: pkg.name,
      version: pkg.version,
      environment: this.config.get('NODE_ENV'),
      service: this.config.get('DD_SERVICE'),
    };
    //Logger.overrideLogger(this.logger);
    this.redactor = new RedactorService();
  }

  public setTags(tags: Tags) {
    this.tags = merge(this.tags, tags);
  }

  setRedactor(scrubber: RedactorService): WorkerLogger {
    this.redactor = scrubber;
    return this;
  }

  error(error: any, optionalParams?: any | any[]): void {
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const record = { time, error };

    if (span) {
      tracer.inject(span.context(), formats.LOG, record);
    }

    if (typeof error === 'string') {
      this.logger.error(error, { optionalParams, ...this.tags, context: this.context });
    } else if (error?.response?.data) {
      this.logger.error(
        error.response?.data?.message,
        safeStringify({
          error: error?.response?.data,
          meta: optionalParams,
          ...this.tags,
        }),
      );
    } else {
      if (error?.message) {
        this.logger.error(error?.message, { error, meta: optionalParams, ...this.tags });
      } else if (!error) {
        this.logger.error(optionalParams.error);
      }
    }
  }

  warn(message: string, optionalParams?: any | any[]): void {
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const record = { time, message };

    if (span) {
      tracer.inject(span.context(), formats.LOG, record);
    }

    if (!optionalParams) {
      this.logger.warn(typeof message === 'string' ? message : this.redactor.redact(message), this.context, { ...this.tags });
    }

    this.logger.warn(typeof message === 'string' ? message : this.redactor.redact(message), this.isDev ? null : this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  info(message: string, optionalParams?: any | any[]): void {
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const record = { time, message };

    if (span) {
      tracer.inject(span.context(), formats.LOG, record);
    }

    if (!optionalParams) {
      this.logger.info(typeof message === 'string' ? message : this.redactor.redact(message), this.context, { ...this.tags });
    }

    this.logger.info(typeof message === 'string' ? message : this.redactor.redact(message), this.isDev ? null : this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  verbose(message: string, optionalParams?: any | any[]): void {
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const record = { time, message };

    if (span) {
      tracer.inject(span.context(), formats.LOG, record);
    }

    if (!optionalParams) {
      this.logger.verbose(typeof message === 'string' ? message : this.redactor.redact(message), this.context, { ...this.tags });
    }

    this.logger.verbose(typeof message === 'string' ? message : this.redactor.redact(message), this.isDev ? null : this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  debug(message: any, optionalParams?: any | any[]): void {
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const record = { time, message };

    if (span) {
      tracer.inject(span.context(), formats.LOG, record);
    }

    if (!optionalParams) {
      this.logger.debug(typeof message === 'string' ? message : this.redactor.redact(message), this.context, { ...this.tags });
    }

    this.logger.debug(typeof message === 'string' ? message : this.redactor.redact(message), this.isDev ? null : this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  log(message: any, optionalParams?: any | any[]): void {
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const record = { time, message };

    if (span) {
      tracer.inject(span.context(), formats.LOG, record);
    }

    if (!optionalParams) {
      this.logger.info(message, this.context, { ...this.tags });
    }
    this.logger.info(typeof message === 'string' ? message : this.redactor.redact(message), this.isDev ? null : this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  trace(message: any, optionalParams?: any | any[]): void {
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const record = { time, message };

    if (span) {
      tracer.inject(span.context(), formats.LOG, record);
    }

    if (!optionalParams) {
      this.logger.data(message, this.context, { ...this.tags });
    }
    this.logger.data(typeof message === 'string' ? message : this.redactor.redact(message), this.isDev ? null : this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }
}
