/*
  Warnings:

  - You are about to drop the column `embedding` on the `vector_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vector_records" DROP COLUMN "embedding",
ADD COLUMN     "values" JSONB;
