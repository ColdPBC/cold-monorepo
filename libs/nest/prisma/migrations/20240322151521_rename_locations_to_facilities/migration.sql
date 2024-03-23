/*
  Warnings:

  - You are about to drop the `organization_locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "emissions" DROP CONSTRAINT "emissions_location_id_fkey";

-- DropForeignKey
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_locations" DROP CONSTRAINT "organization_locations_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "utility_bills" DROP CONSTRAINT "utility_bills_location_id_fkey";

-- DropTable
DROP TABLE "organization_locations";

-- CreateTable
CREATE TABLE "organization_facilities" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'US',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "address_line_2" TEXT,
    "postal_code" TEXT NOT NULL,

    CONSTRAINT "organization_facilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organization_facilities" ADD CONSTRAINT "organization_facilities_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emissions" ADD CONSTRAINT "emissions_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utility_bills" ADD CONSTRAINT "utility_bills_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
