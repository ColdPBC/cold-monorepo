/*
  Warnings:

  - A unique constraint covering the columns `[organization_compliance_id,organization_files_id]` on the table `organization_compliance_ai_response_files` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organization_compliance_ai_response_files_organization_comp_key" ON "organization_compliance_ai_response_files"("organization_compliance_id", "organization_files_id");
