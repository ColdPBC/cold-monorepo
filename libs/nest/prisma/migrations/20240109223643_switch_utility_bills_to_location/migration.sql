/*
  Warnings:

  - You are about to drop the column `organization_id` on the `utility_bills` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `utility_bills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "utility_bills" DROP CONSTRAINT "utility_bills_organization_id_fkey";

-- AlterTable
ALTER TABLE "utility_bills" DROP COLUMN "organization_id",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "utility_bills" ADD CONSTRAINT "utility_bills_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "organization_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
