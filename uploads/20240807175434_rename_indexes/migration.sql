-- CreateEnum
CREATE TYPE "claim_level" AS ENUM ('Organization', 'Supplier', 'Product', 'Material');

-- CreateEnum
CREATE TYPE "claim_type" AS ENUM ('THIRD_PARTY', 'INTERNAL', 'TEST');

-- DropForeignKey
ALTER TABLE "organization_claims" DROP CONSTRAINT "organization_claims_certification_id_fkey";

-- DropIndex
DROP INDEX "certification_claims_certification_id_idx1";

-- AlterTable
ALTER TABLE "claims" ADD COLUMN "type" claim_type NOT NULL default 'THIRD_PARTY',
DROP COLUMN "level",
ADD COLUMN "level" "claim_level" NOT NULL;

DROP TYPE IF EXISTS "claim_types";

-- AlterTable
ALTER TABLE "organization_claims" RENAME COLUMN "certification_id" TO "claim_id";


-- DropEnum
DROP TYPE "certification_level";

-- CreateIndex
CREATE INDEX "organization_claims_claim_id_idx1" ON "organization_claims"("claim_id");

-- AddForeignKey
ALTER TABLE "organization_claims" ADD CONSTRAINT "organization_claims_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "certification_claims_material_id_idx1" RENAME TO "organization_claims_material_id_idx1";

-- RenameIndex
ALTER INDEX "certification_claims_organization_file_id_idx1" RENAME TO "organization_claims_organization_file_id_idx1";

-- RenameIndex
ALTER INDEX "certification_claims_organization_id_idx1" RENAME TO "organization_claims_organization_id_idx1";

-- RenameIndex
ALTER INDEX "certification_claims_product_id_idx1" RENAME TO "organization_claims_product_id_idx1";
