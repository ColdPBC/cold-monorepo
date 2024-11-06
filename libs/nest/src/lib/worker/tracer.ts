import Tracer from 'dd-trace';
import { ConfigService } from '@nestjs/config';
import { BaseWorker } from './worker.class';
import process from 'process';

const config = new ConfigService();

const tracer = Tracer.init({
	service: config.get('DD_SERVICE') || config.get('PROJECT_NAME') || BaseWorker.getProjectName(),
	env: config.getOrThrow('NODE_ENV'),
	version: config.get('npm_package_version') || config.get('DD_VERSION', BaseWorker.getPkgVersion()),
	logInjection: true,
	hostname: '127.0.0.1',
	profiling: true,
	runtimeMetrics: true,
	tags: {
		service: config.getOrThrow('DD_SERVICE', process.env.NX_TASK_TARGET_PROJECT || BaseWorker.getProjectName()),
		env: config.getOrThrow('NODE_ENV', 'development'),
		version: config.get('npm_package_version', config.get('DD_VERSION')) || BaseWorker.getPkgVersion(),
		environment: config.getOrThrow('NODE_ENV', 'development'),
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
