/*
  Warnings:

  - Added the required column `title` to the `compliance_definitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compliance_definitions" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organization_files" ADD COLUMN     "checksum" TEXT;
