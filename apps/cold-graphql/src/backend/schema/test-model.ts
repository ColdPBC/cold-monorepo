import { Entity, Field, ID } from '@exogee/graphweaver';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { TestModel as OrmTestModel } from '../entities';
import { connection } from '../database';

@Entity<TestModel>('TestModel', {
	provider: new MikroBackendProvider(OrmTestModel, connection),
})
export class TestModel {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;
}
