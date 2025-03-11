/*
  Warnings:

  - You are about to drop the column `update_at` on the `ecoinvent_imports` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ecoinvent_data" ADD COLUMN     "activity_name" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ecoinvent_imports" ADD COLUMN "updated_at" TIMESTAMP(3);
UPDATE ecoinvent_imports set updated_at = update_at where updated_at is null;
ALTER TABLE "ecoinvent_imports" DROP COLUMN "update_at";
