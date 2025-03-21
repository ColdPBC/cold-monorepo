/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `emission_factors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "emission_factors_name_idx1" ON "emission_factors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "emission_factors_name_key" ON "emission_factors"("name");
