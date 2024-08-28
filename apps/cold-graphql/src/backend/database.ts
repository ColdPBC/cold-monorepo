import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { entities } from './entities';
import { connectionValues } from './database.config';

export const connection = {
  connectionManagerId: 'postgresql',
  mikroOrmConfig: {
    driverOptions: {
      connection: { ssl: { rejectUnauthorized: false } },
    },
    entities: entities,
    driver: PostgreSqlDriver,
    dbName: connectionValues()?.dbName,
    host: connectionValues()?.host,
    user: connectionValues()?.user,
    password: connectionValues()?.password,
    port: +connectionValues()?.port,
    pool: { min: 2, max: 50 },
  },
};

export const connections = [connection];
