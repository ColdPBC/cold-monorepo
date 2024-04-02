-- CreateTable
CREATE TABLE "vector_records" (
    "id" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "organization_compliance_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vector_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vector_records" ADD CONSTRAINT "vector_records_organization_compliance_id_fkey" FOREIGN KEY ("organization_compliance_id") REFERENCES "organization_compliances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
