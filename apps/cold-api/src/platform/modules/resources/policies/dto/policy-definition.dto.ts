import { policy_definitions } from '@prisma/client';

export class PolicyDefinitionDto implements policy_definitions {
  id: number;
  name: string;
  definition: string;
  created_at: Date;
  updated_at: Date;
}
