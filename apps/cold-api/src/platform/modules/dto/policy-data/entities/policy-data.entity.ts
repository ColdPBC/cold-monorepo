import { PolicyDefinitionsEntity } from '../../policy-definitions/entities/policy-definitions.entity';

export class PolicyDataEntity {
  email: string;
  id: number;
  created_at: Date;
  updated_at: Date;
  policy_definition?: PolicyDefinitionsEntity;
}
