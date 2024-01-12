/*
  Warnings:

  - You are about to drop the column `access_type` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `activity_id` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `audit_trail` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `data_quality_flags` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `source_dataset` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `source_lca_activity` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `emissions` table. All the data in the column will be lost.
  - Added the required column `co2_calcuation_method` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `co2e` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `co2e_calculation_origin` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `co2e_unit` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emission_factor` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "access_type",
DROP COLUMN "activity_id",
DROP COLUMN "audit_trail",
DROP COLUMN "data_quality_flags",
DROP COLUMN "source",
DROP COLUMN "source_dataset",
DROP COLUMN "source_lca_activity",
DROP COLUMN "year",
ADD COLUMN     "co2_calcuation_method" TEXT NOT NULL,
ADD COLUMN     "co2e" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "co2e_calculation_origin" TEXT NOT NULL,
ADD COLUMN     "co2e_unit" TEXT NOT NULL,
ADD COLUMN     "emission_factor" JSONB NOT NULL;
