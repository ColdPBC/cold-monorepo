/*
  Warnings:

  - You are about to drop the column `address` on the `organization_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `organization_facilities` table. All the data in the column will be lost.
  - Made the column `name` on table `organization_facilities` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "facility_types" AS ENUM ('OFFICE', 'LOCATION', 'WAREHOUSE', 'DISTRIBUTION_CENTER', 'MANUFACTURING', 'OTHER');

-- CreateEnum
CREATE TYPE "certification_level" AS ENUM ('Organization', 'Supplier', 'Product', 'Material');

-- CreateEnum
CREATE TYPE "file_types" AS ENUM ('CERTIFICATE', 'TEST_RESULTS', 'STATEMENT', 'ASSESSMENT', 'POLICY', 'OTHER');

-- AlterTable
ALTER TABLE "organization_facilities" DROP COLUMN "address",
DROP COLUMN "state",
ADD COLUMN     "address_line_1" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "state_province" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "postal_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "organization_files" ADD COLUMN     "type" "file_types" NOT NULL DEFAULT 'OTHER';

-- CreateTable
CREATE TABLE "certifications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "document_url" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification_claims" (
    "id" TEXT NOT NULL,
    "certification_id" TEXT NOT NULL,
    "supplier_facility_id" TEXT,
    "organization_facility_id" TEXT,
    "organization_file_id" TEXT NOT NULL,
    "issued_date" TIMESTAMP(3) NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "issuer" TEXT NOT NULL,
    "certification_level" "certification_level" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "certification_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_suppliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "organization_suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_facilities" (
    "id" TEXT NOT NULL,
    "organization_supplier_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "city" TEXT,
    "state_province" TEXT,
    "postal_code" TEXT,
    "country" TEXT NOT NULL DEFAULT 'US',
    "metadata" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_facilities" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "supplier_facility_id" TEXT NOT NULL,

    CONSTRAINT "product_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_certification_id_fkey" FOREIGN KEY ("certification_id") REFERENCES "certifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_supplier_facility_id_fkey" FOREIGN KEY ("supplier_facility_id") REFERENCES "supplier_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_suppliers" ADD CONSTRAINT "organization_suppliers_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_facilities" ADD CONSTRAINT "supplier_facilities_organization_supplier_id_fkey" FOREIGN KEY ("organization_supplier_id") REFERENCES "organization_suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_facilities" ADD CONSTRAINT "product_facilities_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_facilities" ADD CONSTRAINT "product_facilities_supplier_facility_id_fkey" FOREIGN KEY ("supplier_facility_id") REFERENCES "supplier_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
