-- AlterTable
ALTER TABLE "organization_compliance_ai_responses" ADD COLUMN     "additional_context" JSONB;

-- AlterTable
ALTER TABLE "organization_compliance_responses" ADD COLUMN     "additional_context" JSONB;
