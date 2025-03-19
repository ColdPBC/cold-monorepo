/*
  Warnings:

  - You are about to drop the column `emission_factor_id` on the `materials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `emission_factors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "materials" DROP CONSTRAINT "materials_emission_factor_id_fkey";

-- AlterTable
ALTER TABLE "emission_factors" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "materials" DROP COLUMN "emission_factor_id";

-- CreateTable
CREATE TABLE "material_emission_factors" (
    "id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "emission_factor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_emission_factors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "material_emission_factors_emission_factor_id_idx1" ON "material_emission_factors"("emission_factor_id");

-- CreateIndex
CREATE INDEX "material_emission_factors_material_id_idx1" ON "material_emission_factors"("material_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_emission_factors_material_id_emission_factor_id_key" ON "material_emission_factors"("material_id", "emission_factor_id");

-- CreateIndex
CREATE UNIQUE INDEX "emission_factors_name_key" ON "emission_factors"("name");

-- AddForeignKey
ALTER TABLE "material_emission_factors" ADD CONSTRAINT "material_emission_factors_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_emission_factors" ADD CONSTRAINT "material_emission_factors_emission_factor_id_fkey" FOREIGN KEY ("emission_factor_id") REFERENCES "emission_factors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
