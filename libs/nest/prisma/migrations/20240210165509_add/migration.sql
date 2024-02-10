/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,survey_definition_id]` on the table `survey_data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "survey_data_organization_id_survey_definition_id_key" ON "survey_data"("organization_id", "survey_definition_id");
