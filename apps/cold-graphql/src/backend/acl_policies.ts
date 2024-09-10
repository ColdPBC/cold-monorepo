import { Organization } from './entities/postgresql';
import { WorkerLogger } from './libs/logger';

const logger = new WorkerLogger('ApplyAclToEntities');

export type OrgContext = {
	organization: null | Organization;
	user: { organization?: any; org_id: string; roles: string[]; email: string };
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

type aclResponse =
	| { organization: { id: string } }
	| {
			$or: [{ organization: unknown }, { organization: unknown }];
	  }
	| boolean;

export const default_acl = {
	'company:member': {
		read: (context: OrgContext) => ({ organization: { id: context.user.org_id } }),
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
		all: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
	},
};

export const cold_admin_only = {
	'cold:admin': {
		all: (context: OrgContext) => context?.user?.roles?.includes('cold:admin'),
	},
};
