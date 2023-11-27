import { Injectable } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { Activity, ActivitySchema } from './schemas/activities.schema';

@Injectable()
export class ActivityValidator extends BaseWorker {
  constructor() {
    super('ActivityValidator');
  }

  /**
   * this action will validate the submitted data against the Activity Schema
   * @param data
   * @returns Promise<ActivitySchema>
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
