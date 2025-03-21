/*
  Warnings:

  - A unique constraint covering the columns `[material_id,eco_invent_activity_id,emission_factor_id]` on the table `material_emission_factors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "material_emission_factors_material_id_eco_invent_activity_i_key" ON "material_emission_factors"("material_id", "eco_invent_activity_id", "emission_factor_id");
