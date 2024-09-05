import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { useContext } from 'react';
import { ColdApolloContext } from '@coldpbc/providers';
import { ApolloQueryResult, gql } from '@apollo/client';

export const useGraphQLSWR = <Data = any, Error = any>(key: string | null, config?: SWRConfiguration) => {
  const { client } = useContext(ColdApolloContext);

  return useSWR(
    key,
    (key: string) => {
      return client?.query({
        query: gql`
          ${key}
        `,
      });
    },
    config,
  ) as SWRResponse<ApolloQueryResult<any>, Error, any>;
};
