/*
  Warnings:

  - Added the required column `impact_method_name` to the `ecoinvent_activity_impacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ecoinvent_activity_impacts" ADD COLUMN     "impact_method_name" TEXT NOT NULL;
