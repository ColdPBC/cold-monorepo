import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { useContext } from 'react';
import { ColdApolloContext } from '@coldpbc/providers';
import { ApolloQueryResult } from '@apollo/client';
import { queries } from '@coldpbc/lib';
import { get } from 'lodash';
import { useColdContext } from './useColdContext';

export const useGraphQLSWR = <Data = any, Error = any>(key: string | null, variables?: any, config?: SWRConfiguration) => {
	const { logBrowser } = useColdContext();
	const { client } = useContext(ColdApolloContext);

	return useSWR(
		key ? [key, JSON.stringify(variables)] : null,
		async ([queryKey]) => {
			const query = get(queries, queryKey, null);
			if (!query || !client) return undefined;

			try {
				const response = await client.query({
					query,
					variables,
				});

				logBrowser(`Successful fetching graphql query ${queryKey}`, 'info', {
					queryKey,
          query,
					variables,
					response,
				});

				return response;
			} catch (error) {
				logBrowser(`Error fetching graphql query ${queryKey}`, 'error', {
					query: queryKey,
					variables,
					error,
				});
				throw error;
			}
		},
		config,
	) as SWRResponse<ApolloQueryResult<Data>, Error, any>;
};
