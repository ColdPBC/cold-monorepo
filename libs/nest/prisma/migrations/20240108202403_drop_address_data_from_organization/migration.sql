/*
  Warnings:

  - You are about to drop the column `city` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `street_address` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `organizations` table. All the data in the column will be lost.
  - Made the column `organization_id` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `locations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "organization_locations" DROP CONSTRAINT "organization_locations_organization_id_fkey";

-- AlterTable
ALTER TABLE "organization_locations" ALTER COLUMN "organization_id" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "street_address",
DROP COLUMN "zip";

-- AddForeignKey
ALTER TABLE "organization_locations" ADD CONSTRAINT "organization_locations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
