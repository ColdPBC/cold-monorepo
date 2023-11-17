/*
  Warnings:

  - You are about to drop the column `policy_definition_id` on the `policy_data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "policy_data" DROP CONSTRAINT "policy_data_policy_definition_id_fkey";

-- AlterTable
ALTER TABLE "policy_data" DROP COLUMN "policy_definition_id";

-- AddForeignKey
ALTER TABLE "policy_data" ADD CONSTRAINT "policy_data_id_fkey" FOREIGN KEY ("id") REFERENCES "policy_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
