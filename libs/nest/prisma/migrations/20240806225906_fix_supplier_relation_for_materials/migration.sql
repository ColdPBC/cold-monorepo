-- AlterTable
ALTER TABLE "organization_facilities" ALTER COLUMN "supplier" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "material_suppliers" ADD CONSTRAINT "material_suppliers_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
