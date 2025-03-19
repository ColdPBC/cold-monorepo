-- AlterTable
ALTER TABLE "emissions" ADD COLUMN     "emission_factorsId" TEXT;

-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "emission_factor_id" TEXT;

-- CreateTable
CREATE TABLE "emission_factors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emission_factors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "emission_factors_name_idx1" ON "emission_factors"("name");

-- AddForeignKey
ALTER TABLE "emissions" ADD CONSTRAINT "emissions_emission_factorsId_fkey" FOREIGN KEY ("emission_factorsId") REFERENCES "emission_factors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_emission_factor_id_fkey" FOREIGN KEY ("emission_factor_id") REFERENCES "emission_factors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
