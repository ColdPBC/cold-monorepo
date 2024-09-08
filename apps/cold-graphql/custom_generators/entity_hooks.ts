export const importGraphWeaverHookClasses = `import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';\n`;

// Entity Hook Decorators
export const BEFORE_CREATE = `@Hook(HookRegister.BEFORE_CREATE)
\tasync beforeCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
	\treturn hooks.beforeCreateHook(params);
\t}`;

export const AFTER_CREATE = `@Hook(HookRegister.AFTER_CREATE)
\tasync afterCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
	\treturn hooks.afterCreateHook(params);
\t}`;

export const BEFORE_READ = `@Hook(HookRegister.BEFORE_READ)
\tasync beforeRead(params: ReadHookParams<unknown, OrgContext>) {
	\treturn hooks.beforeReadHook(params);
\t}`;

export const AFTER_READ = `@Hook(HookRegister.AFTER_READ)
\tasync afterRead(params: ReadHookParams<unknown, OrgContext>) {
	\treturn hooks.afterReadHook(params);
\t}`;

export const BEFORE_UPDATE = `@Hook(HookRegister.BEFORE_UPDATE)
\tasync beforeUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
	\treturn hooks.beforeUpdateHook(params);
\t}`;

export const AFTER_UPDATE = `@Hook(HookRegister.AFTER_UPDATE)
\tasync afterUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
	\treturn hooks.afterUpdateHook(params);
\t}`;

export const BEFORE_DELETE = `@Hook(HookRegister.BEFORE_DELETE)
\tasync beforeDelete(params: DeleteHookParams<unknown, OrgContext>) {
	\treturn hooks.beforeDeleteHook(params);
\t}`;

export const AFTER_DELETE = `@Hook(HookRegister.AFTER_DELETE)
\tasync afterDelete(params: DeleteHookParams<unknown, OrgContext>) {
	\treturn hooks.afterDeleteHook(params);
\t}`;

// ENTITY HOOK FUNCTIONS
export const BEFORE_CREATE_HOOK_FUNCTION = `
\texport const beforeCreateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
	\tlogger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_CREATE_HOOK_FUNCTION = `
\texport const afterCreateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
	\tlogger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_READ_HOOK_FUNCTION = `
\texport const beforeReadHook = (params: ReadHookParams<unknown, OrgContext>) => {
	\tlogger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_READ_HOOK_FUNCTION = `
\texport const afterReadHook = (params: ReadHookParams<unknown, OrgContext>) => {
	\tlogger.log('afterReadHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_UPDATE_HOOK_FUNCTION = `
\texport const beforeUpdateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
	\tlogger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_UPDATE_HOOK_FUNCTION = `
\texport const afterUpdateHook = (params: CreateOrUpdateHookParams<unknown, OrgContext>) => {
	\tlogger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const BEFORE_DELETE_HOOK_FUNCTION = `
\texport const beforeDeleteHook = (params: DeleteHookParams<unknown, OrgContext>) => {
	\tlogger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;

export const AFTER_DELETE_HOOK_FUNCTION = `
\texport const afterDeleteHook = (params: DeleteHookParams<unknown, OrgContext>) => {
	\tlogger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
	\treturn params;
\t}
`;
