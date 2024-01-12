/*
  Warnings:

  - You are about to drop the column `category` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `consumption` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `consumption_unit` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `emission` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `period_from` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `period_to` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory` on the `emissions` table. All the data in the column will be lost.
  - Added the required column `access_type` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity_data` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity_id` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audit_trail` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categrory` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `constituent_cases` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_quality_flags` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `integration_data` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_dataset` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_lca_activity` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "category",
DROP COLUMN "consumption",
DROP COLUMN "consumption_unit",
DROP COLUMN "emission",
DROP COLUMN "period_from",
DROP COLUMN "period_to",
DROP COLUMN "subcategory",
ADD COLUMN     "access_type" TEXT NOT NULL,
ADD COLUMN     "activity_data" JSONB NOT NULL,
ADD COLUMN     "activity_id" TEXT NOT NULL,
ADD COLUMN     "audit_trail" TEXT NOT NULL,
ADD COLUMN     "categrory" TEXT NOT NULL,
ADD COLUMN     "constituent_cases" JSONB NOT NULL,
ADD COLUMN     "data_quality_flags" JSONB NOT NULL,
ADD COLUMN     "integration_data" JSONB NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "source_dataset" TEXT NOT NULL,
ADD COLUMN     "source_lca_activity" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
