/*
  Warnings:

  - A unique constraint covering the columns `[organization_compliance_id,compliance_question_id]` on the table `organization_compliance_responses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organization_compliance_responses_organization_compliance_i_key" ON "organization_compliance_responses"("organization_compliance_id", "compliance_question_id");
