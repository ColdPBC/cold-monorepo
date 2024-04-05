/*
  Warnings:

  - Changed the type of `scope` on the `emission_scopes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "emission_scopes" ADD COLUMN     "sub_scope" INTEGER,
DROP COLUMN "scope",
ADD COLUMN     "scope" INTEGER NOT NULL;
