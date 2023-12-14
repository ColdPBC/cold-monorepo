/*
  Warnings:

  - Added the required column `type` to the `service_definitions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "integration_service_type" AS ENUM ('provider', 'platform', 'core');

-- AlterTable
ALTER TABLE "service_definitions" ADD COLUMN     "type" "integration_service_type" NOT NULL;
