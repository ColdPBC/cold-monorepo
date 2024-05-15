import { AuthenticatedUser } from '@coldpbc/nest';
import { organization_compliance, organization_compliance_ai_responses, organization_compliance_responses, organizations } from '@prisma/client';

export type CreateComplianceReponsesPayload = {
  organization: organizations;
  compliance: organization_compliance;
  user: AuthenticatedUser;
  org_response: organization_compliance_responses;
  ai_response: organization_compliance_ai_responses;
  compliance_section_id: string;
  compliance_section_group_id: string;
};
