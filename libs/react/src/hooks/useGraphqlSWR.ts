import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { useContext } from 'react';
import { ColdApolloContext } from '@coldpbc/providers';
import { ApolloQueryResult } from '@apollo/client';
import { queries } from '@coldpbc/lib';
import { get } from 'lodash';
import {useColdContext} from "./useColdContext";

export const useGraphQLSWR = <Data = any, Error = any>(key: string | null, variables?: any, config?: SWRConfiguration) => {
  const {logBrowser} = useColdContext()
  const { client } = useContext(ColdApolloContext);

  return useSWR(
    key,
    (key: string) => {
      const query = get(queries, key, null);
      if (query) {
        return client
					?.query({
						query: query,
						variables: variables,
					})
					.then(response => {
						logBrowser(`Successful fetching graphql query ${key}`, 'info', {
							query: key,
							variables,
							response,
						});
						return response;
					})
					.catch(error => {
            logBrowser(`Error fetching graphql query ${key}`, 'error', {
              query: key,
              variables,
              error,
            })
						return error;
					});
      } else {
        return undefined;
      }
    },
    config,
  ) as SWRResponse<ApolloQueryResult<Data>, Error, any>;
};
