/*
  Warnings:

  - You are about to drop the column `address_line_1` on the `organization_facilities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organization_facilities" DROP COLUMN "address_line_1",
ADD COLUMN     "address" TEXT;
