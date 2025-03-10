-- CreateTable
CREATE TABLE "ecoinvent_imports" (
    "id" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "activity_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "reference_product" TEXT NOT NULL,
    "job_id" BIGINT,
    "job_status" TEXT,
    "processing_status" "processing_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ecoinvent_imports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ecoinvent_data" (
    "id" TEXT NOT NULL,
    "import_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "xml" TEXT,
    "parsed" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ecoinvent_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_imports_key_key" ON "ecoinvent_imports"("key");

-- CreateIndex
CREATE INDEX "ecoinvent_imports_processing_status_idx1" ON "ecoinvent_imports"("processing_status");

-- CreateIndex
CREATE INDEX "ecoinvent_imports_key_idx1" ON "ecoinvent_imports"("key");

-- CreateIndex
CREATE INDEX "ecoinvent_imports_activity_name_idx1" ON "ecoinvent_imports"("activity_name");

-- CreateIndex
CREATE INDEX "ecoinvent_imports_location_idx1" ON "ecoinvent_imports"("location");

-- CreateIndex
CREATE INDEX "ecoinvent_imports_reference_product_idx1" ON "ecoinvent_imports"("reference_product");

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_data_key_key" ON "ecoinvent_data"("key");

-- CreateIndex
CREATE INDEX "ecoinvent_data_key_idx1" ON "ecoinvent_data"("key");

-- AddForeignKey
ALTER TABLE "ecoinvent_data" ADD CONSTRAINT "ecoinvent_data_import_id_fkey" FOREIGN KEY ("import_id") REFERENCES "ecoinvent_imports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
