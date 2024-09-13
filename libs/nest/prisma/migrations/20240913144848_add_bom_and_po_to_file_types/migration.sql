-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "file_types" ADD VALUE 'PURCHASE_ORDER';
ALTER TYPE "file_types" ADD VALUE 'BILL_OF_MATERIALS';

-- DropIndex
DROP INDEX "products_name_key";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "product_category_heirarchy" JSONB,
ADD COLUMN     "season_code" TEXT,
ADD COLUMN     "style_code" TEXT;
