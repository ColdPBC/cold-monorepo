/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,original_name]` on the table `organization_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id,openai_assistant_id]` on the table `organization_files` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "organization_files" ALTER COLUMN "bucket" DROP NOT NULL,
ALTER COLUMN "key" DROP NOT NULL,
ALTER COLUMN "mimetype" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "acl" DROP NOT NULL,
ALTER COLUMN "contentType" DROP NOT NULL,
ALTER COLUMN "encoding" DROP NOT NULL,
ALTER COLUMN "fieldname" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "versionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organization_files_organization_id_original_name_key" ON "organization_files"("organization_id", "original_name");

-- CreateIndex
CREATE UNIQUE INDEX "organization_files_organization_id_openai_assistant_id_key" ON "organization_files"("organization_id", "openai_assistant_id");
