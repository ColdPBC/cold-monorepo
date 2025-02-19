
// VectorRecord Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { VectorRecord } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class VectorRecordHooks extends BaseSidecar {
	constructor() {
		super(VectorRecord, 'vector_records');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof VectorRecord, OrgContext>) {
		this.logger.log('before VectorRecord read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof VectorRecord, OrgContext>) {
		this.logger.log('VectorRecord read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof VectorRecord, OrgContext>) {
		this.logger.log(`before create VectorRecord`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["VectorRecord"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["VectorRecord"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof VectorRecord, OrgContext>) {
		this.logger.log('VectorRecord created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof VectorRecord, OrgContext>) {
		this.logger.log('before VectorRecord update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof VectorRecord, OrgContext>) {
		this.logger.log('VectorRecord updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof VectorRecord, OrgContext>) {
		this.logger.log('before VectorRecord delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof VectorRecord, OrgContext>) {
		this.logger.log('VectorRecord deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
