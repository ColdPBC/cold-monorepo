/*
  Warnings:

  - You are about to drop the column `custom` on the `compliance_definitions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "compliance_definitions" DROP COLUMN "custom",
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;
