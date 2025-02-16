/*
  Warnings:

  - You are about to drop the column `emission_factorsId` on the `emissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "emissions" DROP CONSTRAINT "emissions_emission_factorsId_fkey";

-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "emission_factorsId";
