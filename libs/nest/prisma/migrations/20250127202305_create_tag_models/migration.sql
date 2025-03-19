-- CreateTable
CREATE TABLE "material_tag_assignments" (
    "id" SERIAL NOT NULL,
    "material_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "material_tag_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_tags" (
    "id" SERIAL NOT NULL,
    "organization_id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_tag_assignments" (
    "id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "product_tag_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_tags" (
    "id" SERIAL NOT NULL,
    "organization_id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "material_tag_assignments_organization_id_idx1" ON "material_tag_assignments"("organization_id");

-- CreateIndex
CREATE INDEX "material_tag_assignments_material_id_idx1" ON "material_tag_assignments"("material_id");

-- CreateIndex
CREATE INDEX "material_tags_organization_id_idx1" ON "material_tags"("organization_id");

-- CreateIndex
CREATE INDEX "product_tag_assignments_organization_id_idx1" ON "product_tag_assignments"("organization_id");

-- CreateIndex
CREATE INDEX "product_tag_assignments_product_id_idx1" ON "product_tag_assignments"("product_id");

-- CreateIndex
CREATE INDEX "product_tags_organization_id_idx1" ON "products_tags"("organization_id");

-- AddForeignKey
ALTER TABLE "material_tag_assignments" ADD CONSTRAINT "material_tag_assignments_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_tag_assignments" ADD CONSTRAINT "material_tag_assignments_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_tags" ADD CONSTRAINT "material_tags_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tag_assignments" ADD CONSTRAINT "product_tag_assignments_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tag_assignments" ADD CONSTRAINT "product_tag_assignments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_tags" ADD CONSTRAINT "products_tags_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
