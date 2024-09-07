import * as fs from 'fs';
import * as path from 'path';
import { ConsoleLogger } from '@nestjs/common';

const databaseFile = path.join(__dirname, '../src/backend/database.ts');
const logger = new ConsoleLogger('DatabaseConnectionGenerator');

const newMikroOrmConfig = `{
  driverOptions: {
    connection: process.env.NODE_ENV === 'development' ? {} : { ssl: { rejectUnauthorized: false } },
  },
  entities: entities,
  driver: PostgreSqlDriver,
  ...connectionValues(),
  pool: { min: 2, max: 50 },
}`;

const importStatement = `import { connectionValues } from './database.config';\n`;

fs.readFile(databaseFile, 'utf8', (err, data) => {
	if (err) {
		return logger.error('Unable to read file: ' + err);
	}

	const mikroOrmConfigMatch = data.match(/mikroOrmConfig: \{[^]*?\}/);
	if (mikroOrmConfigMatch) {
		let updatedData = data.replace(mikroOrmConfigMatch[0], `mikroOrmConfig: ${newMikroOrmConfig}`);

		if (!updatedData.includes(importStatement.trim())) {
			updatedData = importStatement + updatedData;
		}

		const importStatementsEndIndex = updatedData.lastIndexOf('import') + updatedData.slice(updatedData.lastIndexOf('import')).indexOf(';') + 1;
		const updatedDataWithValues = [updatedData.slice(0, importStatementsEndIndex), updatedData.slice(importStatementsEndIndex)].join('');

		fs.writeFile(databaseFile, updatedDataWithValues, 'utf8', err => {
			if (err) {
				return logger.error('Unable to write file: ' + err);
			}
			logger.verbose(`Updated file: ${databaseFile}`);
		});
	}
});
