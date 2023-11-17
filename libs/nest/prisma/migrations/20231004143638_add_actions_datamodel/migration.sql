-- CreateTable
CREATE TABLE "action_definitions" (
    "id" TEXT NOT NULL,
    "definition" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "action_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_assignments" (
    "id" TEXT NOT NULL,
    "definition" JSONB NOT NULL,
    "action_definition_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "action_assignments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "action_assignments" ADD CONSTRAINT "action_assignments_action_definition_id_fkey" FOREIGN KEY ("action_definition_id") REFERENCES "action_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_assignments" ADD CONSTRAINT "action_assignments_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
