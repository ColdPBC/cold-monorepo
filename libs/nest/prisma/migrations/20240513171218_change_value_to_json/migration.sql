/*
  Warnings:

  - The `value` column on the `organization_compliance_responses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "organization_compliance_responses" DROP COLUMN "value",
ADD COLUMN     "value" JSONB;
