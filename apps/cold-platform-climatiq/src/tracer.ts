import Tracer from 'dd-trace';
import { BaseWorker } from '@coldpbc/nest';
import process from 'process';

const repoPkg = BaseWorker.getParsedJSON('package.json');
const appPkg = BaseWorker.getParsedJSON('package.json', false);

const tracer = Tracer.init({
	service: process.env.DD_SERVICE || BaseWorker.getProjectName(),
	env: process.env.NODE_ENV,
	version: process.env.npm_package_version || BaseWorker.getPkgVersion(),
	logInjection: true,
	hostname: '127.0.0.1',
	profiling: true,
	runtimeMetrics: true,
	tags: {
		service: appPkg.name || process.env.NX_TASK_TARGET_PROJECT || BaseWorker.getProjectName(),
		env: process.env.NODE_ENV,
		version: repoPkg.version || process.env.npm_package_version || BaseWorker.getPkgVersion(),
		environment: process.env.NODE_ENV,
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

tracer.use('express');
tracer.use('amqplib');
tracer.use('amqp10');
tracer.use('redis', { blocklist: ['BRPOPLPUSH'] });
tracer.use('memcached');
tracer.use('openai');
tracer.use('aws-sdk');
tracer.use('ioredis', { blocklist: ['BRPOPLPUSH'] });
tracer.use('pg');
tracer.use('winston');
tracer.use('http');
tracer.use('jest');
tracer.use('fetch');
tracer.use('aws-sdk');

export default Tracer;
