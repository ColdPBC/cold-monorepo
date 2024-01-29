-- CreateTable
CREATE TABLE "supported_utilities" (
    "id" TEXT NOT NULL,
    "service_definition_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supported_utilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supported_utilities_name_key" ON "supported_utilities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "supported_utilities_id_key" ON "supported_utilities"("id");

-- AddForeignKey
ALTER TABLE "supported_utilities" ADD CONSTRAINT "supported_utilities_service_definition_id_fkey" FOREIGN KEY ("service_definition_id") REFERENCES "service_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supported_utilities" ADD CONSTRAINT "supported_utilities_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
