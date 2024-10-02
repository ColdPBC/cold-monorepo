-- AlterTable
ALTER TABLE "products" ADD COLUMN     "supplier_id" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
