import {AccessControlList, AuthorizationContext} from "@exogee/graphweaver-auth";
import {Claim, Organization} from "./entities";
import {Context} from "node:vm";

export interface ColdContext extends AuthorizationContext {
    org_id?: string,
    org_name?: string
}

export const default_acl: AccessControlList<any, Context> = {
    "company:admin": {
        read: (context: ColdContext) => ({ claims: { organizationId: context?.user?.id } }),
        create: (context: ColdContext) => ({ claims: { organizationId: context?.user?.id } }),
        update: (context: ColdContext) => ({ claims: { organizationId: context?.user?.id } }),
    },
    "company:member": {
        read: (context: ColdContext) => ({ id: context.org_id}),
        create: (context: ColdContext) => ( { id: context.org_id }),
        update: (context: ColdContext) => ({ id: context.org_id }),
    },
    "cold:admin": {
        all: (context: ColdContext) => !!context?.user?.roles?.includes('cold:admin'),
    },
};


export const organization_acl: AccessControlList<Organization, Context> = {
    "company:member": {
        // @ts-ignore
        read: (context: ColdContext) => ({ id: context.user.org_id }),
        // @ts-ignore
        create: (context: ColdContext) => ({ id: context.user.org_id }),
        // @ts-ignore
        update: (context: ColdContext) => ({ id: context.user.org_id }),
    },
    "cold:admin": {
        all: (context: ColdContext) => !!context?.user?.roles?.includes('cold:admin'),
    },
};

export const claim_acl: AccessControlList<Claim, Context> = {
    "company:admin": {
        // @ts-ignore
        read: (context: ColdContext) => ({ organizationId: context.user.org_id }),
        // @ts-ignore
        create: (context: ColdContext) => ({ organizationId: context.user.org_id }),
        // @ts-ignore
        update: (context: ColdContext) => ({ organizationId: context.user.org_id }),
        // @ts-ignore
        delete: (context: ColdContext) => ({ organizationId: context.user.org_id }),
    },
    "company:member": {
        // @ts-ignore
        read: (context: ColdContext) => ({ organization: {id: context.user.org_id }}),
        // @ts-ignore
        create: (context: ColdContext) => ({ organizationId: {id: context.user.org_id }}),
        // @ts-ignore
        update: (context: ColdContext) => ({ organizationId: {id: context.user.org_id }}),
    },
    "cold:admin": {
        all: (context: ColdContext) => !!context?.user?.roles?.includes('cold:admin'),
    },
}

export const cold_admin_only = {
    "cold:admin": {
        all: (context: ColdContext) => (context: AuthorizationContext) => !!context?.user?.roles?.includes('cold:admin'),
    },
};
