/*
  Warnings:

  - You are about to drop the column `organization_name` on the `certification_claims` table. All the data in the column will be lost.
  - You are about to drop the column `organization_name` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `organization_name` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "certification_claims" DROP COLUMN "organization_name";

-- AlterTable
ALTER TABLE "materials" DROP COLUMN "organization_name";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "organization_name";
