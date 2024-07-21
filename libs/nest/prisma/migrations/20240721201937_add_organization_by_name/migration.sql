/*
  Warnings:

  - You are about to drop the column `organization_id` on the `certification_claims` table. All the data in the column will be lost.
  - Added the required column `organization_name` to the `certification_claims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certification_claims" DROP COLUMN "organization_id",
ADD COLUMN     "organization_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_name_fkey" FOREIGN KEY ("organization_name") REFERENCES "organizations"("name") ON DELETE CASCADE ON UPDATE CASCADE;
