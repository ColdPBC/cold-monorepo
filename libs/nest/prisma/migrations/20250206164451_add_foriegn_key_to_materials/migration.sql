-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill data

UPDATE materials m
SET organization_facility_id = ms.supplier_id
FROM material_suppliers ms
WHERE m.id = ms.material_id
  AND m.organization_facility_id IS NULL;
