/*
  Warnings:

  - A unique constraint covering the columns `[ghg_subcategory,ghg_category,label]` on the table `emission_scopes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "facility_footprints" (
    "id" TEXT NOT NULL,
    "facility_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "footprint" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facility_footprints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emission_scopes_ghg_subcategory_ghg_category_label_key" ON "emission_scopes"("ghg_subcategory", "ghg_category", "label");
