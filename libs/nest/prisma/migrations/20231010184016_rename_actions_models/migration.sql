/*
  Warnings:

  - You are about to drop the `action_assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `action_definitions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "action_assignments" DROP CONSTRAINT "action_assignments_action_definition_id_fkey";

-- DropForeignKey
ALTER TABLE "action_assignments" DROP CONSTRAINT "action_assignments_organization_id_fkey";

-- DropTable
DROP TABLE "action_assignments";

-- DropTable
DROP TABLE "action_definitions";

-- CreateTable
CREATE TABLE "action_templates" (
    "id" TEXT NOT NULL,
    "template" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "action_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" TEXT NOT NULL,
    "action" JSONB NOT NULL,
    "action_template_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_action_template_id_fkey" FOREIGN KEY ("action_template_id") REFERENCES "action_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
