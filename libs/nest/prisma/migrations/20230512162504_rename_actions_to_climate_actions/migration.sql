/*
  Warnings:

  - You are about to drop the `action_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `actions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company-climate-actions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "actions" DROP CONSTRAINT "actions_action_category_id_fkey";

-- DropForeignKey
ALTER TABLE "company_actions" DROP CONSTRAINT "company_actions_action_id_fkey";

-- DropForeignKey
ALTER TABLE "company_actions" DROP CONSTRAINT "company_actions_company_id_fkey";

-- DropTable
DROP TABLE "action_categories";

-- DropTable
DROP TABLE "actions";

-- DropTable
DROP TABLE "company_actions";

-- CreateTable
CREATE TABLE "climate_action_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "climate_action_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "climate_actions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "effort" JSONB NOT NULL,
    "impact" JSONB NOT NULL,
    "action_category_id" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "climate_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_climate_actions" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "action_id" TEXT NOT NULL,
    "action_overrides" JSONB,
    "inProgress" BOOLEAN NOT NULL DEFAULT false,
    "expected_start_date" TIMESTAMP(3),
    "expected_end_date" TIMESTAMP(3),
    "priority" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_climate_actions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "climate_action_categories_name_key" ON "climate_action_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "climate_actions_name_key" ON "climate_actions"("name");

-- AddForeignKey
ALTER TABLE "climate_actions" ADD CONSTRAINT "climate_actions_action_category_id_fkey" FOREIGN KEY ("action_category_id") REFERENCES "climate_action_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_climate_actions" ADD CONSTRAINT "company_climate_actions_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "climate_actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_climate_actions" ADD CONSTRAINT "company_climate_actions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
