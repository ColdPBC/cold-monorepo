/*
  Warnings:

  - Added the required column `email` to the `survey_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "survey_status" ADD COLUMN     "email" TEXT NOT NULL;
