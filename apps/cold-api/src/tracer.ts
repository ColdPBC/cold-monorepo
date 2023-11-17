import Tracer from 'dd-trace';
import { Request } from 'express';
import { get } from 'lodash';
import { BaseWorker } from 'nest';

const details = JSON.parse(BaseWorker.getJSON('package.json'));

const tracer = Tracer.init({
  service: `cold-api-nest`,
  version: `${process.env.npm_package_version || details.version}`,
  env: `${process.env.NODE_ENV}`,
  logInjection: true,
  hostname: '127.0.0.1',
  profiling: true,
  runtimeMetrics: true,
  tags: {
    environment: `${process.env.NODE_ENV}`,
    host: `${details.host_name}`,
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
