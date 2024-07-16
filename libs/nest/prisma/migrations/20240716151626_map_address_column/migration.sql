/*
  Warnings:

  - You are about to drop the column `address_line_1` on the `organization_facilities` table. All the data in the column will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_facilities" DROP CONSTRAINT "product_facilities_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_organization_id_fkey";

-- AlterTable
ALTER TABLE "organization_facilities" DROP COLUMN "address_line_1",
ADD COLUMN     "address" TEXT;

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "organization_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "organization_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_products_name_key" ON "organization_products"("name");

-- AddForeignKey
ALTER TABLE "organization_products" ADD CONSTRAINT "organization_products_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_facilities" ADD CONSTRAINT "product_facilities_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "organization_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
