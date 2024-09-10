import * as fs from 'fs';
import * as path from 'path';
import { readOnlyEntities, includeNullOrgs, coldAdminEntities, restrictedEntities } from './acl_to_entity_maps';
import {
	importGraphWeaverHookClasses,
	BEFORE_CREATE,
	AFTER_CREATE,
	BEFORE_READ,
	AFTER_READ,
	BEFORE_UPDATE,
	AFTER_UPDATE,
	BEFORE_DELETE,
	AFTER_DELETE,
	BEFORE_CREATE_HOOK_FUNCTION,
	AFTER_CREATE_HOOK_FUNCTION,
	BEFORE_READ_HOOK_FUNCTION,
	AFTER_READ_HOOK_FUNCTION,
	BEFORE_UPDATE_HOOK_FUNCTION,
	AFTER_UPDATE_HOOK_FUNCTION,
	BEFORE_DELETE_HOOK_FUNCTION,
	AFTER_DELETE_HOOK_FUNCTION,
} from './entity_hooks';

import { WorkerLogger } from '../src/backend/libs/logger';

const logger = new WorkerLogger('ACLGenerator');

const directoryPath = path.join(__dirname, '../src/backend/entities/postgresql');
const orgContextImport = `import { OrgContext } from '../../acl_policies';`;

/**
 * Writes generated hooks to entity class file.
 * @param entityClassName
 * @param {string} updatedDataWithImport - The updated data (with import statements) of the entity class.
 * @param {string} filePath - The path of the entity class file.
 * @param {string} file - The name of the entity class file.
 * @return {string} - The updated data with generated hooks.
 */
function writeGeneratedHooksToEntityClass(entityClassName: string, updatedDataWithImport: string, filePath: string, file: string): string {
	const classEndIndex = updatedDataWithImport.lastIndexOf('}');
	const updatedDataWithHooks = [
		updatedDataWithImport.slice(0, classEndIndex),
		`\t/**\n \t** START GENERATED HOOKS SECTION\n \t**/
	${BEFORE_CREATE(entityClassName)}
	${AFTER_CREATE(entityClassName)}
	${BEFORE_READ(entityClassName)}
	${AFTER_READ(entityClassName)}
	${BEFORE_UPDATE(entityClassName)}
	${AFTER_UPDATE(entityClassName)}
	${BEFORE_DELETE(entityClassName)}
	${AFTER_DELETE(entityClassName)}
	/**\n \t** END GENERATED HOOKS SECTION\n \t**/\n`,
		updatedDataWithImport.slice(classEndIndex),
	].join('');

	fs.writeFile(filePath, updatedDataWithHooks, 'utf8', err => {
		if (err) {
			return logger.error('Unable to write file: ' + err);
		}
		logger.info(`Updated file: ${file}`);
	});
	return updatedDataWithHooks;
}

/**
 * Generates ACL data for a given entity decorator match
 *
 * @param {RegExpMatchArray} entityDecoratorMatch - The entity decorator match.
 * @param {string} data - The entity file contents.
 *
 * @return {Object} - The ACL import statement and generated ACL data.
 */
function generateACLData(entityDecoratorMatch: RegExpMatchArray, data: string): { aclImportStatement: string | undefined; generatedAclData: unknown } {
	const tableName = entityDecoratorMatch[1];

	const isInReadOnly = readOnlyEntities.includes(tableName);
	const isInColdAdmin = coldAdminEntities.includes(tableName);
	const isInIncludeNullOrgs = includeNullOrgs.includes(tableName);
	const isInRestricted = restrictedEntities.includes(tableName);

	if ([isInReadOnly, isInColdAdmin, isInIncludeNullOrgs, isInRestricted].filter(Boolean).length > 1) {
		logger.error(`Table name ${tableName} appears in more than one entity set.`);
		return { aclImportStatement: undefined, generatedAclData: undefined };
	}

	let aclName = 'default_acl';

	if (isInReadOnly) {
		aclName = 'read_only_acl';
	} else if (isInColdAdmin || isInRestricted) {
		aclName = 'cold_admin_only';
	} else if (includeNullOrgs.includes(tableName)) {
		aclName = 'allow_null_orgs_acl';
	}

	const aclDecoratorString = `@ApplyAccessControlList(${aclName})`;

	const entityDecoratorIndex = entityDecoratorMatch.index!;
	const generatedAclData = [data.slice(0, entityDecoratorIndex), `${aclDecoratorString}\n`, data.slice(entityDecoratorIndex)].join('');
	const aclImportStatement = `\nimport { ApplyAccessControlList } from '@exogee/graphweaver-auth';\nimport { ${aclName} } from '../../acl_policies';\n${orgContextImport}\n`;

	return { aclImportStatement, generatedAclData };
}

/**
 * Creates a hook sidecar file with the specified entity hook file path and name.
 *
 * @param entityClassName
 * @param {string} entityHookFilePath - The path to the entity hook file.
 * @param {string} entityHookFileName - The name of the entity hook file.
 */
function createHookSidecarFile(entityClassName: string, entityHookFilePath: string, entityHookFileName: string) {
	const entityHookContent = `// ${entityHookFileName} Sidecar - Entity hooks for ${entityHookFileName.split('-')[0]}
	${importGraphWeaverHookClasses.replace('Hook, HookRegister, ', '')}
	${orgContextImport}
	import { WorkerLogger } from '../../libs/logger';
	import { ${entityClassName} } from './${entityHookFileName.split('.')[0]}';
	const logger = new WorkerLogger('${entityHookFileName.split('.')[0]}')
		
	${BEFORE_CREATE_HOOK_FUNCTION(entityClassName)}
	${AFTER_CREATE_HOOK_FUNCTION(entityClassName)}
	${BEFORE_READ_HOOK_FUNCTION(entityClassName)}
	${AFTER_READ_HOOK_FUNCTION(entityClassName)}
	${BEFORE_UPDATE_HOOK_FUNCTION(entityClassName)}
	${AFTER_UPDATE_HOOK_FUNCTION(entityClassName)}
	${BEFORE_DELETE_HOOK_FUNCTION(entityClassName)}
	${AFTER_DELETE_HOOK_FUNCTION(entityClassName)}
	`;

	fs.writeFile(entityHookFilePath, entityHookContent, 'utf8', err => {
		if (err) {
			return logger.error('Unable to write entity hook file: ' + err);
		}
		logger.info(`Created entity hook file: ${entityHookFileName}`);
	});
}

fs.readdir(directoryPath, (err, files) => {
	if (err) {
		return console.error('Unable to scan directory: ' + err);
	}

	let filesSkipped = false;
	files.forEach(file => {
		const entityFileName = file.split('.')[0];

		const filePath = path.join(directoryPath, file);
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				logger.error('Unable to read file: ' + err);
			}

			const entityDecoratorMatch = data.match(/@Entity\(\{ tableName: '(\w+)' \}\)/);
			const entityClassName = data.match(/export class (\w+)/);

			if (!entityClassName) {
				return;
			}
			if (entityDecoratorMatch) {
				const { aclImportStatement, generatedAclData } = generateACLData(entityDecoratorMatch, data);

				// continue with next file if acl data is not generated
				if (!aclImportStatement || !generatedAclData) {
					return;
				}

				const entityHookFileName = `${entityFileName}.hooks`;
				const entityHookImport = `import * as hooks from './${entityHookFileName}';\n`;

				const updatedDataWithImport = importGraphWeaverHookClasses + entityHookImport + aclImportStatement + '\n' + generatedAclData;

				const classDeclarationMatch = updatedDataWithImport.match(/export class (\w+)/);

				if (classDeclarationMatch) {
					const updatedDataWithHooks = writeGeneratedHooksToEntityClass(entityClassName[1], updatedDataWithImport, filePath, file);

					const entityHookFilePath = path.join(directoryPath, `${entityHookFileName}.ts`);

					fs.access(entityHookFilePath, fs.constants.F_OK, err => {
						if (err || process.env.OVERWRITE_SIDECARS === 'true') {
							createHookSidecarFile(entityClassName[1], entityHookFilePath, entityHookFileName);

							fs.writeFile(filePath, updatedDataWithHooks, 'utf8', err => {
								if (err) {
									return logger.error('Unable to write file: ' + err);
								}
								logger.info(`Updated entity file: ${file}`);
							});
						} else {
							filesSkipped = true;
							logger.warn(`Skipping; file already exists: ${entityHookFileName}.ts`);
						}
					});
				}
			}
		});
	});
	if (filesSkipped) {
		logger.info('Some files were skipped. Set the environment variable OVERWRITE_SIDECARS=true to overwrite during generation.');
	}
});
