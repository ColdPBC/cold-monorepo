import { LoggerService } from '@nestjs/common';
import { AxiosError } from 'axios';
import safeStringify from 'fast-safe-stringify';
import winstonConfig from './winston.config';
import winston, { createLogger } from 'winston';
import { RedactorService } from '../redactor/redactor.service';
import process from 'process';
/// test
export class WorkerLogger implements LoggerService {
  tags: any = { version: process.env.npm_package_version, service: process.env.npm_package_name };
  redactor: RedactorService;
  logger: winston.Logger;
  context: string;
  /**
   * Creates an instance of WorkerLogger.
   * @param className
   * @param meta
   */
  constructor(className: string, meta?: any) {
    this.context = className;
    this.logger = createLogger(winstonConfig(className)).child({
      context: className,
      meta,
    });

    //Logger.overrideLogger(this.logger);
    this.redactor = new RedactorService();
  }

  setRedactor(scrubber: RedactorService): WorkerLogger {
    this.redactor = scrubber;
    return this;
  }

  error(error, optionalParams?: any | any[]): void {
    if (typeof error === 'string') {
      this.logger.error(error, { ...optionalParams, ...this.tags, context: this.context });
    } else if (typeof error === typeof AxiosError) {
      this.logger.error(error.response?.data?.message, safeStringify({ error, meta: optionalParams, ...this.tags }));
    } else {
      this.logger.error(error.message, this.redactor.redact(JSON.parse(safeStringify({ error, meta: optionalParams, ...this.tags }))));
    }
  }

  warn(message: string, optionalParams?: any | any[]): void {
    if (!optionalParams) {
      this.logger.warn(typeof message === 'string' ? message : this.redactor.redact(message), this.context, { ...this.tags });
    }

    this.logger.warn(typeof message === 'string' ? message : this.redactor.redact(message), this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  info(message: string, optionalParams?: any | any[]): void {
    if (!optionalParams) {
      this.logger.info(typeof message === 'string' ? message : this.redactor.redact(message), this.context, { ...this.tags });
    }

    this.logger.info(typeof message === 'string' ? message : this.redactor.redact(message), this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  verbose(message: string, optionalParams?: any | any[]): void {
    if (!optionalParams) {
      this.logger.verbose(typeof message === 'string' ? message : this.redactor.redact(message), this.context, { ...this.tags });
    }

    this.logger.verbose(typeof message === 'string' ? message : this.redactor.redact(message), this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  debug(message: any, optionalParams?: any | any[]): void {
    if (!optionalParams) {
      this.logger.debug(typeof message === 'string' ? message : this.redactor.redact(message), this.context, { ...this.tags });
    }

    this.logger.debug(typeof message === 'string' ? message : this.redactor.redact(message), this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }

  log(message: any, optionalParams?: any | any[]): void {
    if (!optionalParams) {
      this.logger.info(message, this.context, { ...this.tags });
    }
    this.logger.info(typeof message === 'string' ? message : this.redactor.redact(message), this.redactor.redact({ meta: optionalParams, ...this.tags }));
  }
}
