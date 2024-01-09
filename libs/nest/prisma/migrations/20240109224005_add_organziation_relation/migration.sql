/*
  Warnings:

  - Added the required column `organization_id` to the `utility_bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "utility_bills" ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "utility_bills" ADD CONSTRAINT "utility_bills_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
