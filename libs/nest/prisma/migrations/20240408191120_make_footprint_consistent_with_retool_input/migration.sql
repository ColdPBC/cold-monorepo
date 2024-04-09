/*
  Warnings:

  - You are about to drop the column `period` on the `facility_footprints` table. All the data in the column will be lost.
  - You are about to drop the column `period_type` on the `facility_footprints` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[facility_id,value,type]` on the table `facility_footprints` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `facility_footprints` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex

-- AlterTable
ALTER TABLE "facility_footprints" DROP COLUMN "period",
DROP COLUMN "period_type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'year',
ADD COLUMN     "value" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "facility_footprints_facility_id_value_type_key" ON "facility_footprints"("facility_id", "value", "type");
