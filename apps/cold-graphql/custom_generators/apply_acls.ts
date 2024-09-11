import * as fs from 'fs';
import * as path from 'path';
import { coldAdminEntities, includeNullOrgs, organizationEntity, readOnlyEntities, restrictedEntities } from '../src/backend/acl_to_entity_maps';
import { WorkerLogger } from '../src/backend/libs/logger';

const directoryPath = path.join(__dirname, '../src/backend/entities/postgresql');
const logger = new WorkerLogger('ACLGenerator');
const orgContextImport = `import { OrgContext } from '../../acl_policies';`;

function applyAclsToEntities() {
	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			return console.error('Unable to scan directory: ' + err);
		}

		files.forEach(file => {
			const filePath = path.join(directoryPath, file);
			fs.readFile(filePath, 'utf8', (err, data) => {
				if (err) {
					return console.error('Unable to read file: ' + err);
				}

				const entityDecoratorMatch = data.match(/@Entity\(\{ tableName: '(\w+)' \}\)/);
				if (entityDecoratorMatch) {
					const tableName = entityDecoratorMatch[1];

					const isOrganizationEntity = organizationEntity.includes(tableName);
					const isInReadOnly = readOnlyEntities.includes(tableName);
					const isInColdAdmin = coldAdminEntities.includes(tableName);
					const isInIncludeNullOrgs = includeNullOrgs.includes(tableName);
					const isInRestricted = restrictedEntities.includes(tableName);

					if ([isInReadOnly, isInColdAdmin, isInIncludeNullOrgs, isInRestricted].filter(Boolean).length > 1) {
						logger.error(`Table name ${tableName} appears in more than one entity set.`);
						return;
					}

					let aclName = 'default_acl';

					if (isInReadOnly) {
						aclName = 'read_only_acl';
					} else if (isInColdAdmin || isInRestricted) {
						aclName = 'cold_admin_only';
					} else if (includeNullOrgs.includes(tableName)) {
						aclName = 'allow_null_orgs_acl';
					} else if (isOrganizationEntity) {
						aclName = 'organization_acl';
					}

					const aclDecoratorString = `@ApplyAccessControlList(${aclName})`;
					const aclImportStatement = `\nimport { ApplyAccessControlList } from '@exogee/graphweaver-auth';\nimport { ${aclName} } from '../../acl_policies';\n${orgContextImport}\n`;

					// Find the last import statement
					const lastImportIndex = data.lastIndexOf('import ');
					const endOfLastImportIndex = data.indexOf('\n', lastImportIndex) + 1;

					// Insert aclImportStatement just below the last import
					const dataWithAclImport = [data.slice(0, endOfLastImportIndex), aclImportStatement, data.slice(endOfLastImportIndex)].join('');

					// Find the @Entity decorator index
					const entityDecoratorIndex = dataWithAclImport.indexOf('@Entity');

					// Insert generatedAclData just above the @Entity decorator
					const generatedAclData = [dataWithAclImport.slice(0, entityDecoratorIndex), `${aclDecoratorString}\n`, dataWithAclImport.slice(entityDecoratorIndex)].join('');

					// Write the modified content back to the file
					fs.writeFile(filePath, generatedAclData, 'utf8', err => {
						if (err) {
							return console.error('Unable to write file: ' + err);
						}
						logger.info(`Added ${aclName} to ${tableName} file: ${file}`);
					});
				}
			});
		});
	});
}

applyAclsToEntities();
