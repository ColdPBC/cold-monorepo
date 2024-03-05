import { add } from 'date-fns';
import { BaseWorker } from '../worker';
import { BullModuleOptions } from '@nestjs/bull';
import { DarklyService } from '../darkly';
import { ConfigService } from '@nestjs/config';

export class RedisServiceConfig extends BaseWorker {
  max: number;
  interval: number;
  // max retry time is 24 hours
  maxRetryLength: number;
  concurrency: number;
  concurrency_interval: number;
  db: number;
  removeOnComplete: any;
  removeOnFail: any;
  darkly: DarklyService;

  constructor(private readonly config: ConfigService) {
    super(RedisServiceConfig.name);

    this.darkly = new DarklyService(this.config);
    this.max = this.config['MAX_RETRY_ATTEMPTS'] || 5;
    this.interval = this.config['RETRY_INTERVAL'] || 60000;
    this.maxRetryLength = this.config['MAX_RETRY_LENGTH'] || 60000 * 60 * 24;
    this.db = this.config['REDIS_DB'] || 1;
    this.concurrency = this.config['JOB_CONCURRENCY'] || 1;
    this.concurrency_interval = this.config['JOB_CONCURRENCY_INTERVAL'] || 1000;
  }

  async getQueueConfig(type: string, queueName: string): Promise<BullModuleOptions> {
    return {
      name: `${queueName}`,
      //redis: await RedisServiceConfig.getRedisOpts(),
      redis: {
        db: 1,
        tls: {
          rejectUnauthorized: false,
          requestCert: false,
        },
      },
      url: this.config['REDISCLOUD_URL'],
      prefix: `${type}`,
      limiter: {
        max: this.concurrency,
        duration: this.concurrency_interval,
        bounceBack: false, // set to false to still process jobs that came in faster than the limiter rate
      },
      settings: {
        backoffStrategies: {
          jitter: (attemptsMade, err: any) => {
            // randomize retry time between 1 and 288 minutes.  If Max attempts is 5, then on the 5th attempt, the max random retry time is 1440 minutes (24 hours)
            const retryTime = this.interval + Math.floor(Math.random() * (288 - 1 + 1) + 1) * attemptsMade;

            this.logger.info(
              JSON.stringify({
                error: err,
                message: `[${attemptsMade} of ${this.max}] Next Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
              }),
            );

            return retryTime <= this.maxRetryLength ? retryTime : this.maxRetryLength;
          },
          exponential: (attemptsMade: number, err: Error) => {
            if (attemptsMade == 0) {
              attemptsMade = 1;
            }

            let retryTime = this.interval * 60 * (attemptsMade * attemptsMade);
            if (attemptsMade < this.max) {
              this.logger.info(
                JSON.stringify({
                  error: err,
                  message: `[${attemptsMade} of ${this.max}] Next Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
                }),
              );
            } else {
              retryTime = this.interval * 60 * 24;
              this.logger.warn(
                JSON.stringify({
                  error: err,
                  message: `[${attemptsMade} of ${this.max}] Final Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
                }),
              );
            }
            return retryTime;
          },
          hourly_progressive: (attemptsMade: number, err: Error) => {
            let retryTime = 60000 * 60 * attemptsMade;
            if (attemptsMade < this.max - 1 && retryTime < this.maxRetryLength) {
              this.logger.info(
                JSON.stringify({
                  error: err,
                  message: `[${attemptsMade} of ${this.max}] Next Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
                }),
              );
            } else {
              retryTime = 60000 * 60 * 24;
              this.logger.warn(
                JSON.stringify({
                  error: err,
                  message: `[${attemptsMade} of ${this.max}] Final Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
                }),
              );
            }

            return retryTime;
          },
        },
      },
      defaultJobOptions: {
        attempts: this.max,
        removeOnComplete: this.removeOnComplete,
        removeOnFail: this.removeOnFail,
      },
    };
  }
}

export interface RedisOptions {
  settings: {
    backoffStrategies: {
      jitter: (attemptsMade: number, err: any) => number;
      hourly_progressive: (attemptsMade: number, err: Error) => any;
      exponential: (attemptsMade: number, err: Error) => any;
    };
  };
  prefix: string;
  limiter: {
    duration: any;
    bounceBack: boolean;
    max: any;
  };
  name: string;
  defaultJobOptions: {
    removeOnFail: any;
    removeOnComplete: any;
    attempts: any;
  };
  redis?: any;
  url: string;
}

export enum BackOffStrategies {
  EXPONENTIAL = 'exponential',
  HOURLY_PROGRESSIVE = 'hourly_progressive',
  JITTER = 'jitter',
}

export interface IQueueLimiter {
  max: number;
  duration: number;
  bounceBack: boolean;
}

export interface IQueueSettings {
  backoffStrategies: unknown;
}

export interface IQueueDefaultJobOptions {
  attempts: number;
  removeOnComplete: boolean;
  removeOnFail: boolean;
  repeat?: RepeatOpts;
}

export interface RepeatOpts {
  cron?: string; // Cron string
  tz?: string; // Timezone
  startDate?: Date | string | number; // Start date when the repeat job should start repeating (only with cron).
  endDate?: Date | string | number; // End date when the repeat job should stop repeating.
  limit?: number; // Number of times the job should repeat at max.
  every?: number; // Repeat every millis (cron setting cannot be used together with this setting.)
  count?: number; // The start value for the repeat iteration count.
}
