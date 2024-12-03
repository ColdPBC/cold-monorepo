/*
  Warnings:

  - The `uncertainty` column on the `climatiq_actvities` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "climatiq_actvities" DROP COLUMN "uncertainty",
ADD COLUMN     "uncertainty" INTEGER,
ALTER COLUMN "unit" DROP NOT NULL;
