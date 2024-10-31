import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import { StatsD } from 'hot-shots';
import * as path from 'path';
import { get, merge } from 'lodash';
import { cpus, freemem, hostname, loadavg, NetworkInterfaceInfo, totalmem } from 'os';
import { IWorkerDetails, Tags } from '../primitives';
import { WorkerLogger } from './worker.log.service';
import { TraceService } from 'nestjs-ddtrace';
import { ConfigService } from '@nestjs/config';
import process from 'process';

@Injectable()
@Global()
export class BaseWorker implements OnModuleInit {
	public tags: Tags;
	public details: IWorkerDetails;
	protected logger: WorkerLogger;
	public fs = fs;
	protected metrics: StatsD;
	tracer: TraceService;

	constructor(readonly className: string) {
		const config = new ConfigService();

		this.details = {
			service: config.getOrThrow('DD_SERVICE') || process.env.NX_TASK_TARGET_PROJECT || BaseWorker.getProjectName(),
			version: config.get('npm_package_version') || config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
			home_dir: appRoot.toString(),
			env: config.getOrThrow('NODE_ENV'),
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

		this.tags = {
			service: this.details.service,
			version: this.details.version,
			app: process.env.NX_TASK_TARGET_PROJECT,
			//home_dir: this.details.home_dir,
			env: this.details.env,
			host_name: this.details.host_name,
			//system_details: this.details.system_details,
		};

		this.tracer = new TraceService();
		this.metrics = new StatsD({
			host: '127.0.0.1',
			port: 8125,
			globalize: true,
			globalTags: this.tags,
		});
		this.tracer.getTracer().init({
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
		});

		this.logger = new WorkerLogger(this.className);

		const pkg = JSON.parse(BaseWorker.getJSON('package.json'));
		if (pkg) {
			if (!pkg.name) {
				this.logger.warn('Package name not defined in package.json.  This can be ignored for now.', pkg);
			}
			if (!pkg.version) {
				this.logger.warn('Package version not defined in package.json.  This can be ignored for now.', pkg);
			}

			process.env['npm_package_name'] || pkg.name;
			//process.env['DD_VERSION'] = process.env['npm_package_version'] || get(pkg, 'version');
		} else {
			this.logger.warn('Package.json not found.  This can be ignored for now.', null);
		}
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

	public static getParsedJSON(file: string): any {
		return JSON.parse(BaseWorker.getJSON(file));
	}

	public static getJSON(file: string): string {
		const project_path = `${process.env.NX_WORKSPACE_ROOT}/apps/${process.env.NX_TASK_TARGET_PROJECT}`;
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
	public getJSON(name = 'package.json') {
		return BaseWorker.getJSON(name);
	}

	private getNetworkDetails(): NodeJS.Dict<NetworkInterfaceInfo[]> {
		//const nets = networkInterfaces();
		const ips = {};

		return ips;
	}
}
