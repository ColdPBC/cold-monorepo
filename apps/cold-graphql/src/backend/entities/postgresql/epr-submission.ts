import { EprSubmissionHooks } from '../hooks/epr-submission.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, Index, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'epr_submissions' })
export class EprSubmission {
	sidecar: EprSubmissionHooks;

	constructor() {
		this.sidecar = new EprSubmissionHooks();
	}

	@PrimaryKey({ type: 'integer' })
	id!: number;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'epr_submissions_organization_id_idx1' })
	organization!: Ref<Organization>;

	@Index({ name: 'epr_submissions_status_idx1' })
	@Property({ type: 'text' })
	status!: string;

	@Index({ name: 'epr_submissions_state_idx1' })
	@Property({ type: 'text' })
	state!: string;

	@Index({ name: 'epr_submissions_bill_identifier_idx1' })
	@Property({ type: 'text' })
	billIdentifier!: string;

	@Index({ name: 'epr_submissions_due_date_idx1' })
	@Property({ type: 'datetime', length: 3, nullable: true })
	dueDate?: Date;

	@Property({ type: 'datetime', length: 3, nullable: true })
	createdAt?: Date;

	@Property({ type: 'datetime', length: 3, nullable: true })
	updatedAt?: Date;

	@Index({ name: 'epr_submissions_submitted_at_idx1' })
	@Property({ type: 'datetime', length: 3, nullable: true })
	submittedAt?: Date;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof EprSubmission, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new EprSubmissionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof EprSubmission, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EprSubmissionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof EprSubmission, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EprSubmissionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof EprSubmission, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EprSubmissionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof EprSubmission, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EprSubmissionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof EprSubmission, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EprSubmissionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof EprSubmission, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EprSubmissionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof EprSubmission, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new EprSubmissionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
