import { Entity, Field, ID } from '@exogee/graphweaver';
import { ISODateStringScalar } from '@exogee/graphweaver-scalars';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { News as OrmNews } from '../entities';
import { connection } from '../database';

@Entity<News>('News', {
	provider: new MikroBackendProvider(OrmNews, connection),
})
export class News {
	@Field(() => ID, { primaryKeyField: true })
	id!: string;

	@Field(() => String, { adminUIOptions: {summaryField:true} })
	title!: string;

	@Field(() => String)
	url!: string;

	@Field(() => String)
	imageUrl!: string;

	@Field(() => ISODateStringScalar)
	publishedAt!: Date;

	@Field(() => String)
	sourceName!: string;

	@Field(() => ISODateStringScalar)
	createdAt!: Date;

	@Field(() => ISODateStringScalar)
	updatedAt!: Date;

	@Field(() => Boolean)
	publish = false;
}
