/*
  Warnings:

  - Added the required column `value` to the `emission_factors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emission_factors" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
