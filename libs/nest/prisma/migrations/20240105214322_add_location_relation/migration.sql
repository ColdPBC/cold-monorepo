-- DropForeignKey
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_organization_id_fkey";

-- AlterTable
ALTER TABLE "integrations" ADD COLUMN     "location_id" TEXT;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "organization_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
