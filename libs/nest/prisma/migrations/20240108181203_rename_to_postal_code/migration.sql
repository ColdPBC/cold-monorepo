/*
  Warnings:

  - You are about to drop the column `zip` on the `organization_locations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organization_locations" DROP COLUMN "zip",
ADD COLUMN     "postal_code" TEXT NOT NULL DEFAULT '55401';
