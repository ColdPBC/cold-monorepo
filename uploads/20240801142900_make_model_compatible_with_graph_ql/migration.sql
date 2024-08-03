/*
  Warnings:

  - You are about to drop the column `organization_name` on the `certification_claims` table. All the data in the column will be lost.
  - You are about to drop the column `organization_name` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `organization_name` on the `products` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `certification_claims` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_name_fkey";

-- DropForeignKey
ALTER TABLE "compliance_questions" DROP CONSTRAINT "compliance_questions_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "compliance_section_groups" DROP CONSTRAINT "compliance_section_groups_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "materials" DROP CONSTRAINT "materials_organization_name_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance" DROP CONSTRAINT "organization_compliance_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_organization_name_fkey";

-- AlterTable
ALTER TABLE "certification_claims" ADD COLUMN "organization_id" TEXT;

UPDATE certification_claims SET organization_id = (select id from organizations where name = certification_claims.organization_name);

ALTER TABLE "certification_claims" DROP COLUMN  "organization_name";

-- AlterTable
ALTER TABLE "compliance_questions" ADD COLUMN     "compliance_definition_id" TEXT;

-- AlterTable
ALTER TABLE "compliance_section_groups" ADD COLUMN     "compliance_definition_id" TEXT;

-- AlterTable
ALTER TABLE "compliance_sections" ADD COLUMN     "compliance_definition_id" TEXT;

-- AlterTable
ALTER TABLE "materials" DROP COLUMN "organization_name",
ADD COLUMN  "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organization_compliance" ADD COLUMN     "compliance_definition_id" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "organization_name",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance" ADD CONSTRAINT "organization_compliance_compliance_definition_id_fkey" FOREIGN KEY ("compliance_definition_id") REFERENCES "compliance_definitions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_section_groups" ADD CONSTRAINT "compliance_section_groups_compliance_definition_id_fkey" FOREIGN KEY ("compliance_definition_id") REFERENCES "compliance_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_definition_id_fkey" FOREIGN KEY ("compliance_definition_id") REFERENCES "compliance_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_questions" ADD CONSTRAINT "compliance_questions_compliance_definition_id_fkey" FOREIGN KEY ("compliance_definition_id") REFERENCES "compliance_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
