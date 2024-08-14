/*
  Warnings:

  - Changed the type of `type` on the `claims` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "certification_types" AS ENUM ('THIRD_PARTY', 'INTERNAL', 'TEST');

-- CreateEnum
CREATE TYPE "claim_types" AS ENUM ('THIRD_PARTY', 'INTERNAL', 'TEST');

-- AlterTable
ALTER TABLE "claims" DROP COLUMN "type",
ADD COLUMN     "type" "claim_types" NOT NULL;

-- DropEnum
DROP TYPE "claim_type";
