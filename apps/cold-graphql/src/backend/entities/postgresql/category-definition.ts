import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CategoryDatum } from './category-datum';

@Entity({ tableName: 'category_definitions' })
export class CategoryDefinition {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Unique({ name: 'category_definitions_name_key' })
  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Property({ type: 'json' })
  definition!: Record<string, unknown>;

  @OneToMany({ entity: () => CategoryDatum, mappedBy: 'categoryDefinition' })
  categoryData = new Collection<CategoryDatum>(this);
}
