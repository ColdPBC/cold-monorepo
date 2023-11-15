import { Global, Injectable } from '@nestjs/common';
import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import { StatsD } from 'hot-shots';
import * as path from 'path';
import { get, merge } from 'lodash';
import { cpus, freemem, hostname, loadavg, NetworkInterfaceInfo, platform, totalmem, uptime } from 'os';
import * as process from 'process';
import { IWorkerDetails } from '../primitives/interfaces/worker.interface';
import { RedactorService } from '../redactor/redactor.service';
import { WorkerLogger } from './worker.log.service';
import { Tags } from '../primitives/interfaces/datadog';

@Injectable()
@Global()
export class BaseWorker extends RedactorService {
  public details: IWorkerDetails;
  public tags: Tags;
  protected logger: WorkerLogger;
  public fs = fs;
  protected metrics: StatsD = new StatsD({
    host: '127.0.0.1',
    port: 8125,
  });

  constructor(className: string) {
    super();
    this.logger = new WorkerLogger(className);
    this.setDefaults();
  }

  public setTags(tags: Tags) {
    this.tags = merge(this.tags, tags);
    this.logger.tags = this.tags;
  }

  public setDefaults() {
    const pkg = JSON.parse(BaseWorker.getJSON('package.json'));
    if (pkg) {
      if (!pkg.name) {
        this.logger.warn('Package name not defined in package.json.  This can be ignored for now.', pkg);
      }
      if (!pkg.version) {
        this.logger.warn('Package version not defined in package.json.  This can be ignored for now.', pkg);
      }

      process.env.DD_SERVICE = process.env.npm_package_name || pkg.name;
      process.env.DD_VERSION = process.env.npm_package_version || get(pkg, 'version');
    } else {
      this.logger.warn('Package.json not found.  This can be ignored for now.', null);
    }

    this.details = merge({
      pkg_name: get(pkg, 'name'),
      pkg_version: get(pkg, 'version'),
      home_dir: appRoot.toString(),
      host_name: hostname(),
      system_details: {
        load_avg: loadavg(),
        system_up_time: uptime(),
        up_time: process.uptime(),
        total_mem: totalmem(),
        free_mem: freemem(),
        platform: platform(),
        cpus: cpus(),
        ips: this.getNetworkDetails(),
      },
    });

    this.tags = {
      env: process.env.NODE_ENV || 'development',
      app: process.env.npm_package_name || this.details.pkg_name,
      version: process.env.npm_package_version,
      service: process.env.npm_package_name || this.details.pkg_name,
      host: this.details.host_name,
    };
  }

  /***
   * returns the service name defined in package.json
   * @returns {string}
   */
  public static getServiceName(): string {
    const parsed = JSON.parse(BaseWorker.getJSON('package.json'));
    const logger: WorkerLogger = new WorkerLogger('Static.BaseWorker', parsed);

    const serviceName = get(parsed, 'workerOptions.serviceName');

    if (!serviceName) {
      logger.warn('Service name not defined in package.json.  This can be ignored for now.', null);
    }

    return get(parsed, 'workerOptions.definition.name');
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
