import * as fs from 'fs';
import * as path from 'path';
import { WorkerLogger } from '../src/backend/libs/logger';
import { importGraphWeaverHookClasses } from './entity_hooks';

const entityPath = path.join(__dirname, '../src/backend/entities/postgresql');

const logger = new WorkerLogger('EntityHookUpdater');

/**
 * hookDecorators is a function that generates a string representation of a set of hook decorators for a given entity class.
 *
 * @param entityClassName - The name of the entity class to generate hook decorators for.
 * @returns A string containing the generated hook decorators.
 */
const hookDecorators = (entityClassName: string): string => `
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ${entityClassName}Hooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ${entityClassName}Hooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ${entityClassName}, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ${entityClassName}Hooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ${entityClassName}, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ${entityClassName}Hooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ${entityClassName}Hooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ${entityClassName}Hooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ${entityClassName}Hooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ${entityClassName}Hooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
`;

fs.readdir(entityPath, (err, files) => {
	if (err) {
		return logger.error('Unable to scan directory: ' + err);
	}

	files.forEach(file => {
		if (file.endsWith('.ts') && file.endsWith('.hooks.ts')) {
			return;
		}
		const filePath = path.join(entityPath, file);
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				return logger.error('Unable to read file: ' + err);
			}

			// Check if the @Hook decorator already exists
			if (data.includes('@Hook')) {
				logger.info(`Skipping ${file} as it already contains @Hook decorator.`);
				return;
			}

			const classNameMatch = data.match(/export class (\w+)/);
			if (classNameMatch) {
				const className = classNameMatch[1];
				const classEndIndex = data.lastIndexOf('}');
				let updatedData = data.slice(0, classEndIndex) + hookDecorators(className) + data.slice(classEndIndex);

				if (!updatedData.includes(importGraphWeaverHookClasses)) {
					updatedData = `import { ${className}Hooks } from './${file.split('.')[0]}.hooks';\n${importGraphWeaverHookClasses}\n` + updatedData;
				}

				const sidecarProperty = `\n\tsidecar: ${className}Hooks;\n`;
				const constructorMethod = `\n\tconstructor() {\n\t\tthis.sidecar = new ${className}Hooks();\n\t}\n`;

				const classDeclarationIndex = updatedData.indexOf(`export class ${className}`);
				if (classDeclarationIndex !== -1) {
					const classDeclarationEndIndex = updatedData.indexOf('{', classDeclarationIndex) + 1;
					updatedData = updatedData.slice(0, classDeclarationEndIndex) + sidecarProperty + constructorMethod + updatedData.slice(classDeclarationEndIndex);
				}

				fs.writeFile(filePath, updatedData, 'utf8', err => {
					if (err) {
						return logger.error('Unable to write file: ' + err);
					}
					logger.info(`Updated ${className} file: ${file}`);
				});
			}
		});
	});
});
