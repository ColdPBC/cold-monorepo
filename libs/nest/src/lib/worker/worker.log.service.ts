import { LoggerService } from '@nestjs/common';
import safeStringify from 'fast-safe-stringify';
import winstonConfig from './winston.config';
import winston, { createLogger } from 'winston';
import { Tags } from '../primitives';
import { cloneDeep, merge } from 'lodash';
import { ConfigService } from '@nestjs/config'; /// test
import tracer from 'dd-trace';
import formats from 'dd-trace/ext/formats';
import { RedactorService } from '../redactor'; /// test

/// test
export class WorkerLogger implements LoggerService {
	tags: Tags;
	logger: winston.Logger;
	context: string;
	config: ConfigService;
	isDev: boolean;
	redactor: RedactorService;

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

		this.redactor = new RedactorService();
		this.isDev = this.config.get('NODE_ENV') !== 'production' && this.config.get('NODE_ENV') !== 'staging';
	}

	public setTags(tags: Tags) {
		this.tags = merge(this.tags, tags);
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
					meta: this.redactor.redact(cloneDeep(optionalParams)),
					...this.tags,
				}),
			);
		} else {
			if (error?.message) {
				this.logger.error(error?.message, { error, meta: this.redactor.redact(cloneDeep(optionalParams)), ...this.tags });
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
			this.logger.warn(message, this.context, { ...this.tags });
		}

		this.logger.warn(message, this.isDev ? null : { meta: this.redactor.redact(cloneDeep(optionalParams)), ...this.tags });
	}

	info(message: string, optionalParams?: any | any[]): void {
		const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}

		if (!optionalParams) {
			this.logger.info(message, this.context, { ...this.tags });
		}

		this.logger.info(message, { meta: this.redactor.redact(cloneDeep(optionalParams)), ...this.tags });
	}

	verbose(message: string, optionalParams?: any | any[]): void {
		const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}

		if (!optionalParams) {
			this.logger.verbose(message, this.context, { ...this.tags });
		}

		this.logger.verbose(message, { meta: this.redactor.redact(cloneDeep(optionalParams)), ...this.tags });
	}

	debug(message: any, optionalParams?: any | any[]): void {
		const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}

		if (!optionalParams) {
			this.logger.debug(message, this.context, { ...this.tags });
		}

		this.logger.debug(message, { meta: this.redactor.redact(cloneDeep(optionalParams)), ...this.tags });
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

		this.logger.info(message, { meta: this.redactor.redact(cloneDeep(optionalParams)), ...this.tags });
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

			optionalParams = {};
		}

		this.logger.data(message, { meta: this.redactor.redact(cloneDeep(optionalParams)), ...this.tags });
	}
}
