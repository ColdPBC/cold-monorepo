import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { entities } from './entities';
import { connectionValues } from './database.config';

const getConnectionValues = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }
  if (url) {
    const pattern = /postgres(?:ql)?:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
    const match = url.match(pattern);

    if (match) {
      const [, user, password, host, port, dbName] = match;
      return { user, password, host, port: +port, dbName };
    }
  }
};
export const connection = {
  connectionManagerId: 'postgresql',
  mikroOrmConfig: {
    driverOptions: {
      connection: process.env.NODE_ENV === 'development' ? {} : { ssl: { rejectUnauthorized: false } },
    },
    entities: entities,
    driver: PostgreSqlDriver,
    ...getConnectionValues(),
    pool: { min: 2, max: 50 },
  },
};

export const connections = [connection];
