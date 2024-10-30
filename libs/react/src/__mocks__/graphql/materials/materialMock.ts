import { getMaterialMock, getMaterialsMocksWithAssurances } from '@coldpbc/mocks';
import { GET_ALL_MATERIALS_FOR_ORG, GET_MATERIAL } from '@coldpbc/lib';
import { DocumentNode } from '@apollo/client';
import { RequestHandler } from 'mock-apollo-client';

export const materialsGraphqlMock: {
	query: DocumentNode;
	handler: RequestHandler;
}[] = [
	{
		query: GET_ALL_MATERIALS_FOR_ORG,
		handler: variables =>
			Promise.resolve({
				data: {
					materials: getMaterialsMocksWithAssurances(),
				},
			}),
	},
];

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
