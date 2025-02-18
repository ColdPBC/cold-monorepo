// EmissionFactor Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { EmissionFactor } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class EmissionFactorHooks extends BaseSidecar {
	constructor() {
		super(EmissionFactor, 'emission_factors');
	}

	async beforeReadHook(params: ReadHookParams<typeof EmissionFactor, OrgContext>) {
		this.logger.log('before EmissionFactor read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}


	async afterReadHook(params: ReadHookParams<typeof EmissionFactor, OrgContext>) {
		this.logger.log('EmissionFactor read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);

	}


	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof EmissionFactor, OrgContext>) {
		this.logger.log(`before create EmissionFactor`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["EmissionFactor"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["EmissionFactor"]).generate().scopedId);
			}

			set(item, 'organization.id', params.context.user.organization.id);

			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}

	  return super.beforeCreateHook(params);
	}


	async afterCreateHook(params: CreateOrUpdateHookParams<typeof EmissionFactor, OrgContext>) {
		this.logger.log('EmissionFactor created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}


	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof EmissionFactor, OrgContext>) {
		this.logger.log('before EmissionFactor update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}


	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof EmissionFactor, OrgContext>) {
		this.logger.log('EmissionFactor updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}


	async beforeDeleteHook(params: DeleteHookParams<typeof EmissionFactor, OrgContext>) {
		this.logger.log('before EmissionFactor delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}


	async afterDeleteHook(params: DeleteHookParams<typeof EmissionFactor, OrgContext>) {
		this.logger.log('EmissionFactor deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
