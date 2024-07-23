-- AlterTable
ALTER TABLE "organization_files" ALTER COLUMN "type" SET DEFAULT 'OTHER';

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_certification_id_fkey" FOREIGN KEY ("certification_id") REFERENCES "certifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_name_fkey" FOREIGN KEY ("organization_name") REFERENCES "organizations"("name") ON DELETE CASCADE ON UPDATE CASCADE;
