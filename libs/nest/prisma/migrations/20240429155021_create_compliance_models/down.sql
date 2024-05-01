-- DropForeignKey
ALTER TABLE "organization_compliance" DROP CONSTRAINT "organization_compliance_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance" DROP CONSTRAINT "organization_compliance_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "compliance_section_groups" DROP CONSTRAINT "compliance_section_groups_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_section_group_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_definitions_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_questions" DROP CONSTRAINT "compliance_questions_compliance_section_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_statuses" DROP CONSTRAINT "organization_compliance_statuses_organization_compliance_i_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_notes" DROP CONSTRAINT "organization_compliance_notes_compliance_question_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_notes" DROP CONSTRAINT "organization_compliance_notes_organization_compliance_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_note_files" DROP CONSTRAINT "organization_compliance_note_files_organization_compliance_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_note_files" DROP CONSTRAINT "organization_compliance_note_files_organization_files_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_note_links" DROP CONSTRAINT "organization_compliance_note_links_organization_compliance_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_question_bookmarks" DROP CONSTRAINT "organization_compliance_question_bookmarks_compliance_ques_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_question_bookmarks" DROP CONSTRAINT "organization_compliance_question_bookmarks_organization_co_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_responses" DROP CONSTRAINT "ai_response_id";

-- DropForeignKey
ALTER TABLE "organization_compliance_responses" DROP CONSTRAINT "organization_compliance_responses_compliance_question_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_responses" DROP CONSTRAINT "organization_compliance_responses_organization_compliance__fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_ai_responses" DROP CONSTRAINT "organization_compliance_ai_responses_compliance_question_i_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_ai_response_files" DROP CONSTRAINT "organization_compliance_ai_response_files_organization_fil_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliance_ai_response_files" DROP CONSTRAINT "organization_compliance_ai_response_files_organization_com_fkey";

-- AlterTable
ALTER TABLE "compliance_definitions" DROP COLUMN "custom",
DROP COLUMN "image_url",
DROP COLUMN "metadata",
DROP COLUMN "order",
DROP COLUMN "version";

-- DropTable
DROP TABLE "organization_compliance";

-- DropTable
DROP TABLE "compliance_section_groups";

-- DropTable
DROP TABLE "compliance_sections";

-- DropTable
DROP TABLE "compliance_questions";

-- DropTable
DROP TABLE "organization_compliance_statuses";

-- DropTable
DROP TABLE "organization_compliance_notes";

-- DropTable
DROP TABLE "organization_compliance_note_files";

-- DropTable
DROP TABLE "organization_compliance_note_links";

-- DropTable
DROP TABLE "organization_compliance_question_bookmarks";

-- DropTable
DROP TABLE "organization_compliance_responses";

-- DropTable
DROP TABLE "organization_compliance_ai_responses";

-- DropTable
DROP TABLE "organization_compliance_ai_response_files";

