/*
  Warnings:

  - Changed the type of `level` on the `claims` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "claim_levels" AS ENUM ('ORGANIZATION', 'SUPPLIER', 'PRODUCT', 'MATERIAL');

-- AlterTable
ALTER TABLE "claims" DROP COLUMN "level",
ADD COLUMN     "level" "claim_levels" NOT NULL;

-- AlterTable
ALTER TABLE "organization_claims" ALTER COLUMN "issued_date" DROP NOT NULL,
ALTER COLUMN "effective_date" DROP NOT NULL;

-- DropEnum
DROP TYPE "claim_level";

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facility_footprints" ADD CONSTRAINT "facility_footprints_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
