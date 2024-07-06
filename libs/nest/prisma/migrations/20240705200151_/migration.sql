-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_compliance_question_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_compliance_section_group_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_compliance_section_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_organization_compliance_ai_response_i_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_organization_compliance_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_organization_compliance_response_id_fkey";

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_organization_compliance_ai_response_i_fkey" FOREIGN KEY ("organization_compliance_ai_response_id") REFERENCES "organization_compliance_ai_responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_organization_compliance_response_id_fkey" FOREIGN KEY ("organization_compliance_response_id") REFERENCES "organization_compliance_responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_compliance_section_id_fkey" FOREIGN KEY ("compliance_section_id") REFERENCES "compliance_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_compliance_section_group_id_fkey" FOREIGN KEY ("compliance_section_group_id") REFERENCES "compliance_section_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_compliance_question_id_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_organization_compliance_id_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
