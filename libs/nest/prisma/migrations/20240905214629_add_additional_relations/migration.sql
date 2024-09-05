/*
  Warnings:

  - You are about to drop the column `metadata` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "metadata";

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
