-- DropForeignKey
ALTER TABLE "vector_records" DROP CONSTRAINT "vector_records_organization_file_id_fkey";

-- AddForeignKey
ALTER TABLE "vector_records" ADD CONSTRAINT "vector_records_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
