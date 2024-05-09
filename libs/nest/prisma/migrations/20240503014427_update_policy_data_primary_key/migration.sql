
-- DropForeignKey
ALTER TABLE "policy_data" DROP CONSTRAINT "policy_data_id_fkey";

-- AlterTable
ALTER TABLE "policy_data" RENAME COLUMN "id" TO "policy_id";
ALTER TABLE "policy_data" ADD COLUMN "id" SERIAL PRIMARY KEY;
-- AddForeignKey
ALTER TABLE "policy_data" ADD CONSTRAINT "policy_data_policy_id_fkey" FOREIGN KEY ("policy_id") REFERENCES "policy_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;


