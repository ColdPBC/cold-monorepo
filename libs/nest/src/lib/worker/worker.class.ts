import './tracer';
import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import { StatsD } from 'hot-shots';
import * as path from 'path';
import { merge } from 'lodash';
import { cpus, freemem, hostname, loadavg, NetworkInterfaceInfo, totalmem } from 'os';
import { IWorkerDetails, Tags } from '../primitives';
import { WorkerLogger } from './worker.log.service';
import { TraceService } from 'nestjs-ddtrace';
import process from 'process';
import Tracer from 'dd-trace';

@Injectable()
@Global()
export class BaseWorker implements OnModuleInit {
	public tags: Tags;
	public details: IWorkerDetails;
	protected logger: WorkerLogger;
	public fs = fs;
	public appPackage: any;
	public repoPackage: any;
	protected metrics: StatsD;
	tracer: Tracer.Tracer;

	constructor(readonly className: string) {
		this.repoPackage = JSON.parse(BaseWorker.getJSON('package.json'));
		this.appPackage = JSON.parse(BaseWorker.getJSON('package.json', false));

		this.details = {
			service: process.env.DD_SERVICE || process.env.NX_TASK_TARGET_PROJECT || this.appPackage?.name,
			version: process.env.npm_package_version || this.repoPackage.version,
			home_dir: appRoot.toString(),
			env: process.env.NODE_ENV || 'development',
			host_name: hostname(),
			system_details: {
				load_avg: loadavg(),
				up_time: process.uptime(),
				total_mem: totalmem(),
				free_mem: freemem(),
				cpus: cpus(),
				ips: this.getNetworkDetails(),
			},
		};

		// Set the runtime version in the environment for DD to pick up
		if (this.details.version) {
			process.env.DD_VERSION = this.details.version;
		}

		// set the runtime environment for DD to pick up
		if (!process.env.DD_ENV && this.details.env) {
			process.env.DD_ENV = this.details.env;
		}

		this.tags = {
			service: this.details.service,
			version: this.details.version,
			app: this.repoPackage.name,
			//home_dir: this.details.home_dir,
			env: this.details.env,
			host_name: this.details.host_name,
			//system_details: this.details.system_details,
		};

		this.tracer = new TraceService().getTracer().init({
			service: this.details.service,
			version: this.details.version,
			env: this.details.env,
			logInjection: true,
			hostname: '127.0.0.1',
			profiling: true,
			runtimeMetrics: true,
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
			port: 8126,
		}).tracer;

		this.metrics = new StatsD({
			host: '127.0.0.1',
			port: 8125,
			globalize: true,
			globalTags: this.tags,
		});

		this.tracer.use('express');
		this.tracer.use('amqplib');
		this.tracer.use('amqp10');
		this.tracer.use('redis', { blocklist: ['BRPOPLPUSH'] });
		this.tracer.use('memcached');
		this.tracer.use('openai');
		this.tracer.use('aws-sdk');
		this.tracer.use('ioredis', { blocklist: ['BRPOPLPUSH'] });
		this.tracer.use('pg');
		this.tracer.use('winston');
		this.tracer.use('http');
		this.tracer.use('jest');
		this.tracer.use('fetch');

		this.logger = new WorkerLogger(this.className);

		this.logger.setTags(this.tags);
	}

	async onModuleInit() {
		this.logger.setTags(this.tags);
	}

	public setTags(tags: Tags) {
		this.tags = merge(this.tags, tags);
		this.logger.setTags(this.tags);
	}

	/***
	 * returns the service name defined in package.json
	 * @returns {string}
	 */

	public static getProjectName() {
		const proj = BaseWorker.getParsedJSON(`project.json`);

		return proj.name;
	}

	public static getPkgVersion(): string {
		const pkg = BaseWorker.getParsedJSON('package.json');
		return pkg.version;
	}

	public static getParsedJSON(file: string, root = true): any {
		return JSON.parse(BaseWorker.getJSON(file, root));
	}

	public static getJSON(file: string, root = true): string {
		let project_path = '';

		if (process.env.NX_TASK_TARGET_PROJECT && process.env.NX_TASK_TARGET_PROJECT) {
			if (root && file === 'package.json') project_path = `${process.env.NX_WORKSPACE_ROOT}`;
			else project_path = `${process.env.NX_WORKSPACE_ROOT}/apps/${process.env.NX_TASK_TARGET_PROJECT}`;
		} else {
			if (root && file === 'package.json') project_path = `${appRoot.path}`;
			else project_path = `${appRoot.path}/apps/${process.env.DD_SERVICE || ''}`;
		}

		if (fs.existsSync(`${project_path}/${file}`)) {
			return fs.readFileSync(`${project_path}/${file}`).toString();
		} else {
			throw new Error(`${file} is not found in ${project_path}`);
		}
	}

	public sendMetrics(
		resource: string,
		source: string,
		event: string,
		status: string,
		options: {
			start?: Date;
			sendEvent?: boolean;
			tags: { [key: string]: any };
		},
	) {
		const tags = {
			...options.tags,
			event,
			status,
			source,
		};

		this.metrics.increment(`cold.${resource}`, tags);

		if (options.start) {
			this.metrics.histogram(`cold.${resource}.duration`, new Date().getTime() - options.start.getTime(), tags);
		}

		if (options.sendEvent) {
			let alert_type: 'info' | 'error' | 'success' | 'warning' = 'info';
			if (['completed', 'complete', 'done', 'success'].includes(status)) {
				alert_type = 'success';
			}
			if (['error', 'failed'].includes(status)) {
				alert_type = 'error';
			}

			this.metrics.event(
				`cold.${resource}`,
				`${resource} ${status} ${options.tags.error ? ' | ' + options.tags.error.message : ''}`,
				{
					alert_type: alert_type,
					priority: alert_type === 'info' ? 'low' : 'normal',
					source_type_name: source,
				},
				tags,
			);
		}
	}
	// Instance Functions

	private getNetworkDetails(): NodeJS.Dict<NetworkInterfaceInfo[]> {
		//const nets = networkInterfaces();
		const ips = {};

		return ips;
	}
}
