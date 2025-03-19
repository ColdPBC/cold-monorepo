/*
  Warnings:

  - You are about to drop the column `ecoinvent_classification_name` on the `ecoinvent_activities` table. All the data in the column will be lost.
  - You are about to drop the column `isic_classification` on the `ecoinvent_activities` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ecoinvent_activities_ecoinvent_classification_name_idx1";

-- DropIndex
DROP INDEX "ecoinvent_activities_isic_classification_idx1";

-- AlterTable
ALTER TABLE "ecoinvent_activities" DROP COLUMN "ecoinvent_classification_name",
DROP COLUMN "isic_classification",
ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "ecoinvent_classifications" RENAME CONSTRAINT "ecoinvent_activity_classification_pkey" TO "ecoinvent_classifications_pkey";

-- CreateTable
CREATE TABLE "ecoinvent_activity_classifications" (
    "id" TEXT NOT NULL,
    "ecoinvent_activity_id" TEXT NOT NULL,
    "ecoinvent_classification_id" TEXT NOT NULL,

    CONSTRAINT "ecoinvent_activity_classifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ecoinvent_activities_name_idx1" ON "ecoinvent_activities"("name");

-- AddForeignKey
ALTER TABLE "ecoinvent_activity_classifications" ADD CONSTRAINT "ecoinvent_activity_classifications_ecoinvent_activity_id_fkey" FOREIGN KEY ("ecoinvent_activity_id") REFERENCES "ecoinvent_activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ecoinvent_activity_classifications" ADD CONSTRAINT "ecoinvent_activity_classifications_ecoinvent_classificatio_fkey" FOREIGN KEY ("ecoinvent_classification_id") REFERENCES "ecoinvent_classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "ecoinvent_activity_classification_name_idx1" RENAME TO "ecoinvent_classifications_name_idx1";

-- RenameIndex
ALTER INDEX "ecoinvent_activity_classification_name_system_key" RENAME TO "ecoinvent_classifications_name_system_key";

-- RenameIndex
ALTER INDEX "ecoinvent_activity_classification_system_idx1" RENAME TO "ecoinvent_classifications_system_idx1";
