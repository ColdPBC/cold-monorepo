-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_definition_name_fkey";

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_definition_name_fkey" FOREIGN KEY ("compliance_definition_name") REFERENCES "compliance_definitions"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
