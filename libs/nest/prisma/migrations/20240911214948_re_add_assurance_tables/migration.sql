-- CreateTable
CREATE TABLE "sustainability_attributes" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "organization_id" TEXT,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "level" "claim_levels" NOT NULL,
    "type" "claim_types" NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "sustainability_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_assurances" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "organization_facility_id" TEXT,
    "organization_id" TEXT NOT NULL,
    "sustainability_attribute_id" UUID NOT NULL,
    "material_id" UUID,
    "product_id" UUID,
    "organization_file_id" TEXT,
    "effective_start_date" TIMESTAMP(3) NOT NULL,
    "effective_end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "attribute_assurances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_suppliers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "material_id" UUID NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "material_suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_materials" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID NOT NULL,
    "material_id" UUID NOT NULL,
    "material_supplier_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "product_materials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sustainability_attributes_organization_id_idx1" ON "sustainability_attributes"("organization_id");

-- CreateIndex
CREATE INDEX "sustainability_attributes_level_idx1" ON "sustainability_attributes"("level");

-- CreateIndex
CREATE INDEX "sustainability_attributes_type_idx1" ON "sustainability_attributes"("type");

-- CreateIndex
CREATE UNIQUE INDEX "sustainability_attributes_organization_id_name_key" ON "sustainability_attributes"("organization_id", "name");

-- CreateIndex
CREATE INDEX "attribute_assurances_organization_id_idx1" ON "attribute_assurances"("organization_id");

-- CreateIndex
CREATE INDEX "attribute_assurances_organization_file_id_idx1" ON "attribute_assurances"("organization_file_id");

-- CreateIndex
CREATE INDEX "attribute_assurances_attribute_id_idx1" ON "attribute_assurances"("sustainability_attribute_id");

-- CreateIndex
CREATE INDEX "attribute_assurances_organization_facility_id_idx" ON "attribute_assurances"("organization_facility_id");

-- CreateIndex
CREATE INDEX "attribute_assurances_product_id_idx1" ON "attribute_assurances"("product_id");

-- CreateIndex
CREATE INDEX "attribute_assurancess_material_id_idx1" ON "attribute_assurances"("material_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE INDEX "products_organization_id_idx1" ON "products"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "materials_name_key" ON "materials"("name");

-- CreateIndex
CREATE INDEX "materials_organization_id_idx1" ON "materials"("organization_id");

-- CreateIndex
CREATE INDEX "material_suppliers_supplier_id_idx1" ON "material_suppliers"("supplier_id");

-- CreateIndex
CREATE INDEX "material_suppliers_material_id_idx1" ON "material_suppliers"("material_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_suppliers_material_id_supplier_id_key" ON "material_suppliers"("material_id", "supplier_id");

-- CreateIndex
CREATE INDEX "product_materials_material_id_idx1" ON "product_materials"("material_id");

-- CreateIndex
CREATE INDEX "product_materials_product_id_idx1" ON "product_materials"("product_id");

-- AddForeignKey
ALTER TABLE "sustainability_attributes" ADD CONSTRAINT "sustainability_attributes_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_sustainability_attribute_id_fkey" FOREIGN KEY ("sustainability_attribute_id") REFERENCES "sustainability_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_suppliers" ADD CONSTRAINT "material_suppliers_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_suppliers" ADD CONSTRAINT "material_suppliers_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_materials" ADD CONSTRAINT "product_materials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_materials" ADD CONSTRAINT "product_materials_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
