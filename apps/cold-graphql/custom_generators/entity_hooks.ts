export const importGraphWeaverHookClasses = `import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';\n`;

export const GenerateSideCarClass = (entityClassName: string, entityFileName: string) => `
// ${entityClassName} Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../acl_policies';
import { WorkerLogger } from '../../libs/logger';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { get, set } from 'lodash';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';
import { ${entityClassName} } from './${entityFileName}';

export class ${entityClassName}Hooks extends BaseSidecar {
\tconstructor() {
\t\tsuper(${entityClassName}Hooks.name, ${entityClassName});
\t}
\t${BEFORE_READ_HOOK_FUNCTION(entityClassName)}
\t${AFTER_READ_HOOK_FUNCTION(entityClassName)}
\t${BEFORE_CREATE_HOOK_FUNCTION(entityClassName)}
\t${AFTER_CREATE_HOOK_FUNCTION(entityClassName)}
\t${BEFORE_UPDATE_HOOK_FUNCTION(entityClassName)}
\t${AFTER_UPDATE_HOOK_FUNCTION(entityClassName)}
\t${BEFORE_DELETE_HOOK_FUNCTION(entityClassName)}
\t${AFTER_DELETE_HOOK_FUNCTION(entityClassName)}
}
`;

// ENTITY HOOK FUNCTIONS
export const BEFORE_CREATE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync beforeCreateHook(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_CREATE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync afterCreateHook(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_READ_HOOK_FUNCTION = (entityClassName: string) => `
\tasync beforeReadHook(params: ReadHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_READ_HOOK_FUNCTION = (entityClassName: string) => `
\tasync afterReadHook(params: ReadHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_UPDATE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_UPDATE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync afterUpdateHook(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_DELETE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync beforeDeleteHook(params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_DELETE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync afterDeleteHook(params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;
