-- CreateEnum
CREATE TYPE "survey_status_types" AS ENUM ('user_submitted', 'cold_submitted', 'draft');

-- CreateTable
CREATE TABLE "survey_status" (
    "id" TEXT NOT NULL,
    "survey_id" TEXT NOT NULL,
    "survey_name" TEXT NOT NULL,
    "survey_data_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "status" "survey_status_types" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "survey_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "survey_status_survey_name_key" ON "survey_status"("survey_name");

-- AddForeignKey
ALTER TABLE "survey_status" ADD CONSTRAINT "survey_status_survey_data_id_fkey" FOREIGN KEY ("survey_data_id") REFERENCES "survey_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_status" ADD CONSTRAINT "survey_status_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_status" ADD CONSTRAINT "survey_status_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "survey_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
