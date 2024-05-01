/*
  Warnings:

  - You are about to drop the column `dependency` on the `compliance_sections` table. All the data in the column will be lost.
  - Added the required column `dependency_expression` to the `compliance_sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compliance_sections" DROP COLUMN "dependency",
ADD COLUMN     "dependency_expression" TEXT NOT NULL;
