/*
  Warnings:

  - Made the column `sustainability_attribute_id` on table `attribute_assurances` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "attribute_assurances" ALTER COLUMN "sustainability_attribute_id" SET NOT NULL;
