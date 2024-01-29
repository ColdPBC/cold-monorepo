/*
  Warnings:

  - You are about to drop the column `organization_id` on the `emissions` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "emissions" DROP CONSTRAINT "emissions_organization_id_fkey";

-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "organization_id",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "emissions" ADD CONSTRAINT "emissions_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "organization_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
