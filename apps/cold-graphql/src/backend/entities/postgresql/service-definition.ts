import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Integration } from './integration';
import { SupportedUtility } from './supported-utility';

export enum ServiceDefinitionsType {
  PROVIDER = 'provider',
  PLATFORM = 'platform',
  CORE = 'core',
}

@Entity({ tableName: 'service_definitions' })
export class ServiceDefinition {
  @PrimaryKey({ type: 'text' })
  id!: string;

  @Unique({ name: 'service_definitions_name_key' })
  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'text' })
  label!: string;

  @Property({ type: 'json' })
  definition!: Record<string, unknown>;

  @Property({ type: 'datetime', length: 3 })
  createdAt!: Date;

  @Property({ type: 'datetime', length: 3 })
  updatedAt!: Date;

  @Enum({ type: 'string', items: () => ServiceDefinitionsType })
  type!: ServiceDefinitionsType;

  @OneToMany({ entity: () => Integration, mappedBy: 'serviceDefinition' })
  integrations = new Collection<Integration>(this);

  @OneToMany({ entity: () => SupportedUtility, mappedBy: 'serviceDefinition' })
  supportedUtilities = new Collection<SupportedUtility>(this);
}
