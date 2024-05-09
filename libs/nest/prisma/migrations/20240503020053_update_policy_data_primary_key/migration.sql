/*
  Warnings:

  - A unique constraint covering the columns `[email,id]` on the table `policy_data` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "policy_data_email_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "policy_data_email_id_key" ON "policy_data"("email", "id");
