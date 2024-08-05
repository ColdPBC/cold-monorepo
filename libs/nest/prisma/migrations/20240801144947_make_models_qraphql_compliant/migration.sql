
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

UPDATE certification_claims SET organization_id = (select id from organizations where name = certification_claims.organization_name)
WHERE certification_claims.organization_id IS NULL;

ALTER TABLE "certification_claims"
  ALTER COLUMN "organization_id" SET NOT NULL;

--ALTER TABLE "certification_claims" DROP COLUMN     "organization_name";

-- AlterTable
ALTER TABLE "compliance_questions" ADD COLUMN     "compliance_definition_id" TEXT;
UPDATE compliance_questions SET compliance_definition_id = (select id from compliance_definitions where name = compliance_definition_name)
WHERE compliance_questions.compliance_definition_id IS NULL;

-- AlterTable
ALTER TABLE "compliance_section_groups" ADD COLUMN     "compliance_definition_id" TEXT;
UPDATE compliance_section_groups SET compliance_definition_id = (select id from compliance_definitions where name = compliance_definition_name)
WHERE compliance_section_groups.compliance_definition_id IS NULL;

-- AlterTable
ALTER TABLE "compliance_sections" ADD COLUMN     "compliance_definition_id" TEXT;
UPDATE compliance_sections SET compliance_definition_id = (select id from compliance_definitions where name = compliance_definition_name)
WHERE compliance_sections.compliance_definition_id IS NULL;

-- AlterTable
ALTER TABLE "materials" ADD COLUMN "organization_id" TEXT;

UPDATE materials SET organization_id = (select id from organizations where name = materials.organization_name)
WHERE materials.organization_id IS NULL;

ALTER TABLE "materials"
  ALTER COLUMN "organization_id" SET NOT NULL;

--ALTER TABLE "certification_claims" DROP COLUMN     "organization_name";

-- AlterTable
ALTER TABLE "organization_compliance" ADD COLUMN     "compliance_definition_id" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN "organization_id" TEXT;

UPDATE products SET organization_id = (select id from organizations where name = products.organization_name)
WHERE products.organization_id IS NULL;

ALTER TABLE "products"
  ALTER COLUMN "organization_id" SET NOT NULL;

--ALTER TABLE "certification_claims" DROP COLUMN     "organization_name";

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
