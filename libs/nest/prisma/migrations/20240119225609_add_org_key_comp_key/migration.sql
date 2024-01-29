/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,compliance_id]` on the table `organization_compliances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organization_compliances_organization_id_compliance_id_key" ON "organization_compliances"("organization_id", "compliance_id");
