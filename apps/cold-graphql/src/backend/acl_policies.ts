import { AccessControlList, AuthorizationContext } from '@exogee/graphweaver-auth';
import { Context } from 'node:vm';

export interface ColdContext extends AuthorizationContext {
  org_id?: string;
  org_name?: string;
}

export type OrgContext = { user: { org_id: string; roles: string[] } };

export const public_acl = {
  'company:member': {
    read: () => true,
    write: () => false,
  },
  'company:admin': {
    read: () => true,
    write: () => false,
  },
  'company:owner': {
    read: () => true,
    write: () => false,
  },
  'cold:admin': {
    all: (context: ColdContext) => !!context?.user?.roles?.includes('cold:admin'),
  },
};
export const queryNullOrgs = {
  'company:member': {
    read: (context: OrgContext) => ({
      $or: [{ organization: context.user.org_id }, { organization: null }],
    }),
    write: (context: OrgContext) => ({ organization: context.user.org_id }),
  },
  'company:admin': {
    read: (context: OrgContext) => ({
      $or: [{ organization: context.user.org_id }, { organization: null }],
    }),
    write: (context: OrgContext) => ({ organization: context.user.org_id }),
  },
  'company:owner': {
    read: (context: OrgContext) => ({
      $or: [{ organization: context.user.org_id }, { organization: null }],
    }),
    write: (context: OrgContext) => ({ organization: context.user.org_id }),
  },
  'cold:admin': {
    all: (context: OrgContext) => context.user.roles.includes('cold:admin'),
  },
};

export const default_acl = {
  'company:member': {
    read: (context: OrgContext) => {
      console.log('using company:owner', context);
      return { organization: context.user.org_id };
    },
    write: (context: OrgContext) => {
      console.log('using company:owner', context);
      return { organization: context.user.org_id };
    },
  },
  'company:admin': {
    read: (context: OrgContext) => {
      console.log('using company:owner', context);
      return { organization: context.user.org_id };
    },
    write: (context: OrgContext) => {
      console.log('using company:owner', context);
      return { organization: context.user.org_id };
    },
  },
  'company:owner': {
    read: (context: OrgContext) => {
      console.log('using company:owner', context);
      return { organization: context.user.org_id };
    },
    write: (context: OrgContext) => ({ organization: context.user.org_id }),
  },
  'cold:admin': {
    all: (context: OrgContext) => {
      console.log('using cold admin only', context);
      return context.user.roles.includes('cold:admin');
    },
  },
};

export const cold_admin_only: AccessControlList<unknown, Context> = {
  'cold:admin': {
    all: (context: ColdContext) => {
      console.log('using cold admin only', context);
      return !!context?.user?.roles?.includes('cold:admin');
    },
  },
};
