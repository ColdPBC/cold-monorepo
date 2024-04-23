/*
  Warnings:

  - You are about to drop the column `organization_id` on the `emission_scopes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "emission_scopes" DROP CONSTRAINT "emission_scopes_organization_id_fkey";

-- AlterTable
ALTER TABLE "emission_scopes" DROP COLUMN "organization_id";
