-- CreateTable
CREATE TABLE "category_definitions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "definition" JSONB NOT NULL,

    CONSTRAINT "category_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_data" (
    "id" TEXT NOT NULL,
    "category_definition_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_definitions_name_key" ON "category_definitions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_data_id_key" ON "category_data"("id");

-- AddForeignKey
ALTER TABLE "category_data" ADD CONSTRAINT "category_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_data" ADD CONSTRAINT "category_data_category_definition_id_fkey" FOREIGN KEY ("category_definition_id") REFERENCES "category_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
