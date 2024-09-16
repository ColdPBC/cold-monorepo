/*
  Warnings:

  - A unique constraint covering the columns `[sustainability_attribute_id,organization_id,organization_file_id]` on the table `attribute_assurances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attribute_assurances_sustainability_attribute_id_organizati_key" ON "attribute_assurances"("sustainability_attribute_id", "organization_id", "organization_file_id");
