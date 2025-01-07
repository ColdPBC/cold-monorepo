import {useSWRConfig} from "swr";
import {isOrgKey, queryContainsExactWord} from "@coldpbc/lib";


export const useGraphqlSWRMutate = (organizationId: string | undefined) => {
  const { cache, mutate } = useSWRConfig();
  const cacheKeys = Array.from(cache.keys());

  const mutateKey = async (key: string) => {
    // uses the query key and organization id to get the query mappings
    // have swr mutate the query mappings
    if(!organizationId) return;
    // get all the swr keys that contain the key and the organization id
    const graphqlMappings = cacheKeys.filter(cacheKey => queryContainsExactWord(cacheKey, key) && isOrgKey(cacheKey, organizationId));

    // mutate the swr keys
    const promises = await Promise.all(graphqlMappings.map(async query => {
      return mutate(query);
    }))

    return promises;
  }

  return { mutateKey }
}
