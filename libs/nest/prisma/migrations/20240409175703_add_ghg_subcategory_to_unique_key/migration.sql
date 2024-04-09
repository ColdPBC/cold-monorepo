/*
  Warnings:

  - A unique constraint covering the columns `[ghg_category,ghg_subcategory,name]` on the table `emission_scopes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ghg_category,ghg_subcategory,label]` on the table `emission_scopes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "emission_scopes_ghg_category_label_key";

-- DropIndex
DROP INDEX "emission_scopes_ghg_category_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "emission_scopes_ghg_category_ghg_subcategory_name_key" ON "emission_scopes"("ghg_category", "ghg_subcategory", "name");

-- CreateIndex
CREATE UNIQUE INDEX "emission_scopes_ghg_category_ghg_subcategory_label_key" ON "emission_scopes"("ghg_category", "ghg_subcategory", "label");
