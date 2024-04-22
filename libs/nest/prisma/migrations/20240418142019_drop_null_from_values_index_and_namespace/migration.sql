
-- Drop invalid records
DELETE from vector_records where values is null;
DELETE from vector_records where index_name is null;
DELETE from vector_records where namespace is null;
-- AlterTable
ALTER TABLE "vector_records" ALTER COLUMN "values" SET NOT NULL,
ALTER COLUMN "index_name" SET NOT NULL,
ALTER COLUMN "namespace" SET NOT NULL;
