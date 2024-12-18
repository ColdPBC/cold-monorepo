-- AlterTable
ALTER TABLE "material_classification" ADD COLUMN "core_classification_id" INTEGER;

-- CreateTable
CREATE TABLE "core_classifications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "core_classifications_pkey" PRIMARY KEY ("id")
);

INSERT INTO core_classifications (id, name, created_at, updated_at)
    VALUES (1, 'Metal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (2, 'Coating and Lamination', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (3, 'Plastic', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (4, 'Textile', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (5, 'Foam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (6, 'Elastomer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (7, 'Wool', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (8, 'Down', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (9, 'Wood', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (10, 'Ceramic', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (11, 'Composite', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (12, 'Glass', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (13, 'Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (14, 'Plant-Based Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (15, 'Synthetic Leather', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (16, 'Animal-Based Leather Alternative', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           (17, 'Packaging', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

UPDATE material_classification set core_classification_id = 1 WHERE name = 'Gold';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Platinum';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Magnesium';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Titanium';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Brass';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Silver';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Tin';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Nickel';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Aluminum';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Chromium';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Copper';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Zinc';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Steel';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Iron';
UPDATE material_classification set core_classification_id = 1 WHERE name = 'Lead';

UPDATE material_classification set core_classification_id = 2 WHERE name = 'Microporous Coating';
UPDATE material_classification set core_classification_id = 2 WHERE name = 'Monolithic Coating';
UPDATE material_classification set core_classification_id = 2 WHERE name = 'BiComponent Laminate';
UPDATE material_classification set core_classification_id = 2 WHERE name = 'BiComponent Coating';
UPDATE material_classification set core_classification_id = 2 WHERE name = 'Monolithic Laminate';
UPDATE material_classification set core_classification_id = 2 WHERE name = 'Microporous Laminate';

UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polypropylene insulation';
UPDATE material_classification set core_classification_id = 7 WHERE name = 'Sheep Wool insulation';

UPDATE material_classification set core_classification_id = 13 WHERE name = 'Bovine (cow) leather';
UPDATE material_classification set core_classification_id = 13 WHERE name = 'Reptile leather';
UPDATE material_classification set core_classification_id = 13 WHERE name = 'Pig leather';
UPDATE material_classification set core_classification_id = 13 WHERE name = 'Goat leather';
UPDATE material_classification set core_classification_id = 13 WHERE name = 'Kangaroo leather';

UPDATE material_classification set core_classification_id = 15 WHERE name = 'Polyurethane (PU) synthetic leather';

UPDATE material_classification set core_classification_id = 16 WHERE name = 'Animal-based Leather Alternatives';
UPDATE material_classification set core_classification_id = 14 WHERE name = 'Plant-based Leather Alternatives';

UPDATE material_classification set core_classification_id = 4 WHERE name = 'Silk fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Alpaca Fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Wool fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Carbon fiber fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Modal fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Acetate, Triacetate fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Viscose/Rayon fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Acrylic fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Nylon fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Lyocell fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Hemp fiber fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Flax fiber fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Polyurethane (PU) fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Polytrimethylene terephthalate (PTT) fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Jute fiber fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Aramid fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Polyester fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Polylactic Acid (PLA) fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Cotton fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Elastane/Spandex fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Novel Polysaccharide fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Polypropylene (PP) fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Polyethylene (PE) Fabric';
UPDATE material_classification set core_classification_id = 4 WHERE name = 'Glass fiber fabric';

UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polytetrafluoroethylene (PTFE) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Nylon/Polyamide (PA) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Silicone plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Thermoplastic Polyurethane (TPU) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Epoxy plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polycarbonate (PC) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Poly(methyl methacrylate) (PMMA) (Acrylic) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polyoxymethylene (POM) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Acrylonitrile butadiene styrene (ABS) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Thermoset polyurethane (PU) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polysterene (PS) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polyester plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polyvinyl chloride (PVC) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polylactic Acid (PLA) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polyvinyl Acetate (PVA) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polypropylene (PP) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polyethylene (PE) plastic';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Plastic fillers';

UPDATE material_classification set core_classification_id = 5 WHERE name = 'Polyvinyl chloride (PVC) foam';
UPDATE material_classification set core_classification_id = 5 WHERE name = 'Typical EVA shoe compound';
UPDATE material_classification set core_classification_id = 5 WHERE name = 'Polyethylene terephthalate (PET) foam';
UPDATE material_classification set core_classification_id = 5 WHERE name = 'Polyethylene (PE) foam';
UPDATE material_classification set core_classification_id = 5 WHERE name = 'Expanded Polystyrene (EPS) foam';
UPDATE material_classification set core_classification_id = 5 WHERE name = 'Polyurethane (PU) foam';
UPDATE material_classification set core_classification_id = 5 WHERE name = 'Ethylene-vinyl acetate (EVA) foam';

UPDATE material_classification set core_classification_id = 6 WHERE name = 'Silicone rubber';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Thermoplastic polyurethane (TPU) rubber';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Thermoplastic elastomer (TPE)';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Butyl rubber';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Thermoset polyurethane (PU) rubber';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Foamed rubber';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Nitrile Rubber (NBR)';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Ethylene Propylene Diene Elastomer (EPDM)';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Styrene-butadiene rubber (SBR)';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Isoprene Rubber (IR)';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Polybutadiene rubber (BR)';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Typical footwear rubber compound';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Chloroprene rubber (Neoprene)';
UPDATE material_classification set core_classification_id = 6 WHERE name = 'Natural Rubber (NR)';

UPDATE material_classification set core_classification_id = 3 WHERE name = 'Polyester insulation';
UPDATE material_classification set core_classification_id = 3 WHERE name = 'Goose Down Insulation';
UPDATE material_classification set core_classification_id = 8 WHERE name = 'Duck Down insulation';

UPDATE material_classification set core_classification_id = 7 WHERE name = 'Cardboard';
UPDATE material_classification set core_classification_id = 7 WHERE name = 'Wood';
-- AddForeignKey
ALTER TABLE "material_classification" ADD CONSTRAINT "material_classification_core_classification_id_fkey" FOREIGN KEY ("core_classification_id") REFERENCES "core_classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
