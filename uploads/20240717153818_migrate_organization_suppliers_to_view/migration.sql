/*
  Warnings:

  - You are about to drop the column `address_line_1` on the `organization_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `organization_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `state_province` on the `organization_facilities` table. All the data in the column will be lost.
  - You are about to drop the `organization_suppliers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "organization_suppliers" DROP CONSTRAINT "organization_suppliers_organization_id_fkey";

-- AlterTable
ALTER TABLE "certification_claims" ADD COLUMN     "organization_suppliersId" TEXT;

-- AlterTable
ALTER TABLE "emissions" ADD COLUMN     "organization_suppliersId" TEXT;

-- AlterTable
ALTER TABLE "integrations" ADD COLUMN     "organization_suppliersId" TEXT;

-- AlterTable
ALTER TABLE "organization_facilities" DROP COLUMN "address_line_1",
DROP COLUMN "postal_code",
DROP COLUMN "state_province",
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "product_facilities" ADD COLUMN     "organization_suppliersId" TEXT;

-- AlterTable
ALTER TABLE "utility_bills" ADD COLUMN     "organization_suppliersId" TEXT;

-- DropTable
DROP TABLE "organization_suppliers";
