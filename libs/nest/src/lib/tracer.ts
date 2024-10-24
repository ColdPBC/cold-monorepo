import Tracer from 'dd-trace';
import { ConfigService } from '@nestjs/config';
import { BaseWorker } from './worker';

console.log({ message: 'setting up tracer...' });
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
	version: config.get('DD_VERSION', BaseWorker.getPkgVersion()),
	logInjection: true,
	hostname: '127.0.0.1',
	profiling: true,
	runtimeMetrics: true,
	tags: {
		service: config.getOrThrow('DD_SERVICE') || BaseWorker.getProjectName(),
		env: config.getOrThrow('NODE_ENV'),
		version: config.get('DD_VERSION', BaseWorker.getPkgVersion()),
		environment: config.getOrThrow('NODE_ENV'),
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
tracer.use('redis');
tracer.use('memcached');
tracer.use('openai');
tracer.use('aws-sdk');
tracer.use('ioredis');
tracer.use('pg');
tracer.use('winston');
tracer.use('http');
tracer.use('jest');
tracer.use('fetch');

export default Tracer;
