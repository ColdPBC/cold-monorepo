/*
  Warnings:

  - You are about to drop the column `compliance_dependency_chain_id` on the `compliance_questions` table. All the data in the column will be lost.
  - You are about to drop the column `compliance_section_dependency_chainsId` on the `compliance_questions` table. All the data in the column will be lost.
  - You are about to drop the column `compliance_dependency_chain_id` on the `compliance_sections` table. All the data in the column will be lost.
  - You are about to drop the column `compliance_section_dependency_chainsId` on the `compliance_sections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "compliance_questions" DROP CONSTRAINT "compliance_questions_compliance_dependency_chain_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_questions" DROP CONSTRAINT "compliance_questions_compliance_section_dependency_chainsI_fkey";

-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_dependency_chain_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_section_dependency_chainsId_fkey";

-- AlterTable
ALTER TABLE "compliance_questions" DROP COLUMN "compliance_dependency_chain_id",
DROP COLUMN "compliance_section_dependency_chainsId",
ADD COLUMN     "compliance_question_dependency_chain_id" TEXT;

-- AlterTable
ALTER TABLE "compliance_sections" DROP COLUMN "compliance_dependency_chain_id",
DROP COLUMN "compliance_section_dependency_chainsId",
ADD COLUMN     "compliance_section_dependency_chain_id" TEXT;

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_section_dependency_chain_id_fkey" FOREIGN KEY ("compliance_section_dependency_chain_id") REFERENCES "compliance_section_dependency_chains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_questions" ADD CONSTRAINT "compliance_questions_compliance_question_dependency_chain__fkey" FOREIGN KEY ("compliance_question_dependency_chain_id") REFERENCES "compliance_question_dependency_chains"("id") ON DELETE SET NULL ON UPDATE CASCADE;
