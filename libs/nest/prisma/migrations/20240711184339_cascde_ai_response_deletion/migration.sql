-- DropForeignKey
ALTER TABLE "organization_compliance_ai_response_files" DROP CONSTRAINT "org_comp_ai_response";

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_response_files" ADD CONSTRAINT "org_comp_ai_response" FOREIGN KEY ("organization_compliance_ai_response_id") REFERENCES "organization_compliance_ai_responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
