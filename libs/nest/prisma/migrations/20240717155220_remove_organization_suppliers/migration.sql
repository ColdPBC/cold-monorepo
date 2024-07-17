/*
  Warnings:

  - You are about to drop the column `address` on the `organization_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `organization_facilities` table. All the data in the column will be lost.
  - You are about to drop the `organization_suppliers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "organization_suppliers" DROP CONSTRAINT "organization_suppliers_organization_id_fkey";

-- AlterTable
ALTER TABLE "organization_facilities" DROP COLUMN "address",
DROP COLUMN "state";

-- DropTable
DROP TABLE "organization_suppliers";
