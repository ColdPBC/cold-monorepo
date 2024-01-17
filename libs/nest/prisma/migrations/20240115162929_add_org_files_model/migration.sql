-- CreateTable
CREATE TABLE "organization_files" (
    "bucket" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "openai_assistant_id" TEXT NOT NULL,
    "openai_file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_files_openai_file_id_key" ON "organization_files"("openai_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_files_organization_id_bucket_key_key" ON "organization_files"("organization_id", "bucket", "key");

-- AddForeignKey
ALTER TABLE "organization_files" ADD CONSTRAINT "organization_files_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
