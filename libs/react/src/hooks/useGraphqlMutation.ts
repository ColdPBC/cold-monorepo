import { useContext } from 'react';
import { ColdApolloContext } from '@coldpbc/providers';
import { get } from 'lodash';
import { queries } from '@coldpbc/lib';
import { useColdContext } from './useColdContext';

export const useGraphQLMutation = (query: string) => {
	const { client } = useContext(ColdApolloContext);
	const { logBrowser } = useColdContext();

	const mutateGraphQL = function (variables: any) {
		const documentNode = get(queries, query, null);
		if (documentNode !== null) {
			logBrowser(`Mutating ${query}`, 'info', {
				query,
				variables,
			});
			const mutation = client?.mutate({
				mutation: documentNode,
				variables: variables,
			});
			return mutation || Promise.resolve();
		} else {
			logBrowser(`Could not find query for ${query}`, 'error', {
				query,
				variables,
			});
			return Promise.resolve();
		}
	};

	return { mutateGraphQL };
};
