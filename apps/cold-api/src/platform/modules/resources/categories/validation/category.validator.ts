import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../../worker/worker.class';
import { Category, CategorySchema } from './schemas/category.schema';

@Injectable()
export class CategoryValidator extends BaseWorker {
  constructor() {
    super('CategoryValidator');
  }

  /**
   * this action will validate the submitted data against the Category Schema
   * @param data
   * @returns Promise<CategorySchema>
   */
  async validate(data: Category) {
    try {
      return CategorySchema.parseAsync(data);
    } catch (e) {
      this.logger.error(e, { data });
      throw e;
    }
  }
}
