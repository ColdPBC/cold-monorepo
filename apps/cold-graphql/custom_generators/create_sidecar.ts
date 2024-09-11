import * as fs from 'fs';
import * as path from 'path';
import { WorkerLogger } from '../src/backend/libs/logger';
import { GenerateSideCarClass, importGraphWeaverHookClasses } from './entity_hooks';

const directoryPath = path.join(__dirname, '../src/backend/entities/postgresql');
const logger = new WorkerLogger('EntitySidecarGenerator');
const overwriteSidecars = process.env.OVERWRITE_SIDECARS === 'true';

fs.readdir(directoryPath, (err, files) => {
	if (err) {
		return logger.error('Unable to scan directory: ' + err);
	}

	files.forEach(file => {
		if (file.endsWith('.ts') && !file.endsWith('.hooks.ts')) {
			const filePath = path.join(directoryPath, file);
			fs.readFile(filePath, 'utf8', (err, data) => {
				if (err) {
					return logger.error('Unable to read file: ' + err);
				}

				const classNameMatch = data.match(/export class (\w+)/);
				if (classNameMatch) {
					const entityClassName = classNameMatch[1];
					const entityFileName = path.basename(file, '.ts');
					const sidecarFilePath = path.join(directoryPath, `${entityFileName}.hooks.ts`);
					const sidecarContent = GenerateSideCarClass(entityClassName, entityFileName);

					fs.access(sidecarFilePath, fs.constants.F_OK, err => {
						if (err || overwriteSidecars) {
							fs.writeFile(sidecarFilePath, sidecarContent, 'utf8', err => {
								if (err) {
									return logger.error('Unable to write file: ' + err);
								}
								logger.info(`Generated ${entityClassName} sidecar file: ${sidecarFilePath}`);
							});
						} else {
							logger.info(`Sidecar file already exists and will not be overwritten: ${sidecarFilePath}`);
						}
					});
				}
			});
		}
	});
});
