-- AlterTable
ALTER TABLE "emission_scopes"
  RENAME COLUMN "scope" TO "ghg_category";
ALTER TABLE "emission_scopes"
  RENAME COLUMN "sub_scope" TO "ghg_subcategory";
