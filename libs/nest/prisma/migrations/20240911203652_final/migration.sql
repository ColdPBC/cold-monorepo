-- AlterTable
ALTER TABLE "attribute_assurances" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "material_suppliers" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "materials" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "product_materials" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "sustainability_attributes" ALTER COLUMN "id" DROP DEFAULT;
