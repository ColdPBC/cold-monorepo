/*
  Warnings:

  - A unique constraint covering the columns `[compliance_definition_name,key]` on the table `compliance_questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `compliance_definition_name` to the `compliance_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compliance_questions" ADD COLUMN     "compliance_definition_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "compliance_questions_compliance_definition_name_key_key" ON "compliance_questions"("compliance_definition_name", "key");

-- AddForeignKey
ALTER TABLE "compliance_questions" ADD CONSTRAINT "compliance_questions_compliance_definition_name_fkey" FOREIGN KEY ("compliance_definition_name") REFERENCES "compliance_definitions"("name") ON DELETE CASCADE ON UPDATE CASCADE;
