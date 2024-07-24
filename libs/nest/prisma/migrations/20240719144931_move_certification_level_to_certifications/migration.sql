/*
  Warnings:

  - You are about to drop the column `certification_level` on the `certification_claims` table. All the data in the column will be lost.
  - Added the required column `level` to the `certifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certification_claims" DROP COLUMN "certification_level";

-- AlterTable
ALTER TABLE "certifications" ADD COLUMN     "level" "certification_level" NOT NULL,
ALTER COLUMN "document_url" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL;
