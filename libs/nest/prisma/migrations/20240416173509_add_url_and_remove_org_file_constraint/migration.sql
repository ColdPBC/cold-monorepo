-- AlterTable
ALTER TABLE "vector_records" ADD COLUMN "url" TEXT,
ALTER COLUMN "organization_file_id" DROP NOT NULL;
