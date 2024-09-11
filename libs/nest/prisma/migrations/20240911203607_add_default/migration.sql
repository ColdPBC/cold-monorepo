ALTER TABLE "material_suppliers" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "material_suppliers" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "materials" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "materials" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "product_materials" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "product_materials" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "attribute_assurances" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "attribute_assurances" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE "sustainability_attributes" ALTER COLUMN "id" SET DATA TYPE TEXT USING "id"::TEXT;
ALTER TABLE "sustainability_attributes" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
