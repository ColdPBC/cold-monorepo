/*
  Warnings:

  - You are about to drop the column `compliance_defnition_name` on the `compliance_dependency_chains` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[compliance_section_id,compliance_question_key,compliance_definition_name]` on the table `compliance_dependency_chains` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[compliance_section_key,compliance_question_key,compliance_definition_name]` on the table `compliance_dependency_chains` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `compliance_definition_name` to the `compliance_dependency_chains` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "compliance_dependency_chains_compliance_section_id_complian_key";

-- DropIndex
DROP INDEX "compliance_dependency_chains_compliance_section_key_complia_key";

-- AlterTable
ALTER TABLE "compliance_dependency_chains" DROP COLUMN "compliance_defnition_name",
ADD COLUMN     "compliance_definition_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "compliance_dependency_chains_compliance_section_id_complian_key" ON "compliance_dependency_chains"("compliance_section_id", "compliance_question_key", "compliance_definition_name");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_dependency_chains_compliance_section_key_complia_key" ON "compliance_dependency_chains"("compliance_section_key", "compliance_question_key", "compliance_definition_name");
