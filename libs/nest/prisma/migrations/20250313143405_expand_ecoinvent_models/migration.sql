/*
  Warnings:

  - You are about to drop the column `activity_name` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the column `ecoinvent_classification_name` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the column `impact_category_name` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the column `impact_method_name` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the column `impact_unit_name` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the column `isic_classification` on the `emission_factors` table. All the data in the column will be lost.
  - You are about to drop the column `no_lt` on the `emission_factors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ecoinvent_activity_id,ecoinvent_classification_id]` on the table `ecoinvent_activity_classifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `emission_factors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eco_invent_activity_id` to the `material_emission_factors` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "emission_factors_activity_name_idx1";

-- DropIndex
DROP INDEX "emission_factors_activity_name_name_key";

-- DropIndex
DROP INDEX "emission_factors_ecoinvent_classification_name_idx1";

-- DropIndex
DROP INDEX "emission_factors_impact_category_name_idx1";

-- DropIndex
DROP INDEX "emission_factors_impact_method_name_idx1";

-- DropIndex
DROP INDEX "emission_factors_isic_classification_idx1";

-- DropIndex
DROP INDEX "emission_factors_name_idx1";

-- DropIndex
DROP INDEX "emission_factors_no_lt_idx1";

-- DropIndex
DROP INDEX "material_emission_factors_emission_factor_id_idx1";

-- DropIndex
DROP INDEX "material_emission_factors_material_id_emission_factor_id_key";

-- AlterTable
ALTER TABLE "ecoinvent_activities" ADD COLUMN     "raw_data" JSONB;

-- AlterTable
ALTER TABLE "emission_factors" DROP COLUMN "activity_name",
DROP COLUMN "ecoinvent_classification_name",
DROP COLUMN "impact_category_name",
DROP COLUMN "impact_method_name",
DROP COLUMN "impact_unit_name",
DROP COLUMN "isic_classification",
DROP COLUMN "no_lt",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "material_emission_factors" ADD COLUMN     "eco_invent_activity_id" TEXT;

-- CreateTable
CREATE TABLE "ecoinvent_impact_categories" (
    "id" TEXT NOT NULL,
    "impact_method" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ecoinvent_impact_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ecoinvent_activity_impacts" (
    "id" TEXT NOT NULL,
    "ecoinvent_activity_id" TEXT,
    "impact_category_id" TEXT,
    "impact_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "impact_unit_name" TEXT,

    CONSTRAINT "ecoinvent_activity_impacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ecoinvent_impact_categories_impact_method_idx1" ON "ecoinvent_impact_categories"("impact_method");

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_impact_categories_name_key" ON "ecoinvent_impact_categories"("name");

-- CreateIndex
CREATE INDEX "ecoinvent_activity_impacts_impact_category_id_idx1" ON "ecoinvent_activity_impacts"("impact_category_id");

-- CreateIndex
CREATE INDEX "ecoinvent_activity_impacts_ecoinvent_activity_id_idx1" ON "ecoinvent_activity_impacts"("ecoinvent_activity_id");

-- CreateIndex
CREATE INDEX "ecoinvent_activity_impacts_impact_value_idx1" ON "ecoinvent_activity_impacts"("impact_value");

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_activity_impacts_ecoinvent_activity_id_impact_cat_key" ON "ecoinvent_activity_impacts"("ecoinvent_activity_id", "impact_category_id");

-- CreateIndex
CREATE INDEX "ecoinvent_activity_classifications_ecoinvent_activity_id_idx1" ON "ecoinvent_activity_classifications"("ecoinvent_activity_id");

-- CreateIndex
CREATE INDEX "ecoinvent_activity_classification_id_idx1" ON "ecoinvent_activity_classifications"("ecoinvent_classification_id");

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_activity_classifications_ecoinvent_activity_id_ec_key" ON "ecoinvent_activity_classifications"("ecoinvent_activity_id", "ecoinvent_classification_id");

-- CreateIndex
CREATE INDEX "emission_factors_value_idx1" ON "emission_factors"("value");

-- CreateIndex
CREATE INDEX "material_emission_factors_activity_id_idx1" ON "material_emission_factors"("eco_invent_activity_id");

-- AddForeignKey
ALTER TABLE "material_emission_factors" ADD CONSTRAINT "material_emission_factors_eco_invent_activity_id_fkey" FOREIGN KEY ("eco_invent_activity_id") REFERENCES "ecoinvent_activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ecoinvent_activity_impacts" ADD CONSTRAINT "ecoinvent_activity_impacts_impact_category_id_fkey" FOREIGN KEY ("impact_category_id") REFERENCES "ecoinvent_impact_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ecoinvent_activity_impacts" ADD CONSTRAINT "ecoinvent_activity_impacts_ecoinvent_activity_id_fkey" FOREIGN KEY ("ecoinvent_activity_id") REFERENCES "ecoinvent_activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
