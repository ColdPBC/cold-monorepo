import * as z from 'zod';

export const ComplianceDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  logo_url: z.string().url(),
  surveys: z.array(z.string()),
});

export type ComplianceDefinition = z.infer<typeof ComplianceDefinitionSchema>;

export const OrgComplianceSchema = z.object({
  id: z.string(),
  organization_id: z.string().uuid(),
  compliance_id: z.string(),
});

export type OrgCompliance = z.infer<typeof OrgComplianceSchema>;
