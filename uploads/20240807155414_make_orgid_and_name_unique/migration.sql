/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,name]` on the table `claims` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "claims_name_key";

-- AlterTable
ALTER TABLE "claims" ADD COLUMN     "organization_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "claims_organization_id_name_key" ON "claims"("organization_id", "name");
