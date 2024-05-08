-- DropForeignKey
ALTER TABLE "organization_compliance_responses" DROP CONSTRAINT "ai_response_id";

-- AlterTable
ALTER TABLE "organization_compliance_responses" ALTER COLUMN "organization_compliance_ai_response_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "organization_compliance_responses" ADD CONSTRAINT "ai_response_id" FOREIGN KEY ("organization_compliance_ai_response_id") REFERENCES "organization_compliance_ai_responses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
