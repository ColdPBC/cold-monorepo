-- DropForeignKey
ALTER TABLE "category_data" DROP CONSTRAINT "category_data_category_definition_id_fkey";

-- DropForeignKey
ALTER TABLE "category_data" DROP CONSTRAINT "category_data_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "component_data" DROP CONSTRAINT "component_data_component_name_fkey";

-- DropForeignKey
ALTER TABLE "component_data" DROP CONSTRAINT "component_data_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "policy_data" DROP CONSTRAINT "policy_data_id_fkey";

-- DropForeignKey
ALTER TABLE "survey_data" DROP CONSTRAINT "survey_data_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "survey_data" DROP CONSTRAINT "survey_data_survey_definition_id_fkey";

-- AddForeignKey
ALTER TABLE "component_data" ADD CONSTRAINT "component_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component_data" ADD CONSTRAINT "component_data_component_name_fkey" FOREIGN KEY ("component_name") REFERENCES "component_definitions"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_data" ADD CONSTRAINT "policy_data_id_fkey" FOREIGN KEY ("id") REFERENCES "policy_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_data" ADD CONSTRAINT "survey_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_data" ADD CONSTRAINT "survey_data_survey_definition_id_fkey" FOREIGN KEY ("survey_definition_id") REFERENCES "survey_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_data" ADD CONSTRAINT "category_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_data" ADD CONSTRAINT "category_data_category_definition_id_fkey" FOREIGN KEY ("category_definition_id") REFERENCES "category_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
