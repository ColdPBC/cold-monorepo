-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_file_id_fkey";

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_name_fkey";

-- AlterTable
ALTER TABLE "organization_files" ALTER COLUMN "type" DROP DEFAULT;
