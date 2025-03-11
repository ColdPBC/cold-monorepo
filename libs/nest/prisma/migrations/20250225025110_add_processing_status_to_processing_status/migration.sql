-- AlterEnum
ALTER TYPE "processing_status" ADD VALUE 'JOB_PROCESSING';

-- CreateIndex
CREATE INDEX "ecoinvent_imports_job_id_idx1" ON "ecoinvent_imports"("job_id");

-- CreateIndex
CREATE INDEX "ecoinvent_imports_job_status_idx1" ON "ecoinvent_imports"("job_status");

-- CreateIndex
CREATE INDEX "ecoinvent_imports_job_id_job_status_idx1" ON "ecoinvent_imports"("job_id", "job_status");
