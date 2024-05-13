-- AlterTable
ALTER TABLE "organization_compliance_responses" ADD COLUMN     "compliance_responsesId" INTEGER;

-- CreateTable
CREATE TABLE "compliance_responses" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compliance_question_id" TEXT NOT NULL,
    "compliance_section_id" TEXT NOT NULL,
    "compliance_section_group_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "compliance_definition_name" TEXT NOT NULL,
    "organization_compliance_id" TEXT NOT NULL,
    "organization_compliance_ai_response_id" TEXT,
    "organization_compliance_response_id" TEXT,

    CONSTRAINT "compliance_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "compliance_responses_compliance_section_group_id_compliance_key" ON "compliance_responses"("compliance_section_group_id", "compliance_definition_name");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_responses_organization_compliance_id_compliance__key" ON "compliance_responses"("organization_compliance_id", "compliance_question_id");

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "ai_response_id" FOREIGN KEY ("organization_compliance_ai_response_id") REFERENCES "organization_compliance_ai_responses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "org_response_id" FOREIGN KEY ("organization_compliance_response_id") REFERENCES "organization_compliance_responses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_compliance_section_id_fkey" FOREIGN KEY ("compliance_section_id") REFERENCES "compliance_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_compliance_section_group_id_fkey" FOREIGN KEY ("compliance_section_group_id") REFERENCES "compliance_section_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_compliance_question_id_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_organization_compliance_id_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_responses" ADD CONSTRAINT "compliance_responses_compliance_definition_name_fkey" FOREIGN KEY ("compliance_definition_name") REFERENCES "compliance_definitions"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
