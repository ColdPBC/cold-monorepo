/*
  Warnings:

  - You are about to drop the column `organization_attributes_id` on the `attribute_assurances` table. All the data in the column will be lost.
  - You are about to drop the column `organization_filesId` on the `attribute_assurances` table. All the data in the column will be lost.
  - You are about to drop the `organization_attributes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sustainability_attribute_id` to the `attribute_assurances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_organization_attributes_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_organization_filesId_fkey";

-- DropForeignKey
ALTER TABLE "organization_attributes" DROP CONSTRAINT "organization_attributes_material_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_attributes" DROP CONSTRAINT "organization_attributes_organization_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_attributes" DROP CONSTRAINT "organization_attributes_organization_file_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_attributes" DROP CONSTRAINT "organization_attributes_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_attributes" DROP CONSTRAINT "organization_attributes_product_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_attributes" DROP CONSTRAINT "organization_attributes_sustainability_attribute_id_fkey";

-- DropIndex
DROP INDEX "attribute_assurances_org_claim_id_idx1";

-- AlterTable
ALTER TABLE "attribute_assurances" DROP COLUMN "organization_attributes_id",
DROP COLUMN "organization_filesId",
ADD COLUMN     "material_id" TEXT,
ADD COLUMN     "organization_facility_id" TEXT,
ADD COLUMN     "product_id" TEXT,
ADD COLUMN     "sustainability_attribute_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "organization_attributes";

-- CreateIndex
CREATE INDEX "attribute_assurances_attribute_id_idx1" ON "attribute_assurances"("sustainability_attribute_id");

-- CreateIndex
CREATE INDEX "attribute_assurances_organization_facility_id_idx" ON "attribute_assurances"("organization_facility_id");

-- CreateIndex
CREATE INDEX "attribute_assurances_product_id_idx1" ON "attribute_assurances"("product_id");

-- CreateIndex
CREATE INDEX "attribute_assurancess_material_id_idx1" ON "attribute_assurances"("material_id");

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
