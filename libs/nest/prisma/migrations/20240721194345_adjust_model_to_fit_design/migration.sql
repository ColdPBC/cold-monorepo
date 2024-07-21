/*
  Warnings:

  - You are about to drop the column `expiration_date` on the `certification_claims` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `certification_claims` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `certifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "certification_types" AS ENUM ('THIRD_PARTY', 'INTERNAL', 'TEST');

-- AlterTable
ALTER TABLE "certification_claims" DROP COLUMN "expiration_date",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "certifications" DROP COLUMN "type",
ADD COLUMN     "type" "certification_types" NOT NULL;

-- AlterTable
ALTER TABLE "organization_files" ADD COLUMN     "expires_at" TIMESTAMP(3);
