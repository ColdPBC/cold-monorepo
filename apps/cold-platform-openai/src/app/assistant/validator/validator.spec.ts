/* eslint-disable @typescript-eslint/no-unused-vars */

import {OpenAIResponse} from './validator';
import {Job, JobId, JobOptions, JobStatus} from 'bull';

describe('Validator', () => {
  let job: Job;

  beforeAll(() => {
    job = {
      attemptsMade: 0,
      name: 'testJob',
      opts: undefined,
      queue: undefined,
      returnvalue: undefined,
      stacktrace: [],
      timestamp: 0,
      toJSON(): {
        id: JobId;
        name: string;
        data: any;
        opts: JobOptions;
        progress: number;
        delay: number;
        timestamp: number;
        attemptsMade: number;
        failedReason: any;
        stacktrace: string[] | null;
        returnvalue: any;
        finishedOn: number | null;
        processedOn: number | null;
      } {
        return undefined;
      },
      update(data: any): Promise<void> {
        return Promise.resolve(undefined);
      },
      discard(): Promise<void> {
        return Promise.resolve(undefined);
      },
      extendLock(duration: number): Promise<number> {
        return Promise.resolve(0);
      },
      finished(): Promise<any> {
        return Promise.resolve(undefined);
      },
      getState(): Promise<JobStatus | 'stuck'> {
        return Promise.resolve(undefined);
      },
      isActive(): Promise<boolean> {
        return Promise.resolve(false);
      },
      isCompleted(): Promise<boolean> {
        return Promise.resolve(false);
      },
      isDelayed(): Promise<boolean> {
        return Promise.resolve(false);
      },
      isFailed(): Promise<boolean> {
        return Promise.resolve(false);
      },
      isPaused(): Promise<boolean> {
        return Promise.resolve(false);
      },
      isStuck(): Promise<boolean> {
        return Promise.resolve(false);
      },
      isWaiting(): Promise<boolean> {
        return Promise.resolve(false);
      },
      lockKey(): string {
        return '';
      },
      log(row: string): Promise<any> {
        return Promise.resolve(undefined);
      },

      moveToCompleted(returnValue?: string, ignoreLock?: boolean, notFetch?: boolean): Promise<[any, JobId] | null> {
        return Promise.resolve(undefined);
      },
      moveToFailed(errorInfo: { message: string }, ignoreLock?: boolean): Promise<[any, JobId] | null> {
        return Promise.resolve(undefined);
      },
      progress(value?: any): any {},
      promote(): Promise<void> {
        return Promise.resolve(undefined);
      },
      releaseLock(): Promise<void> {
        return Promise.resolve(undefined);
      },
      remove(): Promise<void> {
        return Promise.resolve(undefined);
      },
      retry(): Promise<void> {
        return Promise.resolve(undefined);
      },
      takeLock(): Promise<number | false> {
        return Promise.resolve(undefined);
      },
      id: 1,
      data: {},
    };
  });

  it('should be defined', () => {
    expect(new OpenAIResponse(job)).toBeDefined();
  });
});
