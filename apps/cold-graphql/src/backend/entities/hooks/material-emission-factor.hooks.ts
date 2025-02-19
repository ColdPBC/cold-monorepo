
// MaterialEmissionFactor Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { MaterialEmissionFactor } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class MaterialEmissionFactorHooks extends BaseSidecar {
	constructor() {
		super(MaterialEmissionFactor, 'material_emission_factors');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		this.logger.log('before MaterialEmissionFactor read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		this.logger.log('MaterialEmissionFactor read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		this.logger.log(`before create MaterialEmissionFactor`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["MaterialEmissionFactor"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["MaterialEmissionFactor"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		this.logger.log('MaterialEmissionFactor created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		this.logger.log('before MaterialEmissionFactor update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		this.logger.log('MaterialEmissionFactor updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		this.logger.log('before MaterialEmissionFactor delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof MaterialEmissionFactor, OrgContext>) {
		this.logger.log('MaterialEmissionFactor deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
