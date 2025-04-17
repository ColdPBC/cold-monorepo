/*
  Warnings:

  - Made the column `organization_file_id` on table `vector_records` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "vector_records" ALTER COLUMN "organization_file_id" SET NOT NULL;
