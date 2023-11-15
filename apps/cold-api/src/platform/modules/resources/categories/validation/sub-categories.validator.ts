import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../../worker/worker.class';
import { SubCategories, SubCategoriesSchema } from './schemas/sub-categories.schema';

@Injectable()
export class SubCategoriesValidator extends BaseWorker {
  constructor() {
    super('SubCategoriesValidator');
  }

  /**
   * this action will validate the submitted data against the SubCategories Schema
   * @param data
   * @returns
   */
  validate(data: SubCategories) {
    try {
      return SubCategoriesSchema.parseAsync(data);
    } catch (e) {
      this.logger.error(e, { data });
      throw e;
    }
  }
}
