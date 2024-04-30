/*
  Warnings:

  - Added the required column `coresponding_question` to the `compliance_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compliance_questions" ADD COLUMN     "coresponding_question" TEXT NOT NULL;
