import { UserProfile, UserProfileData, UserProfileType } from '@exogee/graphweaver-auth';
import { Organization } from './entities';
import { getConnection } from './database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { WorkerLogger } from './libs/logger';

const logger = new WorkerLogger('ColdProfile');
export interface ColdProfile<T> extends UserProfile<T> {
	organization: any;
	isAdmin: boolean;
	isOwner: boolean;
	isMember: boolean;
	isColdAdmin: boolean;
}

export type ColdProfileData<T> = UserProfileData<T>;

export const addUserToContext = async (userId: string, token: any) => {
	try {
		const profile: ColdProfile<ColdProfileData<any>> = {
			id: userId,
			isAdmin: token.coldclimate_claims.roles.includes('company:admin'),
			isOwner: token.coldclimate_claims.roles.includes('company:owner'),
			isMember: token.coldclimate_claims.roles.includes('company:member'),
			isColdAdmin: token.coldclimate_claims.roles.includes('cold:admin'),
			displayName: token.coldclimate_claims.email,
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

		const provider = new MikroBackendProvider(Organization, getConnection());

		const org = await provider.findOne(orgFilter);

		if (!org) {
			logger.error(`Organization ${orgFilter.id || orgFilter.name} not found`);
			throw new Error(`Organization ${orgFilter.id || orgFilter.name} not found`);
		}

		logger.info(`Assigning organization: ${org.name} to ${profile.email} profile`);

		profile.organization = {
			id: org.id,
			name: org.name,
			displayName: org.displayName,
		};

		return profile;
	} catch (err) {
		logger.error(`Error adding user to context: ${err}`);
	}
};
