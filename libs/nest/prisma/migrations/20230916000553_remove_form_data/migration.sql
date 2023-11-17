/*
  Warnings:

  - You are about to drop the `form_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "form_data" DROP CONSTRAINT "form_data_organization_id_fkey";

-- DropTable
DROP TABLE "form_data";
