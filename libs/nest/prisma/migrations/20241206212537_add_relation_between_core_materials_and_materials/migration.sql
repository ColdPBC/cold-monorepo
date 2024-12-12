-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "core_material_name" TEXT;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_core_material_name_fkey" FOREIGN KEY ("core_material_name") REFERENCES "core_material_types"("name") ON DELETE SET NULL ON UPDATE CASCADE;
