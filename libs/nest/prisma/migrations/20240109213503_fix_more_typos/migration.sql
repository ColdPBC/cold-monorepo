/*
  Warnings:

  - You are about to drop the column `co2_calcuation_method` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `constituent_cases` on the `emissions` table. All the data in the column will be lost.
  - Added the required column `co2_calculation_method` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `constituent_gases` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "co2_calcuation_method",
DROP COLUMN "constituent_cases",
ADD COLUMN     "co2_calculation_method" TEXT NOT NULL,
ADD COLUMN     "constituent_gases" JSONB NOT NULL;
