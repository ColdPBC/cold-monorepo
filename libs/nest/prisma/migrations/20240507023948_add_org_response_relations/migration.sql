/*
  Warnings:

  - Added the required column `organization_compliance_id` to the `organization_compliance_ai_response_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `organization_compliance_ai_response_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_compliance_id` to the `organization_compliance_ai_responses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `organization_compliance_ai_responses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "organization_compliance_ai_responses" DROP CONSTRAINT "organization_compliance_ai_responses_compliance_question_i_fkey";

-- AlterTable
ALTER TABLE "organization_compliance_ai_response_files" ADD COLUMN     "organization_compliance_id" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organization_compliance_ai_responses" ADD COLUMN     "compliance_questionsId" TEXT,
ADD COLUMN     "organization_compliance_id" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- RenameForeignKey
ALTER TABLE "organization_compliance_ai_response_files" RENAME CONSTRAINT "organization_compliance_ai_response_files_organization_com_fkey" TO "org_comp_ai_response";

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_responses" ADD CONSTRAINT "organization_compliance_ai_responses_organization_complian_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_responses" ADD CONSTRAINT "organization_compliance_ai_responses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_responses" ADD CONSTRAINT "organization_compliance_ai_responses_compliance_questionsI_fkey" FOREIGN KEY ("compliance_questionsId") REFERENCES "compliance_questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_response_files" ADD CONSTRAINT "organization_compliance_ai_response_files_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_response_files" ADD CONSTRAINT "organization_compliance_ai_response_files_organization_com_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
