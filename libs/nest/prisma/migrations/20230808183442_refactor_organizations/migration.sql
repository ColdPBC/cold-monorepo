/*
  Warnings:

  - You are about to drop the column `org_display_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `org_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `org_metadata` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `org_name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "org_display_name",
DROP COLUMN "org_id",
DROP COLUMN "org_metadata",
DROP COLUMN "org_name",
ADD COLUMN     "organizationsId" TEXT;

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enabled_connections" JSONB NOT NULL,
    "display_name" TEXT NOT NULL,
    "branding" JSONB,
    "phone" TEXT,
    "email" TEXT,
    "street_address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
