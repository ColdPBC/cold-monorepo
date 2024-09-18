import { getMaterialsMocksWithAssurances } from '@coldpbc/mocks';
import { GET_ALL_MATERIALS_FOR_ORG } from '@coldpbc/lib';
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
