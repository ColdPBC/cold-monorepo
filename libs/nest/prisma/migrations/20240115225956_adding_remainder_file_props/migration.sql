/*
  Warnings:

  - You are about to drop the column `filename` on the `organization_files` table. All the data in the column will be lost.
  - Added the required column `acl` to the `organization_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `organization_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encoding` to the `organization_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldname` to the `organization_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `organization_files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionId` to the `organization_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization_files" DROP COLUMN "filename",
ADD COLUMN     "acl" TEXT NOT NULL,
ADD COLUMN     "contentType" TEXT NOT NULL,
ADD COLUMN     "encoding" TEXT NOT NULL,
ADD COLUMN     "fieldname" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "versionId" TEXT NOT NULL;
