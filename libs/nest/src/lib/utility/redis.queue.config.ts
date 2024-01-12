import { get } from 'lodash';
import { add } from 'date-fns';
import * as url from 'url';
import { BaseWorker, WorkerLogger } from '../worker';
import { BullModuleOptions } from '@nestjs/bull';

export class RedisServiceConfig extends BaseWorker {
  static async getRedisOpts() {
    const secrets: any = { REDISCLOUD_URL: 'redis://localhost:6379' };

    const redisOpts: any = {};
    try {
      const redisUrl = new url.URL(secrets.REDISCLOUD_URL);
      redisOpts.port = redisUrl.port || 6379;
      redisOpts.host = redisUrl.hostname;
      redisOpts.db = redisUrl.pathname ? redisUrl.pathname.split('/')[1] : 0;

      if (redisUrl.password) {
        redisOpts.password = redisUrl.password;
        redisOpts.username = redisUrl.username;
      }

      if (redisUrl.protocol == 'rediss:') {
        redisOpts.tls = { servername: redisUrl.hostname };
      }
    } catch (e: any) {
      throw new Error(e.message);
    }

    return redisOpts;
  }

  static async getQueueConfig(type: string, queueName: string, db: number = 0): Promise<BullModuleOptions> {
    const max = get(process, 'env.MAX_RETRY_ATTEMPTS', 5) as number;
    const interval = get(process, 'env.RETRY_INTERVAL', 60000) as number;
    const concurrency = get(process, 'env.JOB_CONCURRENCY', 1) as number;
    const concurrency_interval = get(process, 'env.JOB_CONCURRENCY_INTERVAL', 1000) as number;
    const logger = new WorkerLogger(RedisServiceConfig.name);
    // max retry time is 24 hours
    const maxRetryLength = get(process, 'env.MAX_RETRY_LENGTH', 60000 * 60 * 24) as number;

    return {
      name: `${queueName}`,
      //redis: await RedisServiceConfig.getRedisOpts(),
      redis: {
        db: db,
      },
      url: get(process, 'env.REDISCLOUD_URL', 'redis://localhost:6379') as string,
      prefix: `${type}`,
      limiter: {
        max: concurrency,
        duration: concurrency_interval,
        bounceBack: false, // set to false to still process jobs that came in faster than the limiter rate
      },
      settings: {
        backoffStrategies: {
          jitter: (attemptsMade, err: any) => {
            // randomize retry time between 1 and 288 minutes.  If Max attempts is 5, then on the 5th attempt, the max random retry time is 1440 minutes (24 hours)
            const retryTime = interval + Math.floor(Math.random() * (288 - 1 + 1) + 1) * attemptsMade;

            logger.info(
              JSON.stringify({
                error: err,
                message: `[${attemptsMade} of ${max}] Next Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
              }),
            );

            return retryTime <= maxRetryLength ? retryTime : maxRetryLength;
          },
          exponential: (attemptsMade: number, err: Error) => {
            if (attemptsMade == 0) {
              attemptsMade = 1;
            }

            let retryTime = interval * 6 * (attemptsMade * attemptsMade);
            if (attemptsMade < max) {
              logger.info(
                JSON.stringify({
                  error: err,
                  message: `[${attemptsMade} of ${max}] Next Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
                }),
              );
            } else {
              retryTime = interval * 60 * 24;
              logger.warn(
                JSON.stringify({
                  error: err,
                  message: `[${attemptsMade} of ${max}] Final Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
                }),
              );
            }
            return retryTime;
          },
          hourly_progressive: (attemptsMade: number, err: Error) => {
            let retryTime = 60000 * 60 * attemptsMade;
            if (attemptsMade < max - 1 && retryTime < maxRetryLength) {
              logger.info(
                JSON.stringify({
                  error: err,
                  message: `[${attemptsMade} of ${max}] Next Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
                }),
              );
            } else {
              retryTime = 60000 * 60 * 24;
              logger.warn(
                JSON.stringify({
                  error: err,
                  message: `[${attemptsMade} of ${max}] Final Attempt: ${add(new Date(Date.now()), { seconds: retryTime / 1000 })}`,
                }),
              );
            }

            return retryTime;
          },
        },
      },
      defaultJobOptions: {
        attempts: max,
        removeOnComplete: true,
        removeOnFail: false,
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
    removeOnFail: boolean;
    removeOnComplete: boolean;
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
