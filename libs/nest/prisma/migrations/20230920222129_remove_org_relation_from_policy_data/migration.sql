/*
  Warnings:

  - You are about to drop the column `organization_id` on the `policy_data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "policy_data" DROP CONSTRAINT "policy_data_organization_id_fkey";

-- AlterTable
ALTER TABLE "policy_data" DROP COLUMN "organization_id";
