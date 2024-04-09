/*
  Warnings:

  - You are about to drop the column `footprint` on the `facility_footprints` table. All the data in the column will be lost.
  - Added the required column `emissions` to the `facility_footprints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `facility_footprints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "facility_footprints" DROP COLUMN "footprint",
ADD COLUMN     "emissions" JSONB NOT NULL,
ADD COLUMN     "period" INTEGER NOT NULL,
ADD COLUMN     "period_type" TEXT NOT NULL DEFAULT 'year';
