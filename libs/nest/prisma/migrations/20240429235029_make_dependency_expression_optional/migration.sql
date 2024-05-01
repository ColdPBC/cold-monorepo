-- AlterTable
ALTER TABLE "compliance_questions" ALTER COLUMN "dependency_expression" DROP NOT NULL;

-- AlterTable
ALTER TABLE "compliance_sections" ALTER COLUMN "dependency_expression" DROP NOT NULL;
