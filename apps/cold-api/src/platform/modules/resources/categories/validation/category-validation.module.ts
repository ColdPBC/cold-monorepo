import { Module } from '@nestjs/common';
import { ActivitiesValidator } from './activities.validator';
import { ActivityValidator } from './activity.validator';
import { CategoriesValidator } from './categories.validator';
import { CategoryDefinitionValidator } from './category-definition.validator';
import { CategoryValidator } from './category.validator';
import { SubCategoriesValidator } from './sub-categories.validator';

@Module({
  providers: [CategoryValidator, CategoriesValidator, ActivitiesValidator, ActivityValidator, CategoryDefinitionValidator, SubCategoriesValidator],
  exports: [CategoryValidator, CategoriesValidator, ActivitiesValidator, ActivityValidator, CategoryDefinitionValidator, SubCategoriesValidator],
})
export class CategoryValidationModule {}
