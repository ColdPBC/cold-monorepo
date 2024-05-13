/*
  Warnings:

  - A unique constraint covering the columns `[compliance_definition_name,key]` on the table `compliance_sections` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "compliance_questions" ADD COLUMN     "compliance_dependency_chain_id" TEXT,
ADD COLUMN     "dependencies" JSONB;

-- AlterTable
ALTER TABLE "compliance_sections" ADD COLUMN     "compliance_dependency_chain_id" TEXT;

-- CreateTable
CREATE TABLE "compliance_dependency_chains" (
    "id" TEXT NOT NULL,
    "dependency_chain" JSONB NOT NULL,
    "compliance_question_id" TEXT NOT NULL,
    "compliance_question_key" TEXT NOT NULL,
    "compliance_section_id" TEXT NOT NULL,
    "compliance_section_key" TEXT NOT NULL,
    "compliance_section_group_id" TEXT NOT NULL,
    "compliance_defnition_name" TEXT NOT NULL,
    "dependency_expression" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_dependency_chains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "compliance_dependency_chains_compliance_question_id_key" ON "compliance_dependency_chains"("compliance_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_dependency_chains_compliance_section_id_complian_key" ON "compliance_dependency_chains"("compliance_section_id", "compliance_question_key", "compliance_defnition_name");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_dependency_chains_compliance_section_key_complia_key" ON "compliance_dependency_chains"("compliance_section_key", "compliance_question_key", "compliance_defnition_name");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_sections_compliance_definition_name_key_key" ON "compliance_sections"("compliance_definition_name", "key");

-- AddForeignKey
ALTER TABLE "compliance_sections" ADD CONSTRAINT "compliance_sections_compliance_dependency_chain_id_fkey" FOREIGN KEY ("compliance_dependency_chain_id") REFERENCES "compliance_dependency_chains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_questions" ADD CONSTRAINT "compliance_questions_compliance_dependency_chain_id_fkey" FOREIGN KEY ("compliance_dependency_chain_id") REFERENCES "compliance_dependency_chains"("id") ON DELETE SET NULL ON UPDATE CASCADE;
