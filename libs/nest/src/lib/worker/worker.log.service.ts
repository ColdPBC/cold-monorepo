import { LoggerService } from '@nestjs/common';
import safeStringify from 'fast-safe-stringify';
import winstonConfig from './winston.config';
import winston, { createLogger } from 'winston';
import { BaseWorker } from './worker.class';
import { Tags } from '../primitives';
import { merge } from 'lodash';
import { ConfigService } from '@nestjs/config'; /// test
import tracer from 'dd-trace';
import formats from 'dd-trace/ext/formats'; /// test

/// test
export class WorkerLogger implements LoggerService {
	tags: Tags;
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

		this.tags = {
			app: process.env.DD_SERVICE || BaseWorker.getParsedJSON('package.json').name,
			version: process.env.DD_VERSION || BaseWorker.getParsedJSON('package.json').version,
			environment: this.config.get('NODE_ENV'),
			service: this.config.get('DD_SERVICE'),
		};
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
			this.logger.warn(message, this.context, { ...this.tags });
		}

		this.logger.warn(message, this.isDev ? null : { meta: optionalParams, ...this.tags });
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

		this.logger.info(message, { meta: optionalParams, ...this.tags });
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

		this.logger.verbose(message, { meta: optionalParams, ...this.tags });
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

		this.logger.debug(message, { meta: optionalParams, ...this.tags });
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

		this.logger.info(message, { meta: optionalParams, ...this.tags });
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

		this.logger.data(message, { meta: optionalParams, ...this.tags });
	}
}
