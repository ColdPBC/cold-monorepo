export const importGraphWeaverHookClasses = `import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';\n`;

// Entity Hook Decorators
export const BEFORE_CREATE = (entityClassName: string) => `@Hook(HookRegister.BEFORE_CREATE)
\tasync beforeCreate(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\treturn await hooks.beforeCreateHook(params);
\t}`;

export const AFTER_CREATE = (entityClassName: string) => `@Hook(HookRegister.AFTER_CREATE)
\tasync afterCreate(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\treturn await hooks.afterCreateHook(params);
\t}`;

export const BEFORE_READ = (entityClassName: string) => `@Hook(HookRegister.BEFORE_READ)
\tasync beforeRead(params: ReadHookParams<typeof ${entityClassName}, OrgContext>) {
	\treturn await hooks.beforeReadHook(params);
\t}`;

export const AFTER_READ = (entityClassName: string) => `@Hook(HookRegister.AFTER_READ)
\tasync afterRead(params: ReadHookParams<typeof ${entityClassName}, OrgContext>) {
	\treturn await hooks.afterReadHook(params);
\t}`;

export const BEFORE_UPDATE = (entityClassName: string) => `@Hook(HookRegister.BEFORE_UPDATE)
\tasync beforeUpdate(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\treturn await hooks.beforeUpdateHook(params);
\t}`;

export const AFTER_UPDATE = (entityClassName: string) => `@Hook(HookRegister.AFTER_UPDATE)
\tasync afterUpdate(params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) {
	\treturn await hooks.afterUpdateHook(params);
\t}`;

export const BEFORE_DELETE = (entityClassName: string) => `@Hook(HookRegister.BEFORE_DELETE)
\tasync beforeDelete(params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) {
	\treturn await hooks.beforeDeleteHook(params);
\t}`;

export const AFTER_DELETE = (entityClassName: string) => `@Hook(HookRegister.AFTER_DELETE)
\tasync afterDelete(params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) {
	\treturn await hooks.afterDeleteHook(params);
\t}`;

// ENTITY HOOK FUNCTIONS
export const BEFORE_CREATE_HOOK_FUNCTION = (entityClassName: string) => `
\texport const beforeCreateHook = async (params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) => {
	\tlogger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_CREATE_HOOK_FUNCTION = (entityClassName: string) => `
\texport const afterCreateHook = async (params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) => {
	\tlogger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_READ_HOOK_FUNCTION = (entityClassName: string) => `
\texport const beforeReadHook = async (params: ReadHookParams<typeof ${entityClassName}, OrgContext>) => {
	\tlogger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_READ_HOOK_FUNCTION = (entityClassName: string) => `
\texport const afterReadHook = async (params: ReadHookParams<typeof ${entityClassName}, OrgContext>) => {
	\tlogger.log('afterReadHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_UPDATE_HOOK_FUNCTION = (entityClassName: string) => `
\texport const beforeUpdateHook = async (params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) => {
	\tlogger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_UPDATE_HOOK_FUNCTION = (entityClassName: string) => `
\texport const afterUpdateHook = async (params: CreateOrUpdateHookParams<typeof ${entityClassName}, OrgContext>) => {
	\tlogger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_DELETE_HOOK_FUNCTION = (entityClassName: string) => `
\texport const beforeDeleteHook = async (params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) => {
	\tlogger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_DELETE_HOOK_FUNCTION = (entityClassName: string) => `
\texport const afterDeleteHook = async (params: DeleteHookParams<typeof ${entityClassName}, OrgContext>) => {
	\tlogger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;
