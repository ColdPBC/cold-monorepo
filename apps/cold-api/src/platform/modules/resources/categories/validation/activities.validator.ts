import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../../worker/worker.class';
import { Activity, ActivitySchema } from './schemas/activities.schema';

@Injectable()
export class ActivitiesValidator extends BaseWorker {
  constructor() {
    super('ActivitiesValidator');
  }

  /**
   * this action will validate the submitted data against the Activities Schema
   * @param data
   * @returns Promise<Record<string, {activity_name?: string, activity_description?: string}>>
   */
  async validate(data: Activity) {
    try {
      return ActivitySchema.parseAsync(data);
    } catch (e) {
      this.logger.error(e, { data });
      throw e;
    }
  }
}
