import { AccessControlList, AuthorizationContext, AccessType } from '@exogee/graphweaver-auth';
import { Context } from 'node:vm';
import { ConsoleLogger } from '@nestjs/common';

const logger = new ConsoleLogger('Acl_Policies');

export type OrgContext = {
	user: { org_id: string; roles: string[]; email: string };
	token: { coldclimate_claims: { org_id: string; email: string; roles: string[]; sub: string; permissions: string[] } };
};

export const read_only_acl = {
	'company:member': {
		read: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
	},
	'company:admin': {
		read: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
	},
	'company:owner': {
		read: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
	},
	'cold:admin': {
		all: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
	},
};

export const allow_null_orgs_acl = {
	'company:member': {
		read: (context: OrgContext) => ({
			$or: [{ organization: context.user.org_id }, { organization: null }],
		}),
	},
	'company:admin': {
		read: (context: OrgContext) => ({
			$or: [{ organization: context.user.org_id }, { organization: null }],
		}),
	},
	'company:owner': {
		read: (context: OrgContext) => ({
			$or: [{ organization: context.user.org_id }, { organization: null }],
		}),
	},
	'cold:admin': {
		read: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
		write: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
		create: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
		update: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
		delete: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
		all: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
	},
};

export const default_acl = {
	'company:member': {
		read: (context: OrgContext) => ({ organization: context.user.org_id }),
		write: (context: OrgContext) => false,
		create: (context: OrgContext) => false,
		update: (context: OrgContext) => false,
		delete: (context: OrgContext) => false,
	},
	'company:admin': {
		read: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
		write: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
		create: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
		update: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
		delete: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
	},
	'company:owner': {
		read: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
		write: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
		create: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
		update: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
		delete: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
	},
	'cold:admin': {
		read: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
		/*all: (context: any) => {
			console.log('using cold admin only', context);
			return context?.user?.roles?.includes('cold:admin');
		},*/
	},
};

export const cold_admin_only = {
	'cold:admin': {
		all: (context: any) => {
			console.log('using cold admin only', context);
			return !!context?.user?.roles?.includes('cold:admin');
		},
	},
};
