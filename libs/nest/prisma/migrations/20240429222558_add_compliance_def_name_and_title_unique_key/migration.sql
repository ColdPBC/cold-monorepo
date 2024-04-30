/*
  Warnings:

  - A unique constraint covering the columns `[compliance_definition_name,title]` on the table `compliance_section_groups` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "compliance_definitions" ALTER COLUMN "visible" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "compliance_section_groups_compliance_definition_name_title_key" ON "compliance_section_groups"("compliance_definition_name", "title");
