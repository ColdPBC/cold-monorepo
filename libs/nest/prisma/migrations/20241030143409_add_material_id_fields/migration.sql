/*
  Warnings:

  - Added the required column `brand_material_id` to the `materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desription` to the `materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_material_id` to the `materials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "brand_material_id" TEXT NOT NULL,
ADD COLUMN     "desription" TEXT NOT NULL,
ADD COLUMN     "supplier_material_id" TEXT NOT NULL;
