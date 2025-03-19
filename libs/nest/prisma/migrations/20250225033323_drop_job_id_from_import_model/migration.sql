/*
  Warnings:

  - You are about to drop the column `job_id` on the `ecoinvent_imports` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ecoinvent_imports_job_id_idx1";

-- DropIndex
DROP INDEX "ecoinvent_imports_job_id_job_status_idx1";

-- AlterTable
ALTER TABLE "ecoinvent_imports" DROP COLUMN "job_id";
