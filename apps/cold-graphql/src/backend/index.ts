/* cold-graphql Graphweaver Project */
import Graphweaver from '@exogee/graphweaver-server';
import './schema';


import {
    AuthZero,
    setAddUserToContext,
    setImplicitAllow, setAdministratorRoleName, UserProfile,
} from "@exogee/graphweaver-auth";
import {UserProfileType} from "@exogee/graphweaver-auth/lib/user-profile";
import {addUserToContext} from "./cold_profile";

export const authZero = new AuthZero();

setAddUserToContext(addUserToContext);
setAdministratorRoleName("cold:admin")

export const graphweaver = new Graphweaver({
    apolloServerOptions: {
        introspection: true
    },
    graphQLArmorOptions: {
        maxAliases: { n: 50 },
    }
});

//export const handler = graphweaver.handler();

