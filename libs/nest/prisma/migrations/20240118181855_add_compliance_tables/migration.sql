-- CreateTable
CREATE TABLE "compliance_definitions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "surveys" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_compliances" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "compliance_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_compliances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "compliance_definitions_name_key" ON "compliance_definitions"("name");

-- AddForeignKey
ALTER TABLE "organization_compliances" ADD CONSTRAINT "organization_compliances_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliances" ADD CONSTRAINT "organization_compliances_compliance_id_fkey" FOREIGN KEY ("compliance_id") REFERENCES "compliance_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
