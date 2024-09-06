-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_organization_file_id_fkey";

-- AlterTable
ALTER TABLE "attribute_assurances" ADD COLUMN     "organization_filesId" TEXT;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "metadata" JSONB;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_organization_filesId_fkey" FOREIGN KEY ("organization_filesId") REFERENCES "organization_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
