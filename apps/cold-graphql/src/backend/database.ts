import { getConnection } from './database.config';

export const connection = getConnection();

export const connections = [connection];
