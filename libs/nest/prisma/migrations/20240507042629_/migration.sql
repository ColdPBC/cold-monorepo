/*
  Warnings:

  - You are about to drop the column `compliance_questionsId` on the `organization_compliance_ai_responses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "organization_compliance_ai_responses" DROP CONSTRAINT "organization_compliance_ai_responses_compliance_questionsI_fkey";

-- AlterTable
ALTER TABLE "organization_compliance_ai_responses" DROP COLUMN "compliance_questionsId";

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_responses" ADD CONSTRAINT "organization_compliance_ai_responses_compliance_question_i_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
