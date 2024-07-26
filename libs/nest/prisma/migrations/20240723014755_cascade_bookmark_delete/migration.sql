-- DropForeignKey
ALTER TABLE "organization_compliance_question_bookmarks" DROP CONSTRAINT "organization_compliance_question_bookmarks_compliance_ques_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_question_bookmarks" DROP CONSTRAINT "organization_compliance_question_bookmarks_organization_co_fkey";

-- AddForeignKey
ALTER TABLE "organization_compliance_question_bookmarks" ADD CONSTRAINT "organization_compliance_question_bookmarks_compliance_ques_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_question_bookmarks" ADD CONSTRAINT "organization_compliance_question_bookmarks_organization_co_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
