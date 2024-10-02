-- AlterTable
ALTER TABLE "organization_facilities" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "deleted" DROP NOT NULL;
