-- RenameForeignKey
ALTER TABLE "compliance_responses" RENAME CONSTRAINT "ai_response_id" TO "compliance_responses_organization_compliance_ai_response_i_fkey";

-- RenameForeignKey
ALTER TABLE "compliance_responses" RENAME CONSTRAINT "org_response_id" TO "compliance_responses_organization_compliance_response_id_fkey";
