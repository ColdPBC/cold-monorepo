import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../../worker/worker.class';
import { ActivitiesValidator } from './activities.validator';
import { ActivityValidator } from './activity.validator';
import { CategoriesValidator } from './categories.validator';
import { CategoryValidator } from './category.validator';
import { CategoryDefinition, CategoryDefinitionSchema } from './schemas/category-definition.schema';
import { SubCategoriesValidator } from './sub-categories.validator';

@Injectable()
export class CategoryDefinitionValidator extends BaseWorker {
  constructor(
    public readonly activityValidator: ActivityValidator,
    public readonly activitiesValidator: ActivitiesValidator,
    public readonly categoriesValidator: CategoriesValidator,
    public readonly categoryValidator: CategoryValidator,
    public readonly subCategoriesValidator: SubCategoriesValidator,
  ) {
    super('CategoryDefinitionValidator');
  }

  /**
   * this action will validate the submitted data against the CategoryDefinition Schema
   * @param data
   * @returns Promise<CategoryDefinition>
   */
  async validate(data: CategoryDefinition) {
    try {
      return CategoryDefinitionSchema.parseAsync(data);
    } catch (e) {
      this.logger.error(e, { data });
      throw e;
    }
  }
}
