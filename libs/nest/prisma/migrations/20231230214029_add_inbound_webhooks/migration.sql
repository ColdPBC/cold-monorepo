-- CreateTable
CREATE TABLE "inbound_webhooks" (
    "id" TEXT NOT NULL,
    "service_definition_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inbound_webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inbound_webhooks_id_key" ON "inbound_webhooks"("id");

-- AddForeignKey
ALTER TABLE "inbound_webhooks" ADD CONSTRAINT "inbound_webhooks_service_definition_id_fkey" FOREIGN KEY ("service_definition_id") REFERENCES "service_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbound_webhooks" ADD CONSTRAINT "inbound_webhooks_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
