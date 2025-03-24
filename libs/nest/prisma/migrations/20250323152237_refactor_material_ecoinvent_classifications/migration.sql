/*
  Warnings:

  - You are about to drop the column `material_id` on the `material_ecoinvent_classifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[material_classification_id,ecoinvent_classification_id]` on the table `material_ecoinvent_classifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `material_classification_id` to the `material_ecoinvent_classifications` table without a default value. This is not possible if the table is not empty.
  - Made the column `ecoinvent_classification_id` on table `material_ecoinvent_classifications` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "material_ecoinvent_classifications" DROP CONSTRAINT "material_ecoinvent_classifications_material_id_fkey";

-- DropIndex
DROP INDEX "material_ecoinvent_classifications_material_id_ecoinvent_cl_key";

-- DropIndex
DROP INDEX "material_ecoinvent_classifications_material_id_idx1";

-- AlterTable
ALTER TABLE "material_ecoinvent_classifications" DROP COLUMN "material_id",
ADD COLUMN     "material_classification_id" INTEGER NOT NULL,
ALTER COLUMN "ecoinvent_classification_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "material_ecoinvent_material_classifications_idx1" ON "material_ecoinvent_classifications"("material_classification_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_ecoinvent_classifications_material_classification__key" ON "material_ecoinvent_classifications"("material_classification_id", "ecoinvent_classification_id");

-- AddForeignKey
ALTER TABLE "material_ecoinvent_classifications" ADD CONSTRAINT "material_ecoinvent_classifications_material_classification_fkey" FOREIGN KEY ("material_classification_id") REFERENCES "material_classification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
