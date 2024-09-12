import { entities } from './entities';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MQTTSubscriber } from './subscribers/mqtt_subscriber';
import { EventArgs } from '@mikro-orm/core';

export const connectionValues = () => {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error('DATABASE_URL is not set');
	}
	const pattern = /postgres(?:ql)?:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
	const match = url.match(pattern);

	if (match) {
		const [, user, password, host, port, dbName] = match;
		return { user, password, host, port: +port, dbName };
	} else {
		throw new Error(`DATABASE_URL is not valid: ${url}`);
	}
};

export const getConnection = () => ({
	connectionManagerId: 'postgresql',
	mikroOrmConfig: {
		driverOptions: {
			connection: process.env.NODE_ENV === 'development' ? {} : { ssl: { rejectUnauthorized: false } },
		},
		entities: [...entities],
		...connectionValues(),
		//metadataProvider: ReflectMetadataProvider,
		driver: PostgreSqlDriver,
		pool: { min: 2, max: 50 },
	},
});

const beforeUpdate = async (args: EventArgs<any>) => {
	// @ts-expect-error - items is not defined
	const items = args.items;
	for (const item of items) {
		item.updated_at = new Date();
	}
	return args;
};
