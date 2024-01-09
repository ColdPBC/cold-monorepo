/*
  Warnings:

  - You are about to drop the column `integration_id` on the `organization_locations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "organization_locations" DROP CONSTRAINT "organization_locations_integration_id_fkey";

-- AlterTable
ALTER TABLE "organization_locations" DROP COLUMN "integration_id";
