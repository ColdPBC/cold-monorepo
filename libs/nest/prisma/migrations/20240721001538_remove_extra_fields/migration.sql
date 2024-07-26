/*
  Warnings:

  - You are about to drop the column `issuer` on the `certification_claims` table. All the data in the column will be lost.
  - You are about to drop the column `document_url` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `logo_url` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `certifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "certification_claims" DROP COLUMN "issuer";

-- AlterTable
ALTER TABLE "certifications" DROP COLUMN "document_url",
DROP COLUMN "logo_url",
DROP COLUMN "website";
