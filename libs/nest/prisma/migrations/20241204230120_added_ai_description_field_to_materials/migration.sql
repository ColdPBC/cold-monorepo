/*
  Warnings:

  - You are about to drop the column `desription` on the `materials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "materials" DROP COLUMN "desription",
ADD COLUMN     "ai_description" TEXT,
ADD COLUMN     "description" TEXT;
