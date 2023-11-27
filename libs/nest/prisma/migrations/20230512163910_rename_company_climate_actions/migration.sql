/*
  Warnings:

  - You are about to drop the column `action_id` on the `company-climate-actions` table. All the data in the column will be lost.
  - You are about to drop the column `action_overrides` on the `company-climate-actions` table. All the data in the column will be lost.
  - Added the required column `climate_action_id` to the `company-climate-actions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "company_climate_actions" DROP CONSTRAINT "company_climate_actions_action_id_fkey";

-- AlterTable
ALTER TABLE "company_climate_actions" DROP COLUMN "action_id",
DROP COLUMN "action_overrides",
ADD COLUMN     "climate_action_id" TEXT NOT NULL,
ADD COLUMN     "climate_action_overrides" JSONB;

-- AddForeignKey
ALTER TABLE "company_climate_actions" ADD CONSTRAINT "company_climate_actions_climate_action_id_fkey" FOREIGN KEY ("climate_action_id") REFERENCES "climate_actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
