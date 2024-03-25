/*
  Warnings:

  - You are about to drop the column `location_id` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `integrations` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `utility_bills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[service_definition_id,facility_id]` on the table `integrations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facility_id` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facility_id` to the `utility_bills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "emissions" DROP CONSTRAINT "emissions_location_id_fkey";

-- DropForeignKey
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "utility_bills" DROP CONSTRAINT "utility_bills_location_id_fkey";

-- DropIndex
DROP INDEX "integrations_service_definition_id_location_id_key";

-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "location_id",
ADD COLUMN     "facility_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "integrations" DROP COLUMN "location_id",
ADD COLUMN     "facility_id" TEXT;

-- AlterTable
ALTER TABLE "utility_bills" DROP COLUMN "location_id",
ADD COLUMN     "facility_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "integrations_service_definition_id_facility_id_key" ON "integrations"("service_definition_id", "facility_id");

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emissions" ADD CONSTRAINT "emissions_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utility_bills" ADD CONSTRAINT "utility_bills_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
