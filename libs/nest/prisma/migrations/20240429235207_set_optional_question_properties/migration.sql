-- AlterTable
ALTER TABLE "compliance_questions" ALTER COLUMN "tooltip" DROP NOT NULL,
ALTER COLUMN "placeholder" DROP NOT NULL,
ALTER COLUMN "options" DROP NOT NULL,
ALTER COLUMN "question_summary" DROP NOT NULL,
ALTER COLUMN "additional_context" DROP NOT NULL,
ALTER COLUMN "coresponding_question" DROP NOT NULL;
