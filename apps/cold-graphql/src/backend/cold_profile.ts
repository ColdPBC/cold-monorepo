import { UserProfile, UserProfileData, UserProfileType } from '@exogee/graphweaver-auth';
import { entities, Organization } from './entities';
import { PostgreSqlDriver, ReflectMetadataProvider } from '@mikro-orm/postgresql';
import { connectionValues } from './database.config';
import { DynamicEventSubscriber } from './event_subscriber';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { WorkerLogger } from './libs/logger';

const logger = new WorkerLogger('ColdProfile');
export interface ColdProfile<T> extends UserProfile<T> {
	org_id: string;
	org_name: string;
	organization: any;
}

export interface ColdProfileData<T> extends UserProfileData<T> {
	org_id: string;
	org_name: string;
}

export const addUserToContext = async (userId: string, token: any) => {
	const profile: ColdProfile<ColdProfileData<any>> = {
		displayName: '',
		name: {},
		org_id: '',
		org_name: '',
		username: '',
		id: userId,
		roles: token.coldclimate_claims.roles,
		type: UserProfileType.USER,
		email: token.coldclimate_claims.email,
		organization: null,
	};

	let orgFilter: { id?: string; name?: string };

	if (!token.coldclimate_claims.org_id && !token.coldclimate_claims.roles.includes('cold:admin')) {
		throw new Error('User does not have an organization');
	}

	if (token.coldclimate_claims.roles.includes('cold:admin')) {
		orgFilter = { name: `cold-climate-${process.env.NODE_ENV}` };
	} else {
		orgFilter = { id: token.coldclimate_claims.org_id };
	}

	const provider = new MikroBackendProvider(Organization, {
		connectionManagerId: 'postgresql',
		mikroOrmConfig: {
			driverOptions: {
				connection: process.env.NODE_ENV === 'development' ? {} : { ssl: { rejectUnauthorized: false } },
			},
			entities: entities,
			driver: PostgreSqlDriver,
			metadataProvider: ReflectMetadataProvider,
			...connectionValues(),
			subscribers: [DynamicEventSubscriber],
			pool: { min: 2, max: 50 },
		},
	});

	const org = await provider.findOne(orgFilter);

	if (!org) {
		throw new Error(`Organization ${orgFilter.id || orgFilter.name} not found`);
	}

	logger.info(`Assigning organization: ${org.name} to user profile`);

	profile.organization = {
		id: org.id,
		name: org.name,
		displayName: org.displayName,
	};

	return profile;
};
