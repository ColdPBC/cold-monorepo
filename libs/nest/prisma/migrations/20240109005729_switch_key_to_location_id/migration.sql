/*
  Warnings:

  - A unique constraint covering the columns `[service_definition_id,location_id]` on the table `integrations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "integrations_service_definition_id_organization_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "integrations_service_definition_id_location_id_key" ON "integrations"("service_definition_id", "location_id");
