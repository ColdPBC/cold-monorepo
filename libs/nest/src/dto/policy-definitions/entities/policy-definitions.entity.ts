import { PolicyDataEntity } from '../../policy-data';

export type PolicyDefinitionsEntity = {
  id: number;
  name: string;
  definition: string;
  created_at: Date;
  updated_at: Date;
  policy_data?: PolicyDataEntity[];
};
