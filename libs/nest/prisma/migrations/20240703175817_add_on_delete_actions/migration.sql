-- DropForeignKey
ALTER TABLE "organization_compliance_ai_response_files" DROP CONSTRAINT "organization_compliance_ai_response_files_organization_com_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_ai_response_files" DROP CONSTRAINT "organization_compliance_ai_response_files_organization_fil_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_ai_responses" DROP CONSTRAINT "organization_compliance_ai_responses_organization_complian_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_notes" DROP CONSTRAINT "organization_compliance_notes_organization_compliance_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_responses" DROP CONSTRAINT "organization_compliance_responses_organization_compliance__fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_statuses" DROP CONSTRAINT "organization_compliance_statuses_organization_compliance_i_fkey";

-- AddForeignKey
ALTER TABLE "organization_compliance_statuses" ADD CONSTRAINT "organization_compliance_statuses_organization_compliance_i_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_notes" ADD CONSTRAINT "organization_compliance_notes_organization_compliance_id_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_responses" ADD CONSTRAINT "organization_compliance_responses_organization_compliance__fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_responses" ADD CONSTRAINT "organization_compliance_ai_responses_organization_complian_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_response_files" ADD CONSTRAINT "organization_compliance_ai_response_files_organization_fil_fkey" FOREIGN KEY ("organization_files_id") REFERENCES "organization_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_response_files" ADD CONSTRAINT "organization_compliance_ai_response_files_organization_com_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
