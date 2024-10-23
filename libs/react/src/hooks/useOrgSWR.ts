import { useAuth0 } from '@auth0/auth0-react';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { useColdContext } from './useColdContext';
import { isArray } from 'lodash';
import { multiFetcher } from '../fetchers/multiFetcher';
import { axiosFetcher } from '@coldpbc/fetchers';

export const useOrgSWR = <Data = any, Error = any>(key: Array<any> | null, fetcher: ((arg: string[]) => unknown) | null, config?: SWRConfiguration) => {
	const { impersonatingOrg } = useColdContext();

	const getKey = () => {
		if (authUser && key != null) {
			const orgId = impersonatingOrg ? impersonatingOrg.id : authUser.coldclimate_claims.org_id;
			if (isArray(key) && isArray(key[0])) {
				const orgKeys = key[0].map(keyString => {
					return '/organizations/' + orgId + keyString;
				});
				return [orgKeys, ...key.slice(1)];
			} else {
				const orgKey = '/organizations/' + orgId + key[0];
				return [orgKey, ...key.slice(1)];
			}
		} else {
			return null;
		}
	};

	// to handle when multiple urls are passed to the fetcher
	const getFetcher = () => {
		if (isArray(key) && isArray(key[0])) {
			return multiFetcher;
		} else {
			return axiosFetcher;
		}
	};

	const { user: authUser, isLoading: authIsLoading, isAuthenticated: authisAuthenticated, error: authError } = useAuth0();

	return useSWR(getKey(), getFetcher(), config) as SWRResponse<Data, Error, any>;
};
