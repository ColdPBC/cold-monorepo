-- DropForeignKey
ALTER TABLE "compliance_questions" DROP CONSTRAINT "compliance_questions_compliance_section_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_section_groups" DROP CONSTRAINT "compliance_section_groups_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_section_group_id_fkey";

-- AddForeignKey
ALTER TABLE "compliance_section_groups" ADD CONSTRAINT "compliance_section_groups_compliance_definition_name_fkey" FOREIGN KEY ("compliance_definition_name") REFERENCES "compliance_definitions"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_section_group_id_fkey" FOREIGN KEY ("compliance_section_group_id") REFERENCES "compliance_section_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_definition_name_fkey" FOREIGN KEY ("compliance_definition_name") REFERENCES "compliance_definitions"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_questions" ADD CONSTRAINT "compliance_questions_compliance_section_id_fkey" FOREIGN KEY ("compliance_section_id") REFERENCES "compliance_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
