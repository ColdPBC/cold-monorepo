/*
  Warnings:

  - The required column `id` was added to the `organization_files` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `integration_id` to the `organization_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization_files" ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "integration_id" TEXT NOT NULL,
ADD CONSTRAINT "organization_files_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "organization_files" ADD CONSTRAINT "organization_files_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
