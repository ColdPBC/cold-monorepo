import * as winston from 'winston';
import { omit } from 'lodash';
import * as opentelemetry from '@opentelemetry/api'; // Testing

const tracingFormat = function () {
	return winston.format(info => {
		const span = opentelemetry.trace.getSpan(opentelemetry.context.active());
		if (span) {
			const { spanId, traceId } = span.spanContext();
			const traceIdEnd = traceId.slice(traceId.length / 2);
			info['dd.trace_id'] = BigInt(`0x${traceIdEnd}`).toString();
			info['dd.span_id'] = BigInt(`0x${spanId}`).toString();
		}
		return info;
	})();
};

const winstonConfig = (context: string, meta?: any) => {
	const config = {
		service: process.env['DD_SERVICE'] || meta?.service || 'cold-graphql',
		version: process.env['VERSION'] || meta?.version || '1.0.0',
		environment: process.env['NODE_ENV'] || meta?.environment,
		...omit(meta, ['service', 'version', 'environment']),
		context: context,
		tags: ['graphweaver', 'winston'],
		transports: [new winston.transports.Console()],
		format: winston.format.combine(tracingFormat(), winston.format.json()),
	};

	return config;
};

export default winstonConfig;
