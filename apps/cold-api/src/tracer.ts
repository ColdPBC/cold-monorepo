import Tracer from 'dd-trace';
import { get } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { BaseWorker } from '@coldpbc/nest';

const config = new ConfigService();

if (!config.get('FC_GIT_COMMIT_SHA')) {
	console.warn('FC_GIT_COMMIT_SHA is not set');
} else {
	process.env.DD_GIT_COMMIT_SHA = config.get('FC_GIT_COMMIT_SHA');
	process.env.DD_GIT_REPOSITORY_URL = config.get('FC_GIT_REPOSITORY_URL') || 'github.com/ColdPBC/cold-monorepo';
}

const tracer = Tracer.init({
	service: config.get('DD_SERVICE') || BaseWorker.getProjectName(),
	env: config.getOrThrow('NODE_ENV'),
	version: config.get('VERSION', process.env.npm_package_version || BaseWorker.getPkgVersion()),
	logInjection: true,
	hostname: '127.0.0.1',
	profiling: true,
	runtimeMetrics: true,
	tags: {
		service: config.get('DD_SERVICE'),
		env: config.getOrThrow('NODE_ENV'),
		version: config.get('version', BaseWorker.getPkgVersion()),
		environment: config.getOrThrow('NODE_ENV'),
		DD_GIT_COMMIT_SHA: config.get('FC_GIT_COMMIT_SHA'),
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
		request: (span, req: any) => {
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
