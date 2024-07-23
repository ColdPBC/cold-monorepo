/*
  Warnings:

  - You are about to drop the column `address` on the `organization_facilities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organization_facilities" DROP COLUMN "address",
ADD COLUMN     "address_line_1" TEXT;
