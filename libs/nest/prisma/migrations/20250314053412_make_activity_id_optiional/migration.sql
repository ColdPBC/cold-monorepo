/*
  Warnings:

  - Made the column `ecoinvent_activity_id` on table `ecoinvent_activity_impacts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `impact_category_id` on table `ecoinvent_activity_impacts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `impact_unit_name` on table `ecoinvent_activity_impacts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ecoinvent_activity_impacts" ALTER COLUMN "ecoinvent_activity_id" SET NOT NULL,
ALTER COLUMN "impact_category_id" SET NOT NULL,
ALTER COLUMN "impact_value" DROP DEFAULT,
ALTER COLUMN "impact_unit_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "emission_factors" ALTER COLUMN "value" DROP DEFAULT;
