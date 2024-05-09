/*
  Warnings:

  - You are about to drop the column `comparison` on the `compliance_questions` table. All the data in the column will be lost.
  - You are about to drop the column `operator` on the `compliance_questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "compliance_questions" DROP COLUMN "comparison",
DROP COLUMN "operator";
