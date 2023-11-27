-- AlterTable
ALTER TABLE "action_templates" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "actions" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "category_data" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "category_definitions" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "component_definitions" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "policy_data" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "policy_definitions" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "survey_data" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "survey_definitions" ALTER COLUMN "created_at" DROP DEFAULT;
