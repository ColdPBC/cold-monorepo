/*
  Warnings:

  - You are about to drop the column `product_category_heirarchy` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "product_category_heirarchy",
ADD COLUMN     "product_category" TEXT,
ADD COLUMN     "product_subcategory" TEXT;

-- CreateIndex
CREATE INDEX "brand_category_idx1" ON "products"("product_category");

-- CreateIndex
CREATE INDEX "brand_subcategory_idx1" ON "products"("product_subcategory");
