/*
  Warnings:

  - You are about to drop the `component_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "component_data" DROP CONSTRAINT "component_data_component_name_fkey";

-- DropForeignKey
ALTER TABLE "component_data" DROP CONSTRAINT "component_data_organization_id_fkey";

-- DropTable
DROP TABLE "component_data";
