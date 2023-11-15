-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roles" SET NOT NULL,
ALTER COLUMN "roles" SET DEFAULT 'company:member',
ALTER COLUMN "roles" SET DATA TYPE TEXT;
