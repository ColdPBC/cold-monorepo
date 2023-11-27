-- AlterTable
ALTER TABLE "action_templates" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "actions" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "category_data" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "category_definitions" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "component_definitions" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "policy_data" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "policy_definitions" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "survey_data" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "survey_definitions" ALTER COLUMN "updated_at" DROP DEFAULT;
