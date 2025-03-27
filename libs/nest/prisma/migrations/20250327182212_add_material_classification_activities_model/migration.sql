-- CreateTable
CREATE TABLE "material_classification_activities" (
    "id" TEXT NOT NULL,
    "material_classification_id" INTEGER NOT NULL,
    "ecoinvent_activity_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_classification_activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "material_classification_activities_activity_id_idx1" ON "material_classification_activities"("ecoinvent_activity_id");

-- CreateIndex
CREATE INDEX "material_classification_activities_material_classification_idx1" ON "material_classification_activities"("material_classification_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_classification_activities_material_classification__key" ON "material_classification_activities"("material_classification_id", "ecoinvent_activity_id");

-- AddForeignKey
ALTER TABLE "material_classification_activities" ADD CONSTRAINT "material_classification_activities_material_classification_fkey" FOREIGN KEY ("material_classification_id") REFERENCES "material_classification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_classification_activities" ADD CONSTRAINT "material_classification_activities_ecoinvent_activity_id_fkey" FOREIGN KEY ("ecoinvent_activity_id") REFERENCES "ecoinvent_activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
