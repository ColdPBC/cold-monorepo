import { DocumentNode, gql } from '@apollo/client';

export const GET_ALL_ORGS = gql`
  query GetAllOrganizations {
    organizations {
      id
      name
      displayName
    }
  }
`;

export const queries: {
  [key: string]: DocumentNode;
} = {
  GET_ALL_ORGS: GET_ALL_ORGS,
};
