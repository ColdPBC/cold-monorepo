import {UserProfile, UserProfileData} from '@exogee/graphweaver-auth';
import {UserProfileType} from "@exogee/graphweaver-auth/lib/user-profile";


export interface ColdProfile<T> extends UserProfile<T> {
    org_id: string,
    org_name: string
}

export interface ColdProfileData<T> extends UserProfileData<T>{
    org_id: string,
    org_name: string
}

export const addUserToContext = async (userId: string, test: any) => {
    const profile: ColdProfile<ColdProfileData<any>> =
        {
            id: userId,
            roles: test.coldclimate_claims.roles,
            type: UserProfileType.USER,
            email: test.email,
            org_id: test.org_id,
            org_name: test.org_name
        };

    return profile;
};
