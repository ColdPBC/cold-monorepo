/*
  Warnings:

  - Made the column `organization_id` on table `locations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "organization_locations" DROP CONSTRAINT "organization_locations_organization_id_fkey";

-- AlterTable
ALTER TABLE "organization_locations" ALTER COLUMN "organization_id" SET NOT NULL;
