-- AlterTable
ALTER TABLE "organization_locations" ADD COLUMN     "address_line_2" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "country" SET DEFAULT 'US';
