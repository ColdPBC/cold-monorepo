import Graphweaver from '@exogee/graphweaver-server';
import './schema';

import { AuthZero, setAddUserToContext, setAdministratorRoleName, setImplicitAllow } from '@exogee/graphweaver-auth';
import { addUserToContext } from './cold_profile';
import { createLogger } from 'winston';
import { omit } from 'lodash';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
export const authZero = new AuthZero();

setAddUserToContext(addUserToContext);
setAdministratorRoleName('cold:admin');

const meta = { service: 'graphweaver', environment: process.env.NODE_ENV || 'development', version: '1.0.0' };
const winstonConfig = (context: string, meta?: any) => {
  const config = {
    service: process.env['DD_SERVICE'] || meta?.service,
    version: process.env['DD_VERSION'] || meta?.version,
    environment: process.env['NODE_ENV'] || meta?.environment,
    ...omit(meta, ['service', 'version', 'environment']),
    context: context,
    tags: ['nest.js', 'winston'],
    transports: [
      new winston.transports.Console({
        format:
          process.env['NODE_ENV'] === 'development' || process.env['LOG_FORMAT'] === 'pretty'
            ? winston.format.combine(winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()))
            : winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.align()),
      }),
    ],
  };

  //console.log('winstonConfig', config);

  return config;
};
export const graphweaver = new Graphweaver({
  apolloServerOptions: {
    introspection: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging',
    status400ForVariableCoercionErrors: true,
    hideSchemaDetailsFromClientErrors: process.env.NODE_ENV !== 'development',
    includeStacktraceInErrorResponses: process.env.NODE_ENV === 'development',
    formatError: (error, context) => {
      return {
        extensions: error.extensions,
        message: error.message,
        locations: error.locations,
        path: error.path,
        context,
      };
    },
    logger: createLogger(winstonConfig(meta.service, meta)).child({
      context: meta.service,
      meta,
    }),
  },
  graphQLArmorOptions: {
    maxAliases: { n: 60 },
  },
});
