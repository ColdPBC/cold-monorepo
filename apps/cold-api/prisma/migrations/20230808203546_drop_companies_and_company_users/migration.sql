/*
  Warnings:

  - You are about to drop the column `organizationsId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_users" DROP CONSTRAINT "company_users_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_users" DROP CONSTRAINT "company_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_company_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organizationsId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "organizationsId";

-- DropTable
DROP TABLE "companies";

-- DropTable
DROP TABLE "company_users";
