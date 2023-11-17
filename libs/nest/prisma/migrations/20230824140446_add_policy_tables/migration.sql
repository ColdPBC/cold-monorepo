-- CreateTable
CREATE TABLE "signed_data" (
    "email" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "policy_content" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signed_data_email_id_key" ON "signed_data"("email", "id");

-- CreateIndex
CREATE UNIQUE INDEX "policy_content_name_key" ON "policy_content"("name");

-- AddForeignKey
ALTER TABLE "signed_data" ADD CONSTRAINT "signed_data_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signed_data" ADD CONSTRAINT "signed_data_id_fkey" FOREIGN KEY ("id") REFERENCES "policy_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
