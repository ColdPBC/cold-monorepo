-- CreateEnum
CREATE TYPE "processing_status" AS ENUM ('IMPORT_COMPLETE', 'PROCESSING_ERROR', 'MANUAL_REVIEW', 'AI_PROCESSING');

-- AlterTable
ALTER TABLE "organization_files" ADD COLUMN     "processing_status" "processing_status";

-- CreateIndex
CREATE INDEX "organization_files_organization_id_type_idx1" ON "organization_files"("organization_id", "type", "processing_status");
