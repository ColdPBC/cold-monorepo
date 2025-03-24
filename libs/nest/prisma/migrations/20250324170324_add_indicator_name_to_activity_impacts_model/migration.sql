/*
  Warnings:

  - A unique constraint covering the columns `[ecoinvent_activity_id,impact_category_id,impact_method_name,indicator_name]` on the table `ecoinvent_activity_impacts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ecoinvent_activity_impacts_ecoinvent_activity_id_impact_cat_key";

-- AlterTable
ALTER TABLE "ecoinvent_activity_impacts" ADD COLUMN     "indicator_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_activity_impacts_ecoinvent_activity_id_impact_cat_key" ON "ecoinvent_activity_impacts"("ecoinvent_activity_id", "impact_category_id", "impact_method_name", "indicator_name");
