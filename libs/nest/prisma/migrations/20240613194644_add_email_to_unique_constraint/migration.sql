/*
  Warnings:

  - A unique constraint covering the columns `[email,compliance_question_id]` on the table `organization_compliance_question_bookmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organization_compliance_question_bookmarks_email_compliance_key" ON "organization_compliance_question_bookmarks"("email", "compliance_question_id");
