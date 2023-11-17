/*
  Warnings:

  - You are about to drop the `form_definitions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `policy_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `signed_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "component_definition_types" AS ENUM ('UNKNOWN', 'FORM', 'NAVIGATION_SIDE', 'NAVIGATION_HEADER', 'NAVIGATION_FOOTER', 'DATAGRID');

-- DropForeignKey
ALTER TABLE "form_data" DROP CONSTRAINT "form_data_form_name_fkey";

-- DropForeignKey
ALTER TABLE "signed_data" DROP CONSTRAINT "signed_data_id_fkey";

-- DropForeignKey
ALTER TABLE "signed_data" DROP CONSTRAINT "signed_data_organization_id_fkey";

-- DropTable
DROP TABLE "form_definitions";

-- DropTable
DROP TABLE "policy_content";

-- DropTable
DROP TABLE "signed_data";

-- CreateTable
CREATE TABLE "component_definitions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "component_definition_types" NOT NULL DEFAULT 'UNKNOWN',
    "description" TEXT NOT NULL,
    "definition" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "component_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "component_data" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "form_name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "component_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "component_definitions_name_key" ON "component_definitions"("name");

-- AddForeignKey
ALTER TABLE "component_data" ADD CONSTRAINT "component_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "component_data" ADD CONSTRAINT "component_data_form_name_fkey" FOREIGN KEY ("form_name") REFERENCES "component_definitions"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
