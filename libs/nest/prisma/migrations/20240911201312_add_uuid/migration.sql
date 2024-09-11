/*
  Warnings:

  - The primary key for the `attribute_assurances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `material_suppliers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `materials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product_materials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sustainability_attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `attribute_assurances` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `material_suppliers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `materials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `product_materials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `sustainability_attributes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

ALTER TABLE "material_suppliers" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "material_suppliers" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "materials" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "materials" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "product_materials" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "product_materials" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "attribute_assurances" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "attribute_assurances" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "sustainability_attributes" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "sustainability_attributes" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
