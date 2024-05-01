/*
  Warnings:

  - You are about to drop the column `compliance_definitions_id` on the `compliance_sections` table. All the data in the column will be lost.
  - Added the required column `compliance_definition_name` to the `compliance_sections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_definitions_id_fkey";

-- AlterTable
ALTER TABLE "compliance_sections" DROP COLUMN "compliance_definitions_id",
ADD COLUMN     "compliance_definition_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_definition_name_fkey" FOREIGN KEY ("compliance_definition_name") REFERENCES "compliance_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
