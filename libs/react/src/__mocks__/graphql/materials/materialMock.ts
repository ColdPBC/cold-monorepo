import { getMaterialMock } from '@coldpbc/mocks';
import { GET_MATERIAL } from '@coldpbc/lib';
import { DocumentNode } from '@apollo/client';
import { RequestHandler } from 'mock-apollo-client';

export const getMaterialGraphQLMock: {
	query: DocumentNode;
	handler: RequestHandler;
}[] = [
	{
		query: GET_MATERIAL,
		handler: _variables => {
			return Promise.resolve({
				data: {
					material: getMaterialMock,
				},
			});
		},
	},
];
