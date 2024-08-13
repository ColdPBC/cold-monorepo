
-- DropForeignKey
ALTER TABLE IF EXISTS organization_claims DROP CONSTRAINT IF EXISTS "organization_claims_certification_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS organization_claims DROP CONSTRAINT IF EXISTS "organization_claims_material_id_fkey" CASCADE;


-- DropForeignKey
ALTER TABLE IF EXISTS organization_claims DROP CONSTRAINT IF EXISTS "organization_claims_organization_facility_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS organization_claims DROP CONSTRAINT IF EXISTS "organization_claims_organization_file_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS organization_claims DROP CONSTRAINT IF EXISTS "organization_claims_organization_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS organization_claims DROP CONSTRAINT IF EXISTS "organization_claims_product_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS certification_claims DROP CONSTRAINT IF EXISTS "organization_claims_certification_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS certification_claims DROP CONSTRAINT IF EXISTS "organization_claims_material_id_fkey" CASCADE;


-- DropForeignKey
ALTER TABLE IF EXISTS certification_claims DROP CONSTRAINT IF EXISTS "organization_claims_organization_facility_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS certification_claims DROP CONSTRAINT IF EXISTS "organization_claims_organization_file_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS certification_claims DROP CONSTRAINT IF EXISTS "organization_claims_organization_id_fkey" CASCADE;

-- DropForeignKey
ALTER TABLE IF EXISTS certification_claims DROP CONSTRAINT IF EXISTS "organization_claims_product_id_fkey" CASCADE;

-- CreateIndex
DROP INDEX IF EXISTS "claims_name_key" CASCADE;
--CREATE UNIQUE INDEX "claims_name_key" ON "claims"("name");

-- CreateIndex
DROP INDEX IF EXISTS "certification_claims_certification_id_idx1" CASCADE;
--CREATE INDEX "organization_claims_certification_id_idx1" ON certification_claims("certification_id");

-- CreateIndex
DROP INDEX IF EXISTS "certification_claims_material_id_idx1" CASCADE;
--CREATE INDEX "certification_claims_material_id_idx1" ON certification_claims("material_id");

-- CreateIndex
DROP INDEX IF EXISTS "organization_claims_organization_facility_id_idx" CASCADE;
--CREATE INDEX "organization_claims_organization_facility_id_idx" ON certification_claims("organization_facility_id");

-- CreateIndex
DROP INDEX IF EXISTS "certification_claims_organization_file_id_idx1" CASCADE;
--CREATE INDEX "certification_claims_organization_file_id_idx1" ON certification_claims("organization_file_id");

-- CreateIndex
DROP INDEX IF EXISTS "certification_claims_organization_id_idx1" CASCADE;
--CREATE INDEX "certification_claims_organization_id_idx1" ON certification_claims("organization_id");

-- CreateIndex
DROP INDEX IF EXISTS "certification_claims_product_id_idx1" CASCADE;
--CREATE INDEX "certification_claims_product_id_idx1" ON certification_claims("product_id");

ALTER TABLE IF EXISTS claims DROP CONSTRAINT IF EXISTS "claims_pkey" CASCADE;
ALTER TABLE IF EXISTS organization_claims DROP CONSTRAINT IF EXISTS "organization_claims_pkey" CASCADE;


-- DROP/CreateTable
DROP TABLE IF EXISTS organization_claims;
DROP TABLE IF EXISTS "claims";

CREATE TABLE "organization_claims" (
                                     "id" TEXT NOT NULL,
                                     "certification_id" TEXT NOT NULL,
                                     "organization_facility_id" TEXT,
                                     "organization_file_id" TEXT NOT NULL,
                                     "issued_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                     "effective_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                     "updated_at" TIMESTAMP(3) NOT NULL,
                                     "deleted" BOOLEAN NOT NULL DEFAULT false,
                                     "material_id" TEXT,
                                     "product_id" TEXT,
                                     "organization_id" TEXT NOT NULL
);

-- CreateTable

CREATE TABLE "claims" (
                        "id" TEXT NOT NULL,
                        "name" TEXT NOT NULL,
                        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        "updated_at" TIMESTAMP(3) NOT NULL,
                        "deleted" BOOLEAN NOT NULL DEFAULT false,
                        "level" "certification_level" NOT NULL,
                        "type" "certification_types" NOT NULL,
                        CONSTRAINT "claims_pkey" PRIMARY KEY ("id")
);

-- Ensure the columns match between the INSERT and SELECT statements
INSERT INTO claims (id, name, created_at, updated_at, deleted, level, type)
SELECT id, name, created_at, updated_at, deleted, level, type
FROM certifications;

-- Ensure the columns match between the INSERT and SELECT statements
INSERT INTO certification_claims (id, certification_id, organization_facility_id, organization_file_id, issued_date, effective_date, created_at, updated_at, deleted, material_id, product_id, organization_id)
SELECT id, certification_id, organization_facility_id, organization_file_id, issued_date, effective_date, created_at, updated_at, deleted, material_id, product_id, organization_id
FROM certification_claims;

create or replace view organization_claims_view as
select
  ofac.id as facility_id,
  ofac.name as facility_name,
  ofac.address_line_1 as address_line_1,
  ofac.address_line_2 as address_line_2,
  ofac.city as city,
  ofac.state_province as state_province,
  ofac.postal_code as postal_code,
  ofac.country as country,
  ofac.supplier,
  c.id as claim_id,
  c.name as claim_name,
  c.level as claim_level,
  c.type as claim_type,
  of.id as organization_file_id,
  of.original_name as organization_file_name,
  of.type as organization_file_type,
  of.mimetype,
  of.effective_start_date as effective_start_date,
  of.effective_end_date as effective_end_date,
  of.expires_at,
  o.name as organization_name
from organization_facilities ofac
       JOIN organizations o ON ofac.organization_id = o.id
       LEFT JOIN certification_claims cc ON ofac.id = cc.organization_facility_id
       LEFT JOIN certifications c ON cc.certification_id = c.id
       LEFT JOIN organization_files of ON cc.organization_file_id = of.id
GROUP BY ofac.id, ofac.name, c.id, c.name, of.expires_at, of.effective_start_date, of.effective_end_date, c.level, c.type, of.id, of.original_name, of.mimetype, ofac.supplier, ofac.address_line_1, ofac.address_line_2, ofac.city, ofac.state_province, ofac.country, o.name
ORDER BY facility_name;

-- AddForeignKey
ALTER TABLE IF EXISTS organization_claims ADD CONSTRAINT "organization_claims_certification_id_fkey" FOREIGN KEY ("certification_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE IF EXISTS organization_claims ADD CONSTRAINT "organization_claims_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE IF EXISTS organization_claims ADD CONSTRAINT "organization_claims_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE IF EXISTS organization_claims ADD CONSTRAINT "organization_claims_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE IF EXISTS organization_claims ADD CONSTRAINT "organization_claims_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE IF EXISTS organization_claims ADD CONSTRAINT "organization_claims_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropTable
DROP TABLE IF EXISTS "certification_claims" CASCADE ;

-- DropTable
DROP TABLE IF EXISTS "certifications" CASCADE;

