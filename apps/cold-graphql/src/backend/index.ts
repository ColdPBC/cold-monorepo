import Graphweaver from '@exogee/graphweaver-server';
import './schema';

import { AuthZero, setAddUserToContext, setAdministratorRoleName } from '@exogee/graphweaver-auth';
import { addUserToContext } from './cold_profile';
import { WorkerLogger } from './libs/logger';

if (!process.env.FC_GIT_COMMIT_SHA) {
	console.warn('FC_GIT_COMMIT_SHA is not set');
} else {
	process.env.DD_GIT_COMMIT_SHA = process.env.FC_GIT_COMMIT_SHA;
	process.env.DD_GIT_REPOSITORY_URL = process.env.FC_GIT_REPOSITORY_URL || 'github.com/ColdPBC/cold-monorepo';
}

export const authZero = new AuthZero();

setAddUserToContext(addUserToContext);
setAdministratorRoleName('cold:admin');

export const graphweaver = new Graphweaver({
	openTelemetry: {
		instrumentations: [],
	},
	apolloServerOptions: {
		introspection: true, //process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging',
		hideSchemaDetailsFromClientErrors: false, //process.env.NODE_ENV !== 'development',
		includeStacktraceInErrorResponses: true, //process.env.NODE_ENV === 'development',
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
		maxDepth: { n: 10 },
		maxDirectives: { n: 20 },
		maxAliases: { n: 70 },
	},
});
