-- AlterTable
ALTER TABLE "compliance_definitions" ALTER COLUMN "logo_url" DROP NOT NULL,
ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "order" DROP NOT NULL,
ALTER COLUMN "version" DROP NOT NULL;
