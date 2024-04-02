/*
  Warnings:

  - You are about to drop the column `organization_compliance_id` on the `vector_records` table. All the data in the column will be lost.
  - Added the required column `organization_file_id` to the `vector_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `vector_records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vector_records" DROP CONSTRAINT "vector_records_organization_compliance_id_fkey";

-- AlterTable
ALTER TABLE "vector_records" DROP COLUMN "organization_compliance_id",
ADD COLUMN     "organization_file_id" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vector_records" ADD CONSTRAINT "vector_records_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vector_records" ADD CONSTRAINT "vector_records_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
