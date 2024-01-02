/*
  Warnings:

  - You are about to drop the column `organization_id` on the `supported_utilities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "supported_utilities" DROP CONSTRAINT "supported_utilities_organization_id_fkey";

-- AlterTable
ALTER TABLE "supported_utilities" DROP COLUMN "organization_id";
