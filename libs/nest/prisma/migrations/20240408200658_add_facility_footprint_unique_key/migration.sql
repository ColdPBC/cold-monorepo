/*
  Warnings:

  - A unique constraint covering the columns `[facility_id,type,value]` on the table `facility_footprints` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "facility_footprints_facility_id_value_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "facility_footprints_facility_id_type_value_key" ON "facility_footprints"("facility_id", "type", "value");
