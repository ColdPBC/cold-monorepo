import { DescriptionWriter } from 'prisma-markdown';
import table = DescriptionWriter.table;

export const importGraphWeaverHookClasses = `import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';\n`;

export const GenerateSideCarClass = (entityClassName: string, entityFileName: string, tableName: string, useBaseCarHooks: boolean) => `
// ${entityClassName} Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ${entityClassName} } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class ${entityClassName}Hooks extends BaseSidecar {
\tconstructor() {
\t\tsuper(${entityClassName}, '${tableName}');
\t}
\t${useBaseCarHooks ? '// Overrride BeforeReadHook here:\n' : BEFORE_READ_HOOK_FUNCTION(entityClassName)}
\t${useBaseCarHooks ? '// Overrride AfterReadHook here:\n' : AFTER_READ_HOOK_FUNCTION(entityClassName)}
\t${useBaseCarHooks ? '// Overrride BeforeCreateHook here:\n' : BEFORE_CREATE_HOOK_FUNCTION(entityClassName)}
\t${useBaseCarHooks ? '// Overrride AfterCreateHook here:\n' : AFTER_CREATE_HOOK_FUNCTION(entityClassName)}
\t${useBaseCarHooks ? '// Overrride BeforeUpdateHook here:\n' : BEFORE_UPDATE_HOOK_FUNCTION(entityClassName)}
\t${useBaseCarHooks ? '// Overrride AfterUpdateHook here:\n' : AFTER_UPDATE_HOOK_FUNCTION(entityClassName)}
\t${useBaseCarHooks ? '// Overrride BeforeDeleteHook here:\n' : BEFORE_DELETE_HOOK_FUNCTION(entityClassName)}
\t${useBaseCarHooks ? '// Overrride AfterDeleteHook here:\n' : AFTER_DELETE_HOOK_FUNCTION(entityClassName)}
}
`;

// ENTITY HOOK FUNCTIONS
export const BEFORE_CREATE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync beforeCreateHook(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
\t	this.logger.log(\`before create ${entityClassName}\`, { user: params.context.user, arguments: params.args });
\t	for (const item of params.args.items) {
\t		if(GuidPrefixes["${entityClassName}"]) {
\t			set(item, 'id', new Cuid2Generator(GuidPrefixes["${entityClassName}"]).generate().scopedId);
\t		}
\t		
\t		set(item, 'organization.id', params.context.user.organization.id);
\t		
\t		set(item, 'updatedAt', new Date());
\t		set(item, 'createdAt', new Date());
\t	}
\t
\t  return super.beforeCreateHook(params);    
\t}
`;

export const AFTER_CREATE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync afterCreateHook(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('${entityClassName} created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
	\treturn super.afterCreateHook(params);
\t}
`;

export const BEFORE_READ_HOOK_FUNCTION = (entityClassName: string) => `
\tasync beforeReadHook(params: ReadHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('before ${entityClassName} read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
	\treturn super.beforeReadHook(params);
\t}
`;

export const AFTER_READ_HOOK_FUNCTION = (entityClassName: string) => `
\tasync afterReadHook(params: ReadHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('${entityClassName} read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
	\treturn await super.afterReadHook(params);
	\t
\t}
`;

export const BEFORE_UPDATE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('before ${entityClassName} update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
	\tfor (const item of params.args.items) {
		\tset(item, 'updatedAt', new Date());
	\t}
	\treturn await super.beforeUpdateHook(params);
\t}
`;

export const AFTER_UPDATE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync afterUpdateHook(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('${entityClassName} updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
	\treturn await super.afterUpdateHook(params);
\t}
`;

export const BEFORE_DELETE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync beforeDeleteHook(params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('before ${entityClassName} delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
	\treturn super.beforeDeleteHook(params);
\t}
`;

export const AFTER_DELETE_HOOK_FUNCTION = (entityClassName: string) => `
\tasync afterDeleteHook(params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) {
	\tthis.logger.log('${entityClassName} deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
	\treturn super.afterDeleteHook(params);
\t}
`;
