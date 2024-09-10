import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './compliance-section.hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceQuestion } from './compliance-question';
import { ComplianceSectionDependencyChain } from './compliance-section-dependency-chain';
import { ComplianceSectionGroup } from './compliance-section-group';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'compliance_sections' })
export class ComplianceSection {
	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'text' })
	key!: string;

	@Property({ type: 'text' })
	title!: string;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@ManyToOne({ entity: () => ComplianceSectionGroup, ref: true })
	complianceSectionGroup!: Ref<ComplianceSectionGroup>;

	@Property({ type: 'integer' })
	order!: number;

	@Property({ type: 'text' })
	complianceDefinitionName!: string;

	@Property({ type: 'text', nullable: true })
	dependencyExpression?: string;

	@ManyToOne({ entity: () => ComplianceSectionDependencyChain, ref: true, nullable: true, index: 'compliance_sections_compliance_section_dependency_chain_id_idx' })
	complianceSectionDependencyChain?: Ref<ComplianceSectionDependencyChain>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, nullable: true, index: 'compliance_sections_compliance_definition_id_idx' })
	complianceDefinition?: Ref<ComplianceDefinition>;

	@OneToMany({ entity: () => ComplianceQuestion, mappedBy: 'complianceSection' })
	complianceQuestions = new Collection<ComplianceQuestion>(this);
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ComplianceSection, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ComplianceSection, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ComplianceSection, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ComplianceSection, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ComplianceSection, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ComplianceSection, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ComplianceSection, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ComplianceSection, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
