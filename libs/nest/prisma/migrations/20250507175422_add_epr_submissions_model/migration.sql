-- CreateTable
CREATE TABLE "epr_submissions" (
    "id" SERIAL NOT NULL,
    "organization_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "bill_identifier" TEXT NOT NULL,
    "due_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "submitted_at" TIMESTAMP(3),

    CONSTRAINT "epr_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "epr_submissions_organization_id_idx1" ON "epr_submissions"("organization_id");

-- CreateIndex
CREATE INDEX "epr_submissions_organization_id_status_idx1" ON "epr_submissions"("organization_id", "status");

-- CreateIndex
CREATE INDEX "epr_submissions_organization_id_state_idx1" ON "epr_submissions"("organization_id", "state");

-- CreateIndex
CREATE INDEX "epr_submissions_organization_id_bill_identifier_idx1" ON "epr_submissions"("organization_id", "bill_identifier");

-- CreateIndex
CREATE INDEX "epr_submissions_organization_id_due_date_idx1" ON "epr_submissions"("organization_id", "due_date");

-- CreateIndex
CREATE INDEX "epr_submissions_organization_id_submitted_at_idx1" ON "epr_submissions"("organization_id", "submitted_at");

-- CreateIndex
CREATE INDEX "epr_submissions_submitted_at_idx1" ON "epr_submissions"("submitted_at");

-- CreateIndex
CREATE INDEX "epr_submissions_status_idx1" ON "epr_submissions"("status");

-- CreateIndex
CREATE INDEX "epr_submissions_state_idx1" ON "epr_submissions"("state");

-- CreateIndex
CREATE INDEX "epr_submissions_bill_identifier_idx1" ON "epr_submissions"("bill_identifier");

-- CreateIndex
CREATE INDEX "epr_submissions_due_date_idx1" ON "epr_submissions"("due_date");

-- AddForeignKey
ALTER TABLE "epr_submissions" ADD CONSTRAINT "epr_submissions_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
