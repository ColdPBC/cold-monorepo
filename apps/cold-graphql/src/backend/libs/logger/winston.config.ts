import * as winston from 'winston';
import { omit } from 'lodash';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities'; // Testing

const winstonConfig = (context: string, meta?: any) => {
	const config = {
		service: 'cold-graphql',
		version: '1.1.1',
		environment: process.env['NODE_ENV'] || meta?.environment,
		...omit(meta, ['service', 'version', 'environment']),
		context: context,
		tags: ['graphweaver', 'winston'],
		transports: [
			new winston.transports.Console({
				format:
					process.env['NODE_ENV'] === 'development' || process.env['LOG_FORMAT'] === 'pretty'
						? winston.format.combine(winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike('cold-graphql-api')))
						: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.align()),
			}),
		],
	};

	//console.log('winstonConfig', config);

	return config;
};

export default winstonConfig;
