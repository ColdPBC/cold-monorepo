/*
  Warnings:

  - You are about to drop the column `compliance_responsesId` on the `organization_compliance_responses` table. All the data in the column will be lost.
  - You are about to drop the `compliance_dependency_chains` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "compliance_questions" DROP CONSTRAINT "compliance_questions_compliance_dependency_chain_id_fkey";

-- DropForeignKey
ALTER TABLE "compliance_sections" DROP CONSTRAINT "compliance_sections_compliance_dependency_chain_id_fkey";

-- AlterTable
ALTER TABLE "compliance_questions" ADD COLUMN     "compliance_section_dependency_chainsId" TEXT;

-- AlterTable
ALTER TABLE "compliance_sections" ADD COLUMN     "compliance_section_dependency_chainsId" TEXT;

-- AlterTable
ALTER TABLE "organization_compliance_responses" DROP COLUMN "compliance_responsesId";

-- DropTable
DROP TABLE "compliance_dependency_chains";

-- CreateTable
CREATE TABLE "compliance_section_dependency_chains" (
    "id" TEXT NOT NULL,
    "dependency_chain" JSONB NOT NULL,
    "compliance_question_id" TEXT NOT NULL,
    "compliance_question_key" TEXT NOT NULL,
    "compliance_section_id" TEXT NOT NULL,
    "compliance_section_key" TEXT NOT NULL,
    "compliance_section_group_id" TEXT NOT NULL,
    "compliance_definition_name" TEXT NOT NULL,
    "dependency_expression" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_section_dependency_chains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_question_dependency_chains" (
    "id" TEXT NOT NULL,
    "dependency_chain" JSONB NOT NULL,
    "compliance_question_id" TEXT NOT NULL,
    "compliance_question_key" TEXT NOT NULL,
    "compliance_section_id" TEXT NOT NULL,
    "compliance_section_key" TEXT NOT NULL,
    "compliance_section_group_id" TEXT NOT NULL,
    "compliance_definition_name" TEXT NOT NULL,
    "dependency_expression" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_question_dependency_chains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "compliance_section_dependency_chains_compliance_question_id_key" ON "compliance_section_dependency_chains"("compliance_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_section_dependency_chains_compliance_section_id__key" ON "compliance_section_dependency_chains"("compliance_section_id", "compliance_question_key", "compliance_definition_name");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_section_dependency_chains_compliance_section_key_key" ON "compliance_section_dependency_chains"("compliance_section_key", "compliance_question_key", "compliance_definition_name");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_question_dependency_chains_compliance_question_i_key" ON "compliance_question_dependency_chains"("compliance_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_question_dependency_chains_compliance_section_id_key" ON "compliance_question_dependency_chains"("compliance_section_id", "compliance_question_key", "compliance_definition_name");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_question_dependency_chains_compliance_section_ke_key" ON "compliance_question_dependency_chains"("compliance_section_key", "compliance_question_key", "compliance_definition_name");

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_dependency_chain_id_fkey" FOREIGN KEY ("compliance_dependency_chain_id") REFERENCES "compliance_question_dependency_chains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_section_dependency_chainsId_fkey" FOREIGN KEY ("compliance_section_dependency_chainsId") REFERENCES "compliance_section_dependency_chains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_questions" ADD CONSTRAINT "compliance_questions_compliance_dependency_chain_id_fkey" FOREIGN KEY ("compliance_dependency_chain_id") REFERENCES "compliance_question_dependency_chains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_questions" ADD CONSTRAINT "compliance_questions_compliance_section_dependency_chainsI_fkey" FOREIGN KEY ("compliance_section_dependency_chainsId") REFERENCES "compliance_section_dependency_chains"("id") ON DELETE SET NULL ON UPDATE CASCADE;
