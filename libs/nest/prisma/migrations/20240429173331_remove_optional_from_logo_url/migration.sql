/*
  Warnings:

  - Made the column `logo_url` on table `compliance_definitions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "compliance_definitions" ALTER COLUMN "logo_url" SET NOT NULL,
ALTER COLUMN "custom" SET DEFAULT false;
