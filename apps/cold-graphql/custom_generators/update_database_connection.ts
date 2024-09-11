import * as fs from 'fs';
import * as path from 'path';
import { WorkerLogger } from '../src/backend/libs/logger';

const databaseFile = path.join(__dirname, '../src/backend/database.ts');
const logger = new WorkerLogger('DatabaseConnectionUpdater');
const newContent = `import { getConnection } from './database.config';

export const connection = getConnection();

export const connections = [connection];
`;

fs.writeFile(databaseFile, newContent, 'utf8', err => {
	if (err) {
		return logger.error('Unable to write file: ' + err);
	}
	logger.info(`Replaced content in file: ${databaseFile}`);
});
