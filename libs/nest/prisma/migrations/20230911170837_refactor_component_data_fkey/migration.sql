/*
  Warnings:

  - You are about to drop the column `form_name` on the `component_data` table. All the data in the column will be lost.
  - Added the required column `component_name` to the `component_data` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "component_data" DROP CONSTRAINT "component_data_form_name_fkey";

-- AlterTable
ALTER TABLE "component_data" DROP COLUMN "form_name",
ADD COLUMN     "component_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "component_data" ADD CONSTRAINT "component_data_component_name_fkey" FOREIGN KEY ("component_name") REFERENCES "component_definitions"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
