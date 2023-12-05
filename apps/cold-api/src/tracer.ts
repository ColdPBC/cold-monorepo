import Tracer from 'dd-trace';
import { Request } from 'express';
import { get } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { BaseWorker } from '@coldpbc/nest';

const config = new ConfigService();
const tracer = Tracer.init({
  service: config.get('DD_SERVICE') || config.getOrThrow('NX_TASK_TARGET_PROJECT'),
  env: config.get('DD_ENV') || config.getOrThrow('NX_TASK_TARGET_ENVIRONMENT'),
  version: config.get('VERSION', BaseWorker.getPkgVersion()),
  logInjection: true,
  hostname: '127.0.0.1',
  profiling: true,
  runtimeMetrics: true,
  tags: {
    service: config.get('DD_SERVICE') || config.getOrThrow('NX_TASK_TARGET_PROJECT'),
    env: config.get('DD_ENV') || config.getOrThrow('NX_TASK_TARGET_ENVIRONMENT'),
    version: config.get('version', BaseWorker.getPkgVersion()),
    environment: config.get('DD_ENV') || config.getOrThrow('NX_TASK_TARGET_ENVIRONMENT'),
  },
  dogstatsd: {
    hostname: '127.0.0.1',
    port: 8125,
  },
  logLevel: 'debug',
  plugins: true,
  dbmPropagationMode: 'full',
  experimental: { iast: true, runtimeId: true },
  appsec: { enabled: true, eventTracking: { mode: 'extended' } },
  remoteConfig: {
    pollInterval: 5,
  },
  clientIpEnabled: true,
});

tracer.use('express', {
  hooks: {
    request: (span, req: Request) => {
      if (req?.query?.bpc) {
        span?.setTag('bypass_cache', req.query.bpc);
      }

      if (req?.query?.impersonateOrg) {
        span?.setTag('impersonateOrg', req.query.impersonateOrg);
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (req.user) {
        span?.setTag('user', {
          id: get(req, 'user.sub'),
          email: get(req, 'user.coldclimate_claims.email'),
          organization: get(req, 'user.coldclimate_claims.org_id'),
        });
      }
    },
  },
});
export default tracer;
