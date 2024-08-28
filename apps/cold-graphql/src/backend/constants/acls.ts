export const defaultAcl = {
    "company:member": {
        read: (context: any) =>  (context: any) => ({ organization: context.user.org_id }),
        write: (context: any) => ({ organization: context.user.org_id }),
        delete: (context: any) => ({ organization: context.user.org_id }),
    },
    "company:admin": {
        read: (context: any) =>  (context: any) => ({ organization: context.user.org_id }),
        write: (context: any) => ({ organization: context.user.org_id }),
        delete: (context: any) => ({ organization: context.user.org_id }),
    },
    "company:owner": {
        read: (context: any) =>  (context: any) => ({ organization: context.user.org_id }),
        write: (context: any) => ({ organization: context.user.org_id }),
        delete: (context: any) => ({ organization: context.user.org_id }),
    },
    "cold:admin": {
        all: (context: any) => context.user.roles.includes('cold:admin'),
    },
}

export const queryNullOrgs = {
    "company:member": {
        read: (context: any) => ({
            $or: [{ organization: context.user.org_id }, { organization: null }],
        }),
        write: (context: any) => ({ organization: context.user.org_id }),
    },
    "company:admin": {
        read: (context: any) => ({
            $or: [{ organization: context.user.org_id }, { organization: null }],
        }),
        write: (context: any) => ({ organization: context.user.org_id }),
    },
    "company:owner": {
        read: (context: any) => ({
            $or: [{ organization: context.user.org_id }, { organization: null }],
        }),
        write: (context: any) => ({ organization: context.user.org_id }),
    },
    "cold:admin": {
        all: (context: any) => context.user.roles.includes('cold:admin'),
    },
}
