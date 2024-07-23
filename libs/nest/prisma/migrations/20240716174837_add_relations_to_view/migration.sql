-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_compliance_definition_name_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_compliance_question_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_compliance_section_group_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_compliance_section_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_organization_compliance_ai_response_i_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_organization_compliance_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_responses" DROP CONSTRAINT "compliance_responses_organization_compliance_response_id_fkey";
