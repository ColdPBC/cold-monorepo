-- CreateTable
CREATE TABLE "attribute_assurances" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "effective_start_date" TIMESTAMP(3) NOT NULL,
    "effective_end_date" TIMESTAMP(3) NOT NULL,
    "organization_attributes_id" TEXT,
    "organization_file_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attribute_assurances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "attribute_assurances_org_claim_id_idx1" ON "attribute_assurances"("organization_attributes_id");

-- CreateIndex
CREATE INDEX "attribute_assurances_organization_id_idx1" ON "attribute_assurances"("organization_id");

-- CreateIndex
CREATE INDEX "attribute_assurances_organization_file_id_idx1" ON "attribute_assurances"("organization_file_id");

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_organization_attributes_id_fkey" FOREIGN KEY ("organization_attributes_id") REFERENCES "organization_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
