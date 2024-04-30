/*
  Warnings:

  - A unique constraint covering the columns `[compliance_section_id,key]` on the table `compliance_questions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "compliance_questions_compliance_section_id_key_key" ON "compliance_questions"("compliance_section_id", "key");
