/*
  Warnings:

  - You are about to drop the column `supplier_facility_id` on the `certification_claims` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_facility_id` on the `product_facilities` table. All the data in the column will be lost.
  - You are about to drop the `supplier_facilities` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `organization_facility_id` on table `certification_claims` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `organization_facility_id` to the `organization_suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_facility_id` to the `product_facilities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_supplier_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "product_facilities" DROP CONSTRAINT "product_facilities_supplier_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_facilities" DROP CONSTRAINT "supplier_facilities_organization_supplier_id_fkey";

-- AlterTable
ALTER TABLE "certification_claims" DROP COLUMN "supplier_facility_id",
ALTER COLUMN "organization_facility_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "organization_suppliers" ADD COLUMN     "organization_facility_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_facilities" DROP COLUMN "supplier_facility_id",
ADD COLUMN     "organization_facility_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "supplier_facilities";

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_facilities" ADD CONSTRAINT "product_facilities_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
