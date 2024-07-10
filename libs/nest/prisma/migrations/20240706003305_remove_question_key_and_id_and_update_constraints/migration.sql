/*
  Warnings:

  - You are about to drop the column `compliance_question_id` on the `compliance_section_dependency_chains` table. All the data in the column will be lost.
  - You are about to drop the column `compliance_question_key` on the `compliance_section_dependency_chains` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[compliance_section_group_id,compliance_section_id,compliance_definition_name]` on the table `compliance_section_dependency_chains` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[compliance_section_group_id,compliance_section_key,compliance_definition_name]` on the table `compliance_section_dependency_chains` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "compliance_section_dependency_chains_compliance_question_id_key";

-- DropIndex
DROP INDEX "compliance_section_dependency_chains_compliance_section_id__key";

-- DropIndex
DROP INDEX "compliance_section_dependency_chains_compliance_section_key_key";

-- AlterTable
ALTER TABLE "compliance_section_dependency_chains" DROP COLUMN "compliance_question_id",
DROP COLUMN "compliance_question_key";

-- CreateIndex
CREATE UNIQUE INDEX "defNameSecIdGrpId" ON "compliance_section_dependency_chains"("compliance_section_group_id", "compliance_section_id", "compliance_definition_name");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_section_dependency_chains_compliance_section_gro_key" ON "compliance_section_dependency_chains"("compliance_section_group_id", "compliance_section_key", "compliance_definition_name");
