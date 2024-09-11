import Graphweaver from '@exogee/graphweaver-server';
import './schema';

import { AuthZero, setAddUserToContext, setAdministratorRoleName } from '@exogee/graphweaver-auth';
import { addUserToContext } from './cold_profile';
import { WorkerLogger } from './libs/logger';
export const authZero = new AuthZero();

setAddUserToContext(addUserToContext);
//setAdministratorRoleName('cold:admin');
export const graphweaver = new Graphweaver({
	apolloServerOptions: {
		introspection: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging',
		hideSchemaDetailsFromClientErrors: process.env.NODE_ENV !== 'development',
		includeStacktraceInErrorResponses: process.env.NODE_ENV === 'development',
		logger: new WorkerLogger('GraphWeaver'),
		formatError: (error, context) => {
			return {
				extensions: error.extensions,
				message: error.message,
				locations: error.locations,
				path: error.path,
				context,
			};
		},
	},
	graphQLArmorOptions: {
		maxAliases: { n: 70 },
	},
});
