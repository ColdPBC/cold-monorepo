import {ApolloError, ApolloQueryResult} from '@apollo/client';
import {get, isArray} from "lodash";
import {SWRResponse} from "swr";
import {GraphQLFormattedError} from "graphql/error";

export const getGraphqlError = <TData>(
  query: SWRResponse<ApolloQueryResult<TData>, any>
): ApolloError | GraphQLFormattedError[] | null => {
  // handle SWR level error
  if(query.error){
    return query.error;
  }
  // handle Apollo level error
  const error = get(query, 'data.error', null);
  if (error) {
    return error;
  }

  // handle GraphQL Server level error
  const errors = get(query, 'data.errors', []);
  return isArray(errors) && errors.length > 0 ? errors : null;
};

export const hasGraphqlError = <TData>(
  query: SWRResponse<ApolloQueryResult<TData>, any>
): boolean => {
  const error = getGraphqlError(query);
  return !!error;
};
