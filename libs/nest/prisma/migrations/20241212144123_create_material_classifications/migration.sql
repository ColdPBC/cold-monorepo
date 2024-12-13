/*
  Warnings:

  - You are about to drop the column `core_material_name` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the `core_material_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "materials" DROP CONSTRAINT "materials_core_material_name_fkey";

-- AlterTable
ALTER TABLE "materials" DROP COLUMN "core_material_name",
ADD COLUMN     "material_classification_id" INTEGER;

-- AlterTable
ALTER TABLE "sustainability_attributes" ADD COLUMN     "material_classification_id" INTEGER;

-- DropTable
DROP TABLE "core_material_types";

-- CreateTable
CREATE TABLE "material_classification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_classification_pkey" PRIMARY KEY ("id")
);

-- Insert Data
INSERT INTO material_classification (name, category, created_at, updated_at)
VALUES ('Gold', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Platinum', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Silk fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Alpaca Fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Silver', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Wool fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Sheep Wool insulation', 'Insulation Material', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Magnesium', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Titanium', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Tin', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Carbon fiber fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polytetrafluoroethylene (PTFE) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Modal fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Acetate, Triacetate fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Viscose/Rayon fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Acrylic fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Bovine (cow) leather', 'Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Nylon fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Lyocell fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Nickel', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Hemp fiber fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Flax fiber fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyurethane (PU) fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polytrimethylene terephthalate (PTT) fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Jute fiber fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Aramid fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Pig leather', 'Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Goat leather', 'Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyester fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polylactic Acid (PLA) fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Kangaroo leather', 'Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Aluminum', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Cotton fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Elastane/Spandex fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Chromium', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Nylon/Polyamide (PA) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Silicone plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Silicone rubber', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyurethane (PU) synthetic leather', 'Synthetic Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Thermoplastic Polyurethane (TPU) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Thermoplastic polyurethane (TPU) rubber', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Epoxy plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Thermoplastic elastomer (TPE)', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Novel Polysaccharide fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polycarbonate (PC) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polypropylene (PP) fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Poly(methyl methacrylate) (PMMA) (Acrylic) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Butyl rubber', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Plant-based Leather Alternatives', 'Leather Alternatives', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Thermoset polyurethane (PU) rubber', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyoxymethylene (POM) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Foamed rubber', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Expanded Polystyrene (EPS) foam', 'Foam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyethylene (PE) Fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyurethane (PU) foam', 'Foam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Nitrile Rubber (NBR)', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Acrylonitrile butadiene styrene (ABS) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Ethylene Propylene Diene Elastomer (EPDM)', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Monolithic Laminate', 'Coatings and Laminations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Microporous Laminate', 'Coatings and Laminations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Ethylene-vinyl acetate (EVA) foam', 'Foam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Styrene-butadiene rubber (SBR)', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Thermoset polyurethane (PU) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Typical EVA shoe compound', 'Foam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyethylene terephthalate (PET) foam', 'Foam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Isoprene Rubber (IR)', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polybutadiene rubber (BR)', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyvinyl chloride (PVC) foam', 'Foam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Animal-based Leather Alternatives', 'Leather Alternatives', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Copper', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Typical footwear rubber compound', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polysterene (PS) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Glass fiber fabric', 'Textiles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyethylene (PE) foam', 'Foam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Chloroprene rubber (Neoprene)', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyester plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyvinyl chloride (PVC) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polylactic Acid (PLA) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Microporous Coating', 'Coatings and Laminations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Monolithic Coating', 'Coatings and Laminations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyvinyl Acetate (PVA) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polypropylene (PP) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyethylene (PE) plastic', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('BiComponent Laminate', 'Coatings and Laminations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polyester insulation', 'Insulation Material', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Plastic fillers', 'Plastics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Polypropylene insulation', 'Insulation Material', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('BiComponent Coating', 'Coatings and Laminations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Zinc', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Reptile leather', 'Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Steel', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Natural Rubber (NR)', 'Rubbers/Elastomers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Iron', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Lead', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Goose Down Insulation', 'Insulation Material', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Duck Down insulation', 'Insulation Material', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Cardboard', 'Wood-based Materials', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Wood', 'Wood-based Materials', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Brass', 'Metals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- CreateIndex
CREATE INDEX "material_classification_category_idx1" ON "material_classification"("category");

-- CreateIndex
CREATE INDEX "material_classification_name_idx1" ON "material_classification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "material_classification_category_name_key" ON "material_classification"("category", "name");

-- AddForeignKey
ALTER TABLE "sustainability_attributes" ADD CONSTRAINT "sustainability_attributes_material_classification_id_fkey" FOREIGN KEY ("material_classification_id") REFERENCES "material_classification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_material_classification_id_fkey" FOREIGN KEY ("material_classification_id") REFERENCES "material_classification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
