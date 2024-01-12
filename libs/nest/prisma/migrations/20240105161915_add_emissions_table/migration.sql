/*
  Warnings:

  - You are about to drop the `inbound_webhooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inbound_webhooks" DROP CONSTRAINT "inbound_webhooks_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "inbound_webhooks" DROP CONSTRAINT "inbound_webhooks_service_definition_id_fkey";

-- DropTable
DROP TABLE "inbound_webhooks";

-- CreateTable
CREATE TABLE "emissions" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "category" "emissions_categories" NOT NULL,
    "subcategory" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "consumption_unit" TEXT NOT NULL,
    "consumption" DOUBLE PRECISION NOT NULL,
    "emission" DOUBLE PRECISION NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emissions" ADD CONSTRAINT "emissions_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
