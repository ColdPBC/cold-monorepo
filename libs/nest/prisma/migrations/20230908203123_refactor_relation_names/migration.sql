/*
  Warnings:

  - Added the required column `survey_definition_id` to the `survey_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "survey_data" ADD COLUMN     "survey_definition_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "survey_data" ADD CONSTRAINT "survey_data_survey_definition_id_fkey" FOREIGN KEY ("survey_definition_id") REFERENCES "survey_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
