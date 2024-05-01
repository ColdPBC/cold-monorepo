/*
  Warnings:

  - You are about to drop the column `category_idx` on the `compliance_sections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[compliance_section_group_id,key]` on the table `compliance_sections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `compliance_sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compliance_sections" DROP COLUMN "category_idx",
ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "compliance_sections_compliance_section_group_id_key_key" ON "compliance_sections"("compliance_section_group_id", "key");
