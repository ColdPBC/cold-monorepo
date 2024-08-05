-- CreateIndex
CREATE INDEX "certification_claims_certification_id_idx" ON "certification_claims"("certification_id");

-- CreateIndex
CREATE INDEX "certification_claims_certification_id_idx1" ON "certification_claims"("certification_id");

-- CreateIndex
CREATE INDEX "certification_claims_material_id_idx" ON "certification_claims"("material_id");

-- CreateIndex
CREATE INDEX "certification_claims_material_id_idx1" ON "certification_claims"("material_id");

-- CreateIndex
CREATE INDEX "certification_claims_organization_facility_id_idx" ON "certification_claims"("organization_facility_id");

-- CreateIndex
CREATE INDEX "certification_claims_organization_file_id_idx" ON "certification_claims"("organization_file_id");

-- CreateIndex
CREATE INDEX "certification_claims_organization_file_id_idx1" ON "certification_claims"("organization_file_id");

-- CreateIndex
CREATE INDEX "certification_claims_organization_id_idx" ON "certification_claims"("organization_id");

-- CreateIndex
CREATE INDEX "certification_claims_organization_id_idx1" ON "certification_claims"("organization_id");

-- CreateIndex
CREATE INDEX "certification_claims_product_id_idx" ON "certification_claims"("product_id");

-- CreateIndex
CREATE INDEX "certification_claims_product_id_idx1" ON "certification_claims"("product_id");

-- CreateIndex
CREATE INDEX "compliance_questions_compliance_definition_id_idx" ON "compliance_questions"("compliance_definition_id");

-- CreateIndex
CREATE INDEX "compliance_questions_compliance_definition_id_idx1" ON "compliance_questions"("compliance_definition_id");

-- CreateIndex
CREATE INDEX "compliance_questions_compliance_question_dependency_chain__idx1" ON "compliance_questions"("compliance_question_dependency_chain_id");

-- CreateIndex
CREATE INDEX "compliance_questions_compliance_question_dependency_chain_i_idx" ON "compliance_questions"("compliance_question_dependency_chain_id");

-- CreateIndex
CREATE INDEX "compliance_section_groups_compliance_definition_id_idx" ON "compliance_section_groups"("compliance_definition_id");

-- CreateIndex
CREATE INDEX "compliance_section_groups_compliance_definition_id_idx1" ON "compliance_section_groups"("compliance_definition_id");

-- CreateIndex
CREATE INDEX "compliance_sections_compliance_definition_id_idx" ON "compliance_sections"("compliance_definition_id");

-- CreateIndex
CREATE INDEX "compliance_sections_compliance_definition_id_idx1" ON "compliance_sections"("compliance_definition_id");

-- CreateIndex
CREATE INDEX "compliance_sections_compliance_section_dependency_chain_id_idx" ON "compliance_sections"("compliance_section_dependency_chain_id");

-- CreateIndex
CREATE INDEX "compliance_sections_compliance_section_dependency_chain_id_idx1" ON "compliance_sections"("compliance_section_dependency_chain_id");

-- CreateIndex
CREATE INDEX "integrations_organization_id_idx" ON "integrations"("organization_id");

-- CreateIndex
CREATE INDEX "integrations_organization_id_idx1" ON "integrations"("organization_id");

-- CreateIndex
CREATE INDEX "material_suppliers_material_id_idx" ON "material_suppliers"("material_id");

-- CreateIndex
CREATE INDEX "material_suppliers_material_id_idx1" ON "material_suppliers"("material_id");

-- CreateIndex
CREATE INDEX "materials_organization_id_idx" ON "materials"("organization_id");

-- CreateIndex
CREATE INDEX "materials_organization_id_idx1" ON "materials"("organization_id");

-- CreateIndex
CREATE INDEX "organization_compliance_compliance_definition_id_idx" ON "organization_compliance"("compliance_definition_id");

-- CreateIndex
CREATE INDEX "organization_compliance_compliance_definition_id_idx1" ON "organization_compliance"("compliance_definition_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_re_organization_compliance_ai_r_idx1" ON "organization_compliance_ai_response_files"("organization_compliance_ai_response_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_re_organization_compliance_ai_re_idx" ON "organization_compliance_ai_response_files"("organization_compliance_ai_response_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_response__organization_files_id_idx1" ON "organization_compliance_ai_response_files"("organization_files_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_response_f_organization_files_id_idx" ON "organization_compliance_ai_response_files"("organization_files_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_response_files_organization_id_idx" ON "organization_compliance_ai_response_files"("organization_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_response_files_organization_id_idx1" ON "organization_compliance_ai_response_files"("organization_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_response_compliance_question_id_idx1" ON "organization_compliance_ai_responses"("compliance_question_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_responses_compliance_question_id_idx" ON "organization_compliance_ai_responses"("compliance_question_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_responses_organization_id_idx" ON "organization_compliance_ai_responses"("organization_id");

-- CreateIndex
CREATE INDEX "organization_compliance_ai_responses_organization_id_idx1" ON "organization_compliance_ai_responses"("organization_id");

-- CreateIndex
CREATE INDEX "organization_compliance_note__organization_compliance_note__idx" ON "organization_compliance_note_files"("organization_compliance_note_id");

-- CreateIndex
CREATE INDEX "organization_compliance_note__organization_compliance_note_idx2" ON "organization_compliance_note_files"("organization_compliance_note_id");

-- CreateIndex
CREATE INDEX "organization_compliance_note_files_organization_files_id_idx" ON "organization_compliance_note_files"("organization_files_id");

-- CreateIndex
CREATE INDEX "organization_compliance_note_files_organization_files_id_idx1" ON "organization_compliance_note_files"("organization_files_id");

-- CreateIndex
CREATE INDEX "organization_compliance_note__organization_compliance_note_idx1" ON "organization_compliance_note_links"("organization_compliance_note_id");

-- CreateIndex
CREATE INDEX "organization_compliance_note__organization_compliance_note_idx3" ON "organization_compliance_note_links"("organization_compliance_note_id");

-- CreateIndex
CREATE INDEX "organization_compliance_notes_compliance_question_id_idx" ON "organization_compliance_notes"("compliance_question_id");

-- CreateIndex
CREATE INDEX "organization_compliance_notes_compliance_question_id_idx1" ON "organization_compliance_notes"("compliance_question_id");

-- CreateIndex
CREATE INDEX "organization_compliance_notes_organization_compliance_id_idx" ON "organization_compliance_notes"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "organization_compliance_notes_organization_compliance_id_idx1" ON "organization_compliance_notes"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "organization_compliance_questio_organization_compliance_id_idx1" ON "organization_compliance_question_bookmarks"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "organization_compliance_question_bo_compliance_question_id_idx1" ON "organization_compliance_question_bookmarks"("compliance_question_id");

-- CreateIndex
CREATE INDEX "organization_compliance_question_boo_compliance_question_id_idx" ON "organization_compliance_question_bookmarks"("compliance_question_id");

-- CreateIndex
CREATE INDEX "organization_compliance_question_organization_compliance_id_idx" ON "organization_compliance_question_bookmarks"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "organization_compliance_responses_compliance_question_id_idx" ON "organization_compliance_responses"("compliance_question_id");

-- CreateIndex
CREATE INDEX "organization_compliance_responses_compliance_question_id_idx1" ON "organization_compliance_responses"("compliance_question_id");

-- CreateIndex
CREATE INDEX "organization_compliance_statuse_organization_compliance_id_idx1" ON "organization_compliance_statuses"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "organization_compliance_statuses_organization_compliance_id_idx" ON "organization_compliance_statuses"("organization_compliance_id");

-- CreateIndex
CREATE INDEX "organization_compliances_old_compliance_id_idx" ON "organization_compliances_old"("compliance_id");

-- CreateIndex
CREATE INDEX "organization_compliances_old_compliance_id_idx1" ON "organization_compliances_old"("compliance_id");

-- CreateIndex
CREATE INDEX "organization_facilities_organization_id_idx" ON "organization_facilities"("organization_id");

-- CreateIndex
CREATE INDEX "organization_facilities_organization_id_idx1" ON "organization_facilities"("organization_id");

-- CreateIndex
CREATE INDEX "organization_files_integration_id_idx" ON "organization_files"("integration_id");

-- CreateIndex
CREATE INDEX "organization_files_integration_id_idx1" ON "organization_files"("integration_id");

-- CreateIndex
CREATE INDEX "product_materials_material_id_idx" ON "product_materials"("material_id");

-- CreateIndex
CREATE INDEX "product_materials_material_id_idx1" ON "product_materials"("material_id");

-- CreateIndex
CREATE INDEX "product_materials_product_id_idx" ON "product_materials"("product_id");

-- CreateIndex
CREATE INDEX "product_materials_product_id_idx1" ON "product_materials"("product_id");

-- CreateIndex
CREATE INDEX "products_organization_id_idx" ON "products"("organization_id");

-- CreateIndex
CREATE INDEX "products_organization_id_idx1" ON "products"("organization_id");

-- CreateIndex
CREATE INDEX "survey_data_survey_definition_id_idx" ON "survey_data"("survey_definition_id");

-- CreateIndex
CREATE INDEX "survey_data_survey_definition_id_idx1" ON "survey_data"("survey_definition_id");

-- CreateIndex
CREATE INDEX "survey_status_organization_id_idx" ON "survey_status"("organization_id");

-- CreateIndex
CREATE INDEX "survey_status_organization_id_idx1" ON "survey_status"("organization_id");

-- CreateIndex
CREATE INDEX "vector_records_organization_file_id_idx" ON "vector_records"("organization_file_id");

-- CreateIndex
CREATE INDEX "vector_records_organization_file_id_idx1" ON "vector_records"("organization_file_id");

-- CreateIndex
CREATE INDEX "vector_records_organization_id_idx" ON "vector_records"("organization_id");

-- CreateIndex
CREATE INDEX "vector_records_organization_id_idx1" ON "vector_records"("organization_id");
