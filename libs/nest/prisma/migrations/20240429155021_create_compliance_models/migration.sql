/*
  Warnings:

  - Added the required column `custom` to the `compliance_definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `compliance_definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadata` to the `compliance_definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `compliance_definitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `compliance_definitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compliance_definitions" ADD COLUMN     "custom" BOOLEAN NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "organization_compliance" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "compliance_definition_name" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_section_groups" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "compliance_definition_name" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_section_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_sections" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dependency" JSONB NOT NULL,
    "category_idx" INTEGER NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compliance_section_group_id" TEXT NOT NULL,
    "compliance_definitions_id" TEXT,

    CONSTRAINT "compliance_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_questions" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "tooltip" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "rubric" JSONB NOT NULL,
    "options" JSONB NOT NULL,
    "operator" TEXT NOT NULL,
    "comparison" TEXT NOT NULL,
    "dependency_expression" TEXT NOT NULL,
    "question_summary" TEXT NOT NULL,
    "additional_context" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compliance_section_id" TEXT NOT NULL,

    CONSTRAINT "compliance_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliance_statuses" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "organization_compliance_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliance_notes" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compliance_question_id" TEXT NOT NULL,
    "organization_compliance_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliance_note_files" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_compliance_note_id" TEXT NOT NULL,
    "organization_files_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_note_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliance_note_links" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_compliance_note_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_note_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliance_question_bookmarks" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compliance_question_id" TEXT NOT NULL,
    "organization_compliance_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_question_bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliance_responses" (
    "id" TEXT NOT NULL,
    "value" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compliance_question_id" TEXT NOT NULL,
    "organization_compliance_id" TEXT NOT NULL,
    "organization_compliance_ai_response_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliance_ai_responses" (
    "id" TEXT NOT NULL,
    "answer" TEXT,
    "justification" TEXT NOT NULL,
    "references" JSONB NOT NULL,
    "sources" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "compliance_question_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_ai_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliance_ai_response_files" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "organization_files_id" TEXT NOT NULL,
    "organization_compliance_ai_response_id" TEXT NOT NULL,

    CONSTRAINT "organization_compliance_ai_response_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_compliance_organization_id_compliance_definiti_key" ON "organization_compliance"("organization_id", "compliance_definition_name");

-- AddForeignKey
ALTER TABLE "organization_compliance" ADD CONSTRAINT "organization_compliance_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance" ADD CONSTRAINT "organization_compliance_compliance_definition_name_fkey" FOREIGN KEY ("compliance_definition_name") REFERENCES "compliance_definitions"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_section_groups" ADD CONSTRAINT "compliance_section_groups_compliance_definition_name_fkey" FOREIGN KEY ("compliance_definition_name") REFERENCES "compliance_definitions"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_section_group_id_fkey" FOREIGN KEY ("compliance_section_group_id") REFERENCES "compliance_section_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_definitions_id_fkey" FOREIGN KEY ("compliance_definitions_id") REFERENCES "compliance_definitions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_questions" ADD CONSTRAINT "compliance_questions_compliance_section_id_fkey" FOREIGN KEY ("compliance_section_id") REFERENCES "compliance_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_statuses" ADD CONSTRAINT "organization_compliance_statuses_organization_compliance_i_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_notes" ADD CONSTRAINT "organization_compliance_notes_compliance_question_id_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_notes" ADD CONSTRAINT "organization_compliance_notes_organization_compliance_id_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_note_files" ADD CONSTRAINT "organization_compliance_note_files_organization_compliance_fkey" FOREIGN KEY ("organization_compliance_note_id") REFERENCES "organization_compliance_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_note_files" ADD CONSTRAINT "organization_compliance_note_files_organization_files_id_fkey" FOREIGN KEY ("organization_files_id") REFERENCES "organization_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_note_links" ADD CONSTRAINT "organization_compliance_note_links_organization_compliance_fkey" FOREIGN KEY ("organization_compliance_note_id") REFERENCES "organization_compliance_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_question_bookmarks" ADD CONSTRAINT "organization_compliance_question_bookmarks_compliance_ques_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_question_bookmarks" ADD CONSTRAINT "organization_compliance_question_bookmarks_organization_co_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_responses" ADD CONSTRAINT "ai_response_id" FOREIGN KEY ("organization_compliance_ai_response_id") REFERENCES "organization_compliance_ai_responses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_responses" ADD CONSTRAINT "organization_compliance_responses_compliance_question_id_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_responses" ADD CONSTRAINT "organization_compliance_responses_organization_compliance__fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_responses" ADD CONSTRAINT "organization_compliance_ai_responses_compliance_question_i_fkey" FOREIGN KEY ("compliance_question_id") REFERENCES "compliance_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_response_files" ADD CONSTRAINT "organization_compliance_ai_response_files_organization_fil_fkey" FOREIGN KEY ("organization_files_id") REFERENCES "organization_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_ai_response_files" ADD CONSTRAINT "organization_compliance_ai_response_files_organization_com_fkey" FOREIGN KEY ("organization_compliance_ai_response_id") REFERENCES "organization_compliance_ai_responses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
