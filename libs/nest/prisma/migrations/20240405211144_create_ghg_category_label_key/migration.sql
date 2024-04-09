/*
  Warnings:

  - A unique constraint covering the columns `[ghg_category,label]` on the table `emission_scopes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "emission_scopes_ghg_subcategory_ghg_category_label_key";

-- CreateIndex
CREATE UNIQUE INDEX "emission_scopes_ghg_category_label_key" ON "emission_scopes"("ghg_category", "label");
