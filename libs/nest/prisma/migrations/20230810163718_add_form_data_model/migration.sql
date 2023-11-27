/*
  Warnings:

  - Made the column `created_at` on table `form_definitions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
*/

-- Add Missing created_at Dates
UPDATE form_definitions SET created_at = updated_at WHERE created_at ISNULL;

UPDATE organizations SET created_at = updated_at WHERE created_at ISNULL;

UPDATE users SET created_at = updated_at WHERE created_at ISNULL;

-- AlterTable
ALTER TABLE "form_definitions" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "form_data" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "form_name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "form_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "form_data" ADD CONSTRAINT "form_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_data" ADD CONSTRAINT "form_data_form_name_fkey" FOREIGN KEY ("form_name") REFERENCES "form_definitions"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
