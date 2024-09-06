import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { useContext } from 'react';
import { ColdApolloContext } from '@coldpbc/providers';
import { ApolloQueryResult } from '@apollo/client';
import { queries } from '@coldpbc/lib';
import { get } from 'lodash';

export const useGraphQLSWR = <Data = any, Error = any>(key: string | null, config?: SWRConfiguration) => {
  const { client } = useContext(ColdApolloContext);

  return useSWR(
    key,
    (key: string) => {
      const query = get(queries, key, null);
      if (query) {
        return client?.query({
          query: query,
        });
      } else {
        return undefined;
      }
    },
    config,
  ) as SWRResponse<ApolloQueryResult<any>, Error, any>;
};
