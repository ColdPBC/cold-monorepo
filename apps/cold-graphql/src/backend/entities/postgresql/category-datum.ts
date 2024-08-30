import { Entity, ManyToOne, PrimaryKey, Property, Ref, Unique } from '@mikro-orm/core';
import { CategoryDefinition } from './category-definition';
import { Organization } from './organization';
import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, public_acl } from '../../acl_policies';

@Entity({ tableName: 'category_data' })
@ApplyAccessControlList(public_acl)
export class CategoryDatum {
  @Unique({ name: 'category_data_id_key' })
  @PrimaryKey({ type: 'text' })
  id!: string;

  @ManyToOne({ entity: () => CategoryDefinition, ref: true })
  categoryDefinition!: Ref<CategoryDefinition>;

  @ManyToOne({ entity: () => Organization, ref: true })
  organization!: Ref<Organization>;

  @Property({ type: 'json' })
  data!: Record<string, unknown>;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;
}
