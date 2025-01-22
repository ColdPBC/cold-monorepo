-- CreateIndex
CREATE INDEX "category_data_organization_id_idx1" ON "category_data"("organization_id");

-- CreateIndex
CREATE INDEX "category_data_category_definition_id_idx1" ON "category_data"("category_definition_id");

-- CreateIndex
CREATE INDEX "compliance_questions_compliance_section_id_idx1" ON "compliance_questions"("compliance_section_id");

-- CreateIndex
CREATE INDEX "compliance_sections_compliance_section_group_id_idx1" ON "compliance_sections"("compliance_section_group_id");

-- CreateIndex
CREATE INDEX "component_definitions_name_idx1" ON "component_definitions"("name");

-- CreateIndex
CREATE INDEX "materials_material_classification_id_idx1" ON "materials"("material_classification_id");

-- CreateIndex
CREATE INDEX "organization_compliance_organization_id_idx1" ON "organization_compliance"("organization_id");

-- CreateIndex
CREATE INDEX "organization_compliance_id_idx1" ON "organization_compliance_ai_response_files"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "organization_ai_responses_organization_compliance_id_idx1" ON "organization_compliance_ai_responses"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "compliance_responses_organization_compliance_id_idx1" ON "organization_compliance_responses"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "organizations_name_idx1" ON "organizations"("name");

-- CreateIndex
CREATE INDEX "products_supplier_id_idx1" ON "products"("supplier_id");

-- CreateIndex
CREATE INDEX "survey_data_organization_id_idx1" ON "survey_data"("organization_id");

-- CreateIndex
CREATE INDEX "survey_definitions_name_idx1" ON "survey_definitions"("name");

-- CreateIndex
CREATE INDEX "survey_status_survey_id_idx1" ON "survey_status"("survey_id");

-- CreateIndex
CREATE INDEX "survey_status_survey_data_id_idx1" ON "survey_status"("survey_data_id");

-- CreateIndex
CREATE INDEX "survey_status_survey_name_idx1" ON "survey_status"("survey_name");

-- CreateIndex
CREATE INDEX "classification_organization_id_idx1" ON "sustainability_attribute_classifcation_assignment"("organization_id");

-- CreateIndex
CREATE INDEX "classification_assignment_sustainability_attribute_id_idx1" ON "sustainability_attribute_classifcation_assignment"("sustainability_attribute_id");

-- CreateIndex
CREATE INDEX "classification_assignment_material_classification_id_idx1" ON "sustainability_attribute_classifcation_assignment"("material_classification_id");

-- CreateIndex
CREATE INDEX "sustainability_attributes_material_classification_id_idx1" ON "sustainability_attributes"("material_classification_id");
