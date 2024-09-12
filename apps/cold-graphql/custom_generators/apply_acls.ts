import * as fs from 'fs';
import * as path from 'path';
import { coldAdminEntities, includeNullOrgs, organizationEntity, readOnlyEntities, restrictedEntities } from '../src/backend/libs/acls/acl_to_entity_maps';
import { WorkerLogger } from '../src/backend/libs/logger';

const directoryPath = path.join(__dirname, '../src/backend/entities/postgresql');
const logger = new WorkerLogger('ACLGenerator');

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

				// Find the tableName from the @Entity decorator line
				const entityDecoratorMatch = data.match(/@Entity\(\{ tableName: '(\w+)' \}\)/);
				if (entityDecoratorMatch) {
					const tableName = entityDecoratorMatch[1];

					// This entity is an organization entity, which means we need to apply the organization_acl which is slightly different
					const isOrganizationEntity = organizationEntity.includes(tableName);
					// This entity was found in readonly array
					const isInReadOnly = readOnlyEntities.includes(tableName);
					// This entity was found in cold:admin only array
					const isInColdAdmin = coldAdminEntities.includes(tableName);
					// This entity was found in includeNullOrgs array which allows for the query to have null org_id
					const isInIncludeNullOrgs = includeNullOrgs.includes(tableName);
					// This entity was found in restrictedEntities array which means it should only be accessible by cold:admin
					const isInRestricted = restrictedEntities.includes(tableName);

					if ([isInReadOnly, isInColdAdmin, isInIncludeNullOrgs, isInRestricted].filter(Boolean).length > 1) {
						logger.error(`Table name ${tableName} appears in more than one entity set.`);
						return;
					}

					// Apply default_acl unless it's overridden by one of the other acl policies below
					let aclName = 'default_acl';

					if (isInReadOnly) {
						// apply read only acl
						aclName = 'read_only_acl';
					} else if (isInColdAdmin || isInRestricted) {
						// apply cold admin only acl
						aclName = 'cold_admin_only';
					} else if (includeNullOrgs.includes(tableName)) {
						// apply allow null orgs acl
						aclName = 'allow_null_orgs_acl';
					} else if (isOrganizationEntity) {
						// apply organization acl
						aclName = 'organization_acl';
					}

					// Generate the aclDecoratorString and aclImportStatement
					const aclDecoratorString = `@ApplyAccessControlList(${aclName})`;
					const aclImportStatement = `\nimport { ApplyAccessControlList } from '@exogee/graphweaver-auth';\nimport { ${aclName}, OrgContext } from '../../libs/acls/acl_policies';\n`;

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
