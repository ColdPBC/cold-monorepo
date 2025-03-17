/*
  Warnings:

  - A unique constraint covering the columns `[name,location]` on the table `ecoinvent_activities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ecoinvent_activities_name_key";

-- CreateIndex
CREATE INDEX "ecoinvent_activities_location_idx1" ON "ecoinvent_activities"("location");

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_activities_name_location_key" ON "ecoinvent_activities"("name", "location");
