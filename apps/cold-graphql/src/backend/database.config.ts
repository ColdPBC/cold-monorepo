import { entities } from './entities';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export const connectionValues = () => {
	const url = process.env.DATABASE_URL;
	console.log('DATABASE_URL_STRING', url?.slice(8, 20));
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
		driver: PostgreSqlDriver,
		pool: { min: 2, max: 50 },
	},
});
