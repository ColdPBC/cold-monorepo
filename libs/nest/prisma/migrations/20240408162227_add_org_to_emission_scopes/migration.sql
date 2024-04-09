/*
  Warnings:

  - A unique constraint covering the columns `[ghg_category,name]` on the table `emission_scopes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "emission_scopes_ghg_subcategory_name_key";

-- AlterTable
ALTER TABLE "emission_scopes" ADD COLUMN     "organization_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "emission_scopes_ghg_category_name_key" ON "emission_scopes"("ghg_category", "name");

-- AddForeignKey
ALTER TABLE "emission_scopes" ADD CONSTRAINT "emission_scopes_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
