import { Injectable } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { CategorySchema } from './schemas/category.schema';
import { Categories } from './schemas/categories.schema';

@Injectable()
export class CategoriesValidator extends BaseWorker {
  constructor() {
    super('CategoriesValidator');
  }

  /**
   * this action will validate the submitted data against the Categories Schema
   * @param data
   * @returns Promise<Categories>
   */
  async validate(data: Categories) {
    try {
      return CategorySchema.parseAsync(data);
    } catch (e) {
      this.logger.error(e, { data });
      throw e;
    }
  }
}
