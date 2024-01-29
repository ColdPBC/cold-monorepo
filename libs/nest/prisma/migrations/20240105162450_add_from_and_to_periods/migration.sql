/*
  Warnings:

  - You are about to drop the column `recorded_at` on the `emissions` table. All the data in the column will be lost.
  - Added the required column `period_from` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_to` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "emissions_categories" ADD VALUE 'NATURAL_GAS';

-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "recorded_at",
ADD COLUMN     "period_from" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "period_to" TIMESTAMP(3) NOT NULL;
