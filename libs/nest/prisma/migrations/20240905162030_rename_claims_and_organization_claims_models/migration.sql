/*
  Warnings:

  - You are about to drop the `claims` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_claims` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "claims" DROP CONSTRAINT "claims_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_claims" DROP CONSTRAINT "organization_claims_claim_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_claims" DROP CONSTRAINT "organization_claims_material_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_claims" DROP CONSTRAINT "organization_claims_organization_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_claims" DROP CONSTRAINT "organization_claims_organization_file_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_claims" DROP CONSTRAINT "organization_claims_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_claims" DROP CONSTRAINT "organization_claims_product_id_fkey";

-- DropTable
DROP TABLE "claims" CASCADE;

-- DropTable
DROP TABLE "organization_claims" CASCADE;

-- CreateTable
CREATE TABLE "sustainability_attributes" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "level" "claim_levels" NOT NULL,
    "type" "claim_types" NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "sustainability_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_attributes" (
    "id" TEXT NOT NULL,
    "sustainability_attribute_id" TEXT NOT NULL,
    "organization_facility_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "material_id" TEXT,
    "product_id" TEXT,
    "organization_id" TEXT NOT NULL,
    "organization_file_id" TEXT,

    CONSTRAINT "organization_attributes_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "organization_attributes_organization_id_idx1" ON "organization_attributes"("organization_id");

-- CreateIndex
CREATE INDEX "organization_attributes_attribute_id_idx1" ON "organization_attributes"("sustainability_attribute_id");

-- CreateIndex
CREATE INDEX "organization_attributes_organization_facility_id_idx" ON "organization_attributes"("organization_facility_id");

-- CreateIndex
CREATE INDEX "organization_attributes_organization_file_id_idx1" ON "organization_attributes"("organization_file_id");

-- CreateIndex
CREATE INDEX "organization_claims_organization_id_idx1" ON "organization_attributes"("organization_id");

-- CreateIndex
CREATE INDEX "organization_attributes_product_id_idx1" ON "organization_attributes"("product_id");

-- CreateIndex
CREATE INDEX "organization_attributes_material_id_idx1" ON "organization_attributes"("material_id");

-- AddForeignKey
ALTER TABLE "sustainability_attributes" ADD CONSTRAINT "sustainability_attributes_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_attributes" ADD CONSTRAINT "organization_attributes_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_attributes" ADD CONSTRAINT "organization_attributes_sustainability_attribute_id_fkey" FOREIGN KEY ("sustainability_attribute_id") REFERENCES "sustainability_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_attributes" ADD CONSTRAINT "organization_attributes_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_attributes" ADD CONSTRAINT "organization_attributes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_attributes" ADD CONSTRAINT "organization_attributes_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_attributes" ADD CONSTRAINT "organization_attributes_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
