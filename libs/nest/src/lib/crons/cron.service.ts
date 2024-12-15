import { Global, Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { BaseWorker } from '../worker';

@Global()
@Injectable()
export class CronService extends BaseWorker {
	private scheduler: SchedulerRegistry;

	constructor() {
		super(CronService.name);

		this.scheduler = new SchedulerRegistry();
	}

	getCronJob(name: string): any {
		return this.scheduler.getCronJob(name);
	}

	addCronJob(name: string, expression: CronExpression, callback: () => void): CronJob {
		let job;
		try {
			job = this.scheduler.getCronJob(name);
			this.logger.warn('re-initializing existing cron job', job);
			this.scheduler.deleteCronJob(name);
		} catch (err) {
			this.logger.debug(`no jobs with name ${name}`, { name, expression, callback });
		}

		job = new CronJob(
			expression,
			callback,
			() => {
				this.logger.warn(`${name} job stopped`);
			},
			true,
			'America/Chicago',
		);
		this.scheduler.addCronJob(name, job);
		this.logger.debug(`${name} job started`, job);
		job.start();
		return job;
	}

	stopJob(name: string): void {
		this.logger.info(`stopping ${name}...`);
		this.scheduler.deleteCronJob(name);
	}

	async stopJobs(): Promise<void> {
		this.logger.verbose('clearing up jobs...');
		const jobs = this.scheduler.getCronJobs();
		jobs.forEach(j => {
			j.stop();
		});
	}

	private async exitHandler(options: any, exitCode: number) {
		if (options.cleanup) {
			this.logger.warn('terminating cron jobs...');
			await this.stopJobs();
			this.logger.warn(`done!`);
		}

		if (exitCode || exitCode === 0) {
			this.logger.warn(`received ${exitCode}`);
		}

		if (options.exit) {
			this.logger.warn(`shutting down...`);
			process.exit();
		}
	}

	private initializeExitHandlers() {
		//do something when app is closing
		process.on('exit', this.exitHandler.bind(this, { cleanup: true }));

		//catches ctrl+c event
		process.on('SIGINT', this.exitHandler.bind(this, { cleanup: true, exit: true }));

		// catches "kill pid" (for example: nodemon restart)
		process.on('SIGUSR1', this.exitHandler.bind(this, { exit: true }));
		process.on('SIGUSR2', this.exitHandler.bind(this, { exit: true }));

		//catches uncaught exceptions
		process.on('uncaughtException', this.exitHandler.bind(this, { cleanup: true, exit: true }));
	}
}
