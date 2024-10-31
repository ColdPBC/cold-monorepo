import safeStringify from 'fast-safe-stringify';
import winstonConfig from './winston.config';
import winston, { createLogger } from 'winston';
import { merge } from 'lodash';

/// test
export class WorkerLogger {
	tags: any;
	logger: winston.Logger;
	context: string;
	isDev: boolean;

	/**
	 * Creates an instance of WorkerLogger.
	 * @param className
	 * @param meta
	 */
	constructor(className: string, meta?: any) {
		if (meta) {
			meta = typeof meta === 'string' ? JSON.parse(meta) : JSON.parse(safeStringify(meta));
		}

		this.context = className;
		this.logger = createLogger(winstonConfig(className, meta)).child({
			context: className,
			meta,
		});

		this.isDev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';

		process.env.DD_VERSION = process.env.npm_package_version;

		this.tags = {
			app: 'cold-graphql',
			version: process.env.npm_package_version,
			environment: process.env.NODE_ENV,
			service: process.env.DD_SERVICE,
		};
	}

	public setTags(tags: any) {
		this.tags = merge(this.tags, tags);
	}

	error(error: any, optionalParams?: any | any[]): void {
		//const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, error };

		/*if (span) {
			//tracer.inject(span.context(), formats.LOG, record);
		}*/

		if (typeof error === 'string') {
			this.logger.error(error, {
				meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
				...this.tags,
				context: this.context,
			});
		} else if (error?.response?.data) {
			this.logger.error(
				error.response?.data?.message,
				safeStringify({
					error: error?.response?.data,
					meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
					...this.tags,
				}),
			);
		} else {
			if (error?.message) {
				this.logger.error(error?.message, {
					error,
					meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
					...this.tags,
				});
			} else if (!error) {
				this.logger.error(optionalParams.error);
			}
		}
	}

	warn(message: string, optionalParams?: any | any[]): void {
		//const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		/*if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}*/

		this.logger.warn(message, {
			meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
			...this.tags,
		});
	}

	info(message: string, optionalParams?: any | any[]): void {
		//const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		/*if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}*/

		this.logger.info(message, {
			meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
			...this.tags,
		});
	}

	log(message: string, optionalParams?: any | any[]): void {
		//const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		/*if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}*/

		this.logger.info(message, {
			meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
			...this.tags,
		});
	}

	verbose(message: string, optionalParams?: any | any[]): void {
		//const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		/*if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}*/

		this.logger.verbose(message, {
			meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
			...this.tags,
		});
	}

	debug(message: any, optionalParams?: any | any[]): void {
		//const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		/*if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}*/

		this.logger.debug(message, {
			meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
			...this.tags,
		});
	}

	trace(message: any, optionalParams?: any | any[]): void {
		//const span = tracer.scope().active();
		const time = new Date().toISOString();
		const record = { time, message };

		/*if (span) {
			tracer.inject(span.context(), formats.LOG, record);
		}*/

		this.logger.data(message, {
			meta: !optionalParams ? null : typeof optionalParams === 'string' ? JSON.parse(optionalParams) : JSON.parse(safeStringify(optionalParams)),
			...this.tags,
		});
	}
}
