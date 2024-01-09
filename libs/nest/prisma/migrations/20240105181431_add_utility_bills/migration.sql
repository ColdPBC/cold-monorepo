/*
  Warnings:

  - You are about to drop the column `description` on the `emissions` table. All the data in the column will be lost.
  - Added the required column `data_source_id` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "description",
ADD COLUMN     "data_source_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "utility_bills" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "integration_id" TEXT NOT NULL,
    "period_from" TIMESTAMP(3) NOT NULL,
    "period_to" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utility_bills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "utility_bills" ADD CONSTRAINT "utility_bills_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utility_bills" ADD CONSTRAINT "utility_bills_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
