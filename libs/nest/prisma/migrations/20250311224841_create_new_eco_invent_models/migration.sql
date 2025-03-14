/*
  Warnings:

  - You are about to drop the column `value` on the `emission_factors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[activity_name,name]` on the table `emission_factors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "emission_factors_name_key";

-- AlterTable
ALTER TABLE "emission_factors" DROP COLUMN "value",
ADD COLUMN     "activity_name" TEXT,
ADD COLUMN     "ecoinvent_classification_name" TEXT,
ADD COLUMN     "impact_category_name" TEXT,
ADD COLUMN     "impact_method_name" TEXT,
ADD COLUMN     "impact_unit_name" TEXT,
ADD COLUMN     "isic_classification" TEXT,
ADD COLUMN     "no_lt" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "ecoinvent_activities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parent_activity_id" TEXT,
    "ecoinvent_classification_name" TEXT NOT NULL,
    "isic_classification" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ecoinvent_activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ecoinvent_activities_parent_activity_id_idx1" ON "ecoinvent_activities"("parent_activity_id");

-- CreateIndex
CREATE INDEX "ecoinvent_activities_ecoinvent_classification_name_idx1" ON "ecoinvent_activities"("ecoinvent_classification_name");

-- CreateIndex
CREATE INDEX "ecoinvent_activities_isic_classification_idx1" ON "ecoinvent_activities"("isic_classification");

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_activities_name_key" ON "ecoinvent_activities"("name");

-- CreateIndex
CREATE INDEX "emission_factors_isic_classification_idx1" ON "emission_factors"("isic_classification");

-- CreateIndex
CREATE INDEX "emission_factors_ecoinvent_classification_name_idx1" ON "emission_factors"("ecoinvent_classification_name");

-- CreateIndex
CREATE INDEX "emission_factors_impact_method_name_idx1" ON "emission_factors"("impact_method_name");

-- CreateIndex
CREATE INDEX "emission_factors_impact_category_name_idx1" ON "emission_factors"("impact_category_name");

-- CreateIndex
CREATE INDEX "emission_factors_no_lt_idx1" ON "emission_factors"("no_lt");

-- CreateIndex
CREATE INDEX "emission_factors_activity_name_idx1" ON "emission_factors"("activity_name");

-- CreateIndex
CREATE UNIQUE INDEX "emission_factors_activity_name_name_key" ON "emission_factors"("activity_name", "name");

-- AddForeignKey
ALTER TABLE "ecoinvent_activities" ADD CONSTRAINT "ecoinvent_activities_parent_activity_id_fkey" FOREIGN KEY ("parent_activity_id") REFERENCES "ecoinvent_activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
