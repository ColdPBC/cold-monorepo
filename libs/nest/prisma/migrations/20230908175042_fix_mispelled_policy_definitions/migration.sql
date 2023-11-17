/*
  Warnings:

  - You are about to drop the column `policy_defnition_id` on the `policy_data` table. All the data in the column will be lost.
  - You are about to drop the `policy_defnitions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "policy_data" DROP CONSTRAINT "policy_data_policy_defnition_id_fkey";

-- AlterTable
ALTER TABLE "policy_data" DROP COLUMN "policy_defnition_id",
ADD COLUMN     "policy_definition_id" INTEGER;

-- DropTable
DROP TABLE "policy_defnitions";

-- CreateTable
CREATE TABLE "policy_definitions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_definitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "policy_data" ADD CONSTRAINT "policy_data_policy_definition_id_fkey" FOREIGN KEY ("policy_definition_id") REFERENCES "policy_definitions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
