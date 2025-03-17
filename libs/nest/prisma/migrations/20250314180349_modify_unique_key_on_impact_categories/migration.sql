/*
  Warnings:

  - A unique constraint covering the columns `[name,impact_method]` on the table `ecoinvent_impact_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ecoinvent_impact_categories_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_impact_categories_name_impact_method_key" ON "ecoinvent_impact_categories"("name", "impact_method");
