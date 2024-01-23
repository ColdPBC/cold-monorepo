/*
  Warnings:

  - Added the required column `filename` to the `organization_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `organization_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `organization_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization_files" ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "openai_assistant_id" DROP NOT NULL,
ALTER COLUMN "openai_file_id" DROP NOT NULL,
ALTER COLUMN "integration_id" DROP NOT NULL;
