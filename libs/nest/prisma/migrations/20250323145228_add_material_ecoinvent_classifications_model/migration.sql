-- CreateTable
CREATE TABLE "material_ecoinvent_classifications" (
    "id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "ecoinvent_classification_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_ecoinvent_classifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "material_ecoinvent_classifications_id_idx1" ON "material_ecoinvent_classifications"("ecoinvent_classification_id");

-- CreateIndex
CREATE INDEX "material_ecoinvent_classifications_material_id_idx1" ON "material_ecoinvent_classifications"("material_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_ecoinvent_classifications_material_id_ecoinvent_cl_key" ON "material_ecoinvent_classifications"("material_id", "ecoinvent_classification_id");

-- AddForeignKey
ALTER TABLE "material_ecoinvent_classifications" ADD CONSTRAINT "material_ecoinvent_classifications_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_ecoinvent_classifications" ADD CONSTRAINT "material_ecoinvent_classifications_ecoinvent_classificatio_fkey" FOREIGN KEY ("ecoinvent_classification_id") REFERENCES "ecoinvent_classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
