-- CreateIndex
CREATE INDEX "compliance_question_dependency_chains_compliance_question_i_idx" ON "compliance_question_dependency_chains"("compliance_question_id");

-- CreateIndex
CREATE INDEX "compliance_question_dependency_chains_compliance_question_k_idx" ON "compliance_question_dependency_chains"("compliance_question_key");

-- CreateIndex
CREATE INDEX "compliance_question_dependency_chains_compliance_section_id_idx" ON "compliance_question_dependency_chains"("compliance_section_id");

-- CreateIndex
CREATE INDEX "compliance_question_dependency_chains_compliance_section_ke_idx" ON "compliance_question_dependency_chains"("compliance_section_key");

-- CreateIndex
CREATE INDEX "compliance_question_dependency_chains_compliance_section_gr_idx" ON "compliance_question_dependency_chains"("compliance_section_group_id");

-- CreateIndex
CREATE INDEX "compliance_question_dependency_chains_compliance_definition_idx" ON "compliance_question_dependency_chains"("compliance_definition_name");

-- CreateIndex
CREATE INDEX "section_question_definition_name_idx1" ON "compliance_question_dependency_chains"("compliance_section_id", "compliance_question_key", "compliance_definition_name");

-- CreateIndex
CREATE INDEX "section_key_question_key_definition_name_idx1" ON "compliance_question_dependency_chains"("compliance_section_key", "compliance_question_key", "compliance_definition_name");
