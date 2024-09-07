import * as fs from 'fs';
import * as path from 'path';
import { readOnlyEntities, includeNullOrgs, coldAdminEntities, restrictedEntities } from './acl_to_entity_maps';
import { ConsoleLogger } from '@nestjs/common';
const directoryPath = path.join(__dirname, '../src/backend/entities/postgresql');
const defaultAcl = '@ApplyAccessControlList(default_acl)';
const allowNullOrgsAcl = '@ApplyAccessControlList(allow_null_orgs_acl)';
const coldAdminOnlyAcl = '@ApplyAccessControlList(cold_admin_only)';
const readOnlyAcl = '@ApplyAccessControlList(read_only_acl)';

const logger = new ConsoleLogger('ACLGenerator');

fs.readdir(directoryPath, (err, files) => {
	if (err) {
		return console.error('Unable to scan directory: ' + err);
	}

	files.forEach(file => {
		const filePath = path.join(directoryPath, file);
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				logger.error('Unable to read file: ' + err);
			}

			const entityDecoratorMatch = data.match(/@Entity\(\{ tableName: '(\w+)' \}\)/);
			if (entityDecoratorMatch) {
				const tableName = entityDecoratorMatch[1];

				const isInReadOnly = readOnlyEntities.includes(tableName);
				const isInColdAdmin = coldAdminEntities.includes(tableName);
				const isInIncludeNullOrgs = includeNullOrgs.includes(tableName);
				const isInRestricted = restrictedEntities.includes(tableName);

				if ([isInReadOnly, isInColdAdmin, isInIncludeNullOrgs, isInRestricted].filter(Boolean).length > 1) {
					return logger.error(`Table name ${tableName} appears in more than one entity set.`);
				}

				let aclLine = defaultAcl;
				let aclImport = 'default_acl';

				if (readOnlyEntities.includes(tableName)) {
					aclLine = readOnlyAcl;
					aclImport = 'read_only_acl';
				} else if (coldAdminEntities.includes(tableName)) {
					aclLine = coldAdminOnlyAcl;
					aclImport = 'cold_admin_only';
				} else if (includeNullOrgs.includes(tableName)) {
					aclLine = allowNullOrgsAcl;
					aclImport = 'allow_null_orgs_acl';
				}

				const entityDecoratorIndex = entityDecoratorMatch.index!;
				const updatedData = [data.slice(0, entityDecoratorIndex), `${aclLine}\n`, data.slice(entityDecoratorIndex)].join('');

				const importStatement = `import { ApplyAccessControlList } from '@exogee/graphweaver-auth';\nimport { ${aclImport} } from '../../acl_policies';\n`;
				const updatedDataWithImport = importStatement + updatedData;

				fs.writeFile(filePath, updatedDataWithImport, 'utf8', err => {
					if (err) {
						return logger.error('Unable to write file: ' + err);
					}
					logger.log(`Updated file: ${file}`);
				});
			}
		});
	});
});
