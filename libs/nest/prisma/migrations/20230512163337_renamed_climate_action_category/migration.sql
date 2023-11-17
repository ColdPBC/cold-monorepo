/*
  Warnings:

  - You are about to drop the column `action_category_id` on the `climate-actions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "climate_actions" DROP CONSTRAINT "climate_actions_action_category_id_fkey";

-- AlterTable
ALTER TABLE "climate_actions" DROP COLUMN "action_category_id",
ADD COLUMN     "climate_action_category_id" TEXT;

-- AddForeignKey
ALTER TABLE "climate_actions" ADD CONSTRAINT "climate_actions_climate_action_category_id_fkey" FOREIGN KEY ("climate_action_category_id") REFERENCES "climate_action_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
