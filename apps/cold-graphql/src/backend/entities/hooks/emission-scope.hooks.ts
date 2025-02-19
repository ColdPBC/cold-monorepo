
// EmissionScope Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { EmissionScope } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class EmissionScopeHooks extends BaseSidecar {
	constructor() {
		super(EmissionScope, 'emission_scopes');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof EmissionScope, OrgContext>) {
		this.logger.log('before EmissionScope read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof EmissionScope, OrgContext>) {
		this.logger.log('EmissionScope read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof EmissionScope, OrgContext>) {
		this.logger.log(`before create EmissionScope`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["EmissionScope"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["EmissionScope"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof EmissionScope, OrgContext>) {
		this.logger.log('EmissionScope created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof EmissionScope, OrgContext>) {
		this.logger.log('before EmissionScope update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof EmissionScope, OrgContext>) {
		this.logger.log('EmissionScope updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof EmissionScope, OrgContext>) {
		this.logger.log('before EmissionScope delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof EmissionScope, OrgContext>) {
		this.logger.log('EmissionScope deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
