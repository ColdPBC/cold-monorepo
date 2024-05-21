/*
  Warnings:

  - You are about to drop the column `organization_compliance_ai_response_id` on the `organization_compliance_responses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "organization_compliance_responses" DROP CONSTRAINT "ai_response_id";

-- AlterTable
ALTER TABLE "organization_compliance_responses" DROP COLUMN "organization_compliance_ai_response_id";
