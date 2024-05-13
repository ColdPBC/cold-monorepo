/*
  Warnings:

  - Added the required column `answer` to the `organization_compliance_ai_responses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization_compliance_ai_responses" DROP COLUMN "answer",
ADD COLUMN     "answer" JSONB NOT NULL;
