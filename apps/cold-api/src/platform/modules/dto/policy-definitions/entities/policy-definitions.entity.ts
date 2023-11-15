import { PolicyDataEntity } from '../../policy-data/entities/policy-data.entity';

export class PolicyDefinitionsEntity {
  id: number;
  name: string;
  definition: string;
  created_at: Date;
  updated_at: Date;
  policy_data?: PolicyDataEntity[];
}
