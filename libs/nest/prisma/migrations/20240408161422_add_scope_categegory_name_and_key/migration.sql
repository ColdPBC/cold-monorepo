/*
  Warnings:

  - A unique constraint covering the columns `[ghg_subcategory,name]` on the table `emission_scopes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `emission_scopes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emission_scopes" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "emission_scopes_ghg_subcategory_name_key" ON "emission_scopes"("ghg_subcategory", "name");
