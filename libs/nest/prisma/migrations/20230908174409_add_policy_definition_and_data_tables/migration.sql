-- CreateEnum
CREATE TYPE "survey_types" AS ENUM ('FOOTPRINT', 'MATURITY');

-- CreateTable
CREATE TABLE "policy_defnitions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_defnitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policy_data" (
    "email" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "policy_defnition_id" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "policy_data_email_id_key" ON "policy_data"("email", "id");

-- AddForeignKey
ALTER TABLE "policy_data" ADD CONSTRAINT "policy_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_data" ADD CONSTRAINT "policy_data_policy_defnition_id_fkey" FOREIGN KEY ("policy_defnition_id") REFERENCES "policy_defnitions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
