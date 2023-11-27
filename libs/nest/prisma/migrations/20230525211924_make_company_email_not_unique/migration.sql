/*
  Warnings:

  - A unique constraint covering the columns `[org_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "companies_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "companies_org_id_key" ON "companies"("org_id");
