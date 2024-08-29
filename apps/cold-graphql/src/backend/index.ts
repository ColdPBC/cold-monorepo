import Graphweaver from '@exogee/graphweaver-server';
import fastify from 'fastify';
import './schema';

import { AuthZero, setAddUserToContext, setAdministratorRoleName } from '@exogee/graphweaver-auth';
import { addUserToContext } from './cold_profile';

export const authZero = new AuthZero();

setAddUserToContext(addUserToContext);
setAdministratorRoleName('cold:admin');

export const graphweaver = new Graphweaver({
  apolloServerOptions: {
    introspection: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging',
  },
  graphQLArmorOptions: {
    maxAliases: { n: 50 },
  },
});
