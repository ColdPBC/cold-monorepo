-- DropForeignKey
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_facilities" DROP CONSTRAINT "organization_facilities_organization_id_fkey";

-- AddForeignKey
ALTER TABLE "organization_facilities" ADD CONSTRAINT "organization_facilities_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
