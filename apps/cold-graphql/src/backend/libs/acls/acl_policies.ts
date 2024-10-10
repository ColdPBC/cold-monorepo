import { Organization } from '../../entities/postgresql';
import { WorkerLogger } from '../logger';

const logger = new WorkerLogger('ApplyAclToEntities');

export type OrgContext = {
	organization: null | Organization;
	user: {
		organization?: any;
		org_id: string;
		roles: string[];
		email: string;
		isMember: boolean;
		isAdmin: boolean;
		isOwner: boolean;
		isColdAdmin: boolean;
	};
	token: { coldclimate_claims: { org_id: string; email: string; roles: string[]; sub: string; permissions: string[] } };
};

const organization_scoped = (context: OrgContext) => ({
	$or: [{ organization: { id: context.organization?.id } }, { organization_id: null }],
});

export const organization_acl = {
	'company:member': {
		read: (context: OrgContext) => ({ id: context.user.organization.id }),
	},
	'company:admin': {
		read: (context: OrgContext) => ({ id: context.user.organization.id }),
		write: (context: OrgContext) => ({ id: context.user.organization.id }),
	},
	'company:owner': {
		read: (context: OrgContext) => ({ id: context.user.organization.id }),
		write: (context: OrgContext) => ({ id: context.user.organization.id }),
	},
	'cold:admin': {
		all: (context: OrgContext) => true,
	},
};

export const read_only_acl = {
	'company:member': {
		read: (context: OrgContext) => context?.user?.isMember,
	},
	'company:admin': {
		read: (context: OrgContext) => context?.user?.isAdmin,
	},
	'company:owner': {
		read: (context: OrgContext) => context?.user?.isOwner,
	},
	'cold:admin': {
		all: (context: OrgContext) => context?.user?.isColdAdmin,
	},
};

export const new_null_orgs_acl = {
	'company:admin': { read: (context: any) => ({ $or: [{ organization: { id: context.organization.id } }, { organization: { id: null } }] }) },
};

export const allow_null_orgs_acl = {
	'company:admin': {
		read: (context: any) => {
			return { $or: [{ organization: { id: null } }, { organization: { id: context.user.organization.id } }] };
		},
	},
	'company:member': { read: (context: any) => ({ $or: [{ organization: { id: context.organization.id } }, { organization: { id: null } }] }) },
	'company:owner': { read: (context: any) => ({ $or: [{ organization: { id: context.organization.id } }, { organization: { id: null } }] }) },
};

type aclResponse =
	| { organization: { id: string } }
	| {
			$or: [{ organization: unknown }, { organization: unknown }];
	  }
	| boolean;

export const attribute_assurances_acl = {
	'company:member': {
		read: organization_scoped,
	},
};

export const default_acl = {
	'company:member': {
		read: (context: OrgContext) => ({ organization: { id: context.user.organization.id } }),
	},
	'company:admin': {
		read: (context: OrgContext) => ({ organization: { id: context.user.organization.id } }),
		write: (context: OrgContext) => ({ organization: { id: context.user.organization.id } }),
	},
	'company:owner': {
		read: (context: OrgContext) => ({ organization: { id: context.user.organization.id } }),
		write: (context: OrgContext) => ({ organization: { id: context.user.organization.id } }),
	},
	'cold:admin': {
		all: (context: OrgContext) => true,
	},
};

export const cold_admin_only = {
	'cold:admin': {
		all: (context: OrgContext) => true,
	},
};
