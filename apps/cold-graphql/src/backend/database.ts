import { connectionValues } from './database.config';
import { PostgreSqlDriver, ReflectMetadataProvider } from '@mikro-orm/postgresql';
import { entities } from './entities';
import { DynamicEventSubscriber } from './event_subscriber';

export const connection = {
	connectionManagerId: 'postgresql',
	mikroOrmConfig: {
		driverOptions: {
			connection: process.env.NODE_ENV === 'development' ? {} : { ssl: { rejectUnauthorized: false } },
		},
		entities: entities,
		driver: PostgreSqlDriver,
		metadataProvider: ReflectMetadataProvider,
		...connectionValues(),
		subscribers: [DynamicEventSubscriber],
		pool: { min: 2, max: 50 },
	},
};

export const connections = [connection];
