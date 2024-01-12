-- DropForeignKey
ALTER TABLE "organization_locations" DROP CONSTRAINT "organization_locations_organization_id_fkey";

-- AlterTable
ALTER TABLE "organization_locations" ALTER COLUMN "organization_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "organization_locations" ADD CONSTRAINT "organization_locations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
