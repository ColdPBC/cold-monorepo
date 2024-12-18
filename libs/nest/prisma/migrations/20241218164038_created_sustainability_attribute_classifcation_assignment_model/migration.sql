-- CreateTable
CREATE TABLE "sustainability_attribute_classifcation_assignment" (
    "id" SERIAL NOT NULL,
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,
    "sustainability_attribute_id" TEXT NOT NULL,
    "material_classification_id" INTEGER NOT NULL,

    CONSTRAINT "sustainability_attribute_classifcation_assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sustainability_attribute_classifcation_assignment" ADD CONSTRAINT "sustainability_attribute_classifcation_assignment_sustaina_fkey" FOREIGN KEY ("sustainability_attribute_id") REFERENCES "sustainability_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sustainability_attribute_classifcation_assignment" ADD CONSTRAINT "sustainability_attribute_classifcation_assignment_material_fkey" FOREIGN KEY ("material_classification_id") REFERENCES "material_classification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sustainability_attribute_classifcation_assignment" ADD CONSTRAINT "sustainability_attribute_classifcation_assignment_organiza_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
