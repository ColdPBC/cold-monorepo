import { connectionValues } from './database.config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { entities } from './entities';

export const connection = {
	connectionManagerId: 'postgresql',
	mikroOrmConfig: {
  driverOptions: {
    connection: process.env.NODE_ENV === 'development' ? {} : { ssl: { rejectUnauthorized: false } },
  },
  entities: entities,
  driver: PostgreSqlDriver,
  ...connectionValues(),
  pool: { min: 2, max: 50 },
},
};

export const connections = [connection];
