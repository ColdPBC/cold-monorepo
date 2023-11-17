-- CreateTable
CREATE TABLE "survey_definitions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "survey_types" NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "definition" JSONB NOT NULL,

    CONSTRAINT "survey_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "survey_data" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "survey_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "survey_definitions_name_key" ON "survey_definitions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "survey_data_id_key" ON "survey_data"("id");

-- AddForeignKey
ALTER TABLE "survey_data" ADD CONSTRAINT "survey_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
