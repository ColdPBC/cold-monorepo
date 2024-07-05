-- DropForeignKey
ALTER TABLE "organization_compliance_ai_responses" DROP CONSTRAINT "organization_compliance_ai_responses_compliance_question_i_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_ai_responses" DROP CONSTRAINT "organization_compliance_ai_responses_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_responses" DROP CONSTRAINT "organization_compliance_responses_compliance_question_id_fkey";

-- AddForeignKey
ALTER TABLE "organization_compliance_responses" ADD CONSTRAINT "organization_compliance_responses_compliance_question_id_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_responses" ADD CONSTRAINT "organization_compliance_ai_responses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_responses" ADD CONSTRAINT "organization_compliance_ai_responses_compliance_question_i_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
