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
import { ConsoleLogger } from '@nestjs/common';

const logger = new ConsoleLogger('ACLGenerator');

const directoryPath = path.join(__dirname, '../src/backend/entities/postgresql');
const orgContextImport = `import { OrgContext } from '../../acl_policies';`;

/**
 * Writes generated hooks to entity class file.
 * @param {string} updatedDataWithImport - The updated data (with import statements) of the entity class.
 * @param {string} filePath - The path of the entity class file.
 * @param {string} file - The name of the entity class file.
 * @return {string} - The updated data with generated hooks.
 */
function writeGeneratedHooksToEntityClass(updatedDataWithImport: string, filePath: string, file: string) {
	const classEndIndex = updatedDataWithImport.lastIndexOf('}');
	const updatedDataWithHooks = [
		updatedDataWithImport.slice(0, classEndIndex),
		`\t/**\n \t** START GENERATED HOOKS SECTION\n \t**/
	${BEFORE_CREATE}
	${AFTER_CREATE}
	${BEFORE_READ}
	${AFTER_READ}
	${BEFORE_UPDATE}
	${AFTER_UPDATE}
	${BEFORE_DELETE}
	${AFTER_DELETE}
	/**\n \t** END GENERATED HOOKS SECTION\n \t**/\n`,
		updatedDataWithImport.slice(classEndIndex),
	].join('');

	fs.writeFile(filePath, updatedDataWithHooks, 'utf8', err => {
		if (err) {
			return logger.error('Unable to write file: ' + err);
		}
		logger.log(`Updated file: ${file}`);
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
function generateACLData(entityDecoratorMatch: RegExpMatchArray, data: string) {
	const tableName = entityDecoratorMatch[1];

	const isInReadOnly = readOnlyEntities.includes(tableName);
	const isInColdAdmin = coldAdminEntities.includes(tableName);
	const isInIncludeNullOrgs = includeNullOrgs.includes(tableName);
	const isInRestricted = restrictedEntities.includes(tableName);

	if ([isInReadOnly, isInColdAdmin, isInIncludeNullOrgs, isInRestricted].filter(Boolean).length > 1) {
		logger.error(`Table name ${tableName} appears in more than one entity set.`);
		return { aclImportStatement: null, generatedAclData: null };
	}

	let aclName = 'default_acl';

	if (readOnlyEntities.includes(tableName)) {
		aclName = 'read_only_acl';
	} else if (coldAdminEntities.includes(tableName)) {
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
 * @param {string} entityHookFilePath - The path to the entity hook file.
 * @param {string} entityHookFileName - The name of the entity hook file.
 */
function createHookSidecarFile(entityHookFilePath: string, entityHookFileName: string) {
	const entityHookContent = `// ${entityHookFileName} Sidecar - Entity hooks for ${entityHookFileName.split('-')[0]}
	${importGraphWeaverHookClasses.replace('Hook, HookRegister, ', '')}
	${orgContextImport}
	import { ConsoleLogger } from '@nestjs/common';
	const logger = new ConsoleLogger('${entityHookFileName.split('.')[0]}')
		
		${BEFORE_CREATE_HOOK_FUNCTION}
		${AFTER_CREATE_HOOK_FUNCTION}
		${BEFORE_READ_HOOK_FUNCTION}
		${AFTER_READ_HOOK_FUNCTION}
		${BEFORE_UPDATE_HOOK_FUNCTION}
		${AFTER_UPDATE_HOOK_FUNCTION}
		${BEFORE_DELETE_HOOK_FUNCTION}
		${AFTER_DELETE_HOOK_FUNCTION}
	`;

	fs.writeFile(entityHookFilePath, entityHookContent, 'utf8', err => {
		if (err) {
			return logger.error('Unable to write entity hook file: ' + err);
		}
		logger.log(`Created entity hook file: ${entityHookFileName}`);
	});
}

fs.readdir(directoryPath, (err, files) => {
	if (err) {
		return console.error('Unable to scan directory: ' + err);
	}

	files.forEach(file => {
		const entityFileName = file.split('.')[0];

		const filePath = path.join(directoryPath, file);
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				logger.error('Unable to read file: ' + err);
			}

			const entityDecoratorMatch = data.match(/@Entity\(\{ tableName: '(\w+)' \}\)/);

			if (entityDecoratorMatch) {
				const { aclImportStatement, generatedAclData } = generateACLData(entityDecoratorMatch, data);

				// continue with next file if acl data is not generated
				if (!aclImportStatement || !generatedAclData) {
					return;
				}

				const entityHookFileName = `${entityFileName}-hooks.ts`;
				const entityHookImport = `import * as hooks from './${entityHookFileName.split('.')[0]}';\n`;

				const updatedDataWithImport = importGraphWeaverHookClasses + entityHookImport + aclImportStatement + '\n' + generatedAclData;

				const classDeclarationMatch = updatedDataWithImport.match(/export class (\w+)/);

				if (classDeclarationMatch) {
					const updatedDataWithHooks = writeGeneratedHooksToEntityClass(updatedDataWithImport, filePath, file);

					const entityHookFilePath = path.join(directoryPath, entityHookFileName);

					fs.access(entityHookFilePath, fs.constants.F_OK, err => {
						if (err) {
							createHookSidecarFile(entityHookFilePath, entityHookFileName);

							const importHookFunctions = `import * as hooks from './${entityHookFileName.split('.')[0]}';\n`;
							const finalUpdatedData = importHookFunctions + updatedDataWithHooks;

							fs.writeFile(filePath, finalUpdatedData, 'utf8', err => {
								if (err) {
									return logger.error('Unable to write file: ' + err);
								}
								logger.log(`Updated entity file: ${file}`);
							});
						} else {
							logger.warn(`Skipping entity hook definition generation as file already exists: ${entityHookFileName}`);
						}
					});
				}
			}
		});
	});
});
