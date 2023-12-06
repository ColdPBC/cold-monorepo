import { Global, Injectable } from '@nestjs/common';
import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import { StatsD } from 'hot-shots';
import * as path from 'path';
import { get, merge } from 'lodash';
import { cpus, freemem, hostname, loadavg, NetworkInterfaceInfo, totalmem } from 'os';
import * as process from 'process';
import { IWorkerDetails, Tags } from '../primitives';
import { RedactorService } from '../redactor';
import { WorkerLogger } from './worker.log.service';
import { TraceService } from 'nestjs-ddtrace';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Global()
export class BaseWorker extends RedactorService {
  public tags: Tags;
  public details: IWorkerDetails;
  protected logger: WorkerLogger;
  public fs = fs;
  protected metrics: StatsD;

  tracer: TraceService;

  constructor(className: string) {
    super();

    const config = new ConfigService();

    this.details = {
      service: config.get('DD_SERVICE') || BaseWorker.getProjectName(),
      version: config.get('DD_VERSION') || BaseWorker.getPkgVersion(),
      home_dir: appRoot.toString(),
      env: config.get('NODE_ENV') || config.getOrThrow('DD_ENVIRONMENT'),
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
      app: this.details.app,
      home_dir: this.details.home_dir,
      env: this.details.env,
      host_name: this.details.host_name,
      system_details: this.details.system_details,
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

    this.logger = new WorkerLogger(className);
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

  public setTags(tags: Tags) {
    this.tags = merge(this.tags, tags);
    this.logger.setTags(this.tags);
  }

  /***
   * returns the service name defined in package.json
   * @returns {string}
   */
  public static getServiceName(path: string = '../../../../../package.json'): string {
    const parsed = JSON.parse(BaseWorker.getJSON(path));
    const logger: WorkerLogger = new WorkerLogger('Static.BaseWorker', parsed);

    const serviceName = get(parsed, 'workerOptions.serviceName');

    if (!serviceName) {
      logger.warn('Service name not defined in package.json.  This can be ignored for now.', null);
    }

    return get(parsed, 'workerOptions.definition.name');
  }

  public static getProjectName() {
    const proj = BaseWorker.getParsedJSON('project.json');
    return proj.name;
  }

  public static getPkgVersion() {
    const pkg = BaseWorker.getParsedJSON('package.json');
    return pkg.version;
  }

  public static getParsedJSON(name: string): any {
    return JSON.parse(BaseWorker.getJSON(name));
  }

  public static getJSON(name: string): string {
    const firstPath = path.resolve(appRoot.toString(), name);
    if (fs.existsSync(firstPath)) {
      return fs.readFileSync(firstPath).toString();
    } else {
      throw new Error(`${name} is not found in '${firstPath}'`);
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
