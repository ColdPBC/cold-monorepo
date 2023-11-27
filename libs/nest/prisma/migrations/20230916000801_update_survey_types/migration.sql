/*
  Warnings:

  - The values [MATURITY] on the enum `survey_types` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "survey_types_new" AS ENUM ('JOURNEY', 'FOOTPRINT', 'ENRICHMENT', 'SOLUTION');
ALTER TABLE "survey_definitions" ALTER COLUMN "type" TYPE "survey_types_new" USING ("type"::text::"survey_types_new");
ALTER TYPE "survey_types" RENAME TO "survey_types_old";
ALTER TYPE "survey_types_new" RENAME TO "survey_types";
DROP TYPE "survey_types_old";
COMMIT;
