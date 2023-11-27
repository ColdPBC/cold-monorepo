import { PolicyDefinitionsEntity } from '../../policy-definitions';

export type PolicyDataEntity = {
  email: string;
  id: number;
  created_at: Date;
  updated_at: Date;
  policy_definition?: PolicyDefinitionsEntity;
};
