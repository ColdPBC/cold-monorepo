/*
  Warnings:

  - You are about to drop the column `factor_calculation_orgin` on the `climatiq_actvities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "climatiq_actvities" DROP COLUMN "factor_calculation_orgin",
ADD COLUMN     "factor_calculation_origin" TEXT;
