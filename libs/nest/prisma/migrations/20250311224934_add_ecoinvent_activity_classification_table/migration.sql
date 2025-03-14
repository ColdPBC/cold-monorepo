-- CreateTable
CREATE TABLE "ecoinvent_activity_classification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ecoinvent_activity_classification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ecoinvent_activity_classification_name_idx1" ON "ecoinvent_activity_classification"("name");

-- CreateIndex
CREATE INDEX "ecoinvent_activity_classification_system_idx1" ON "ecoinvent_activity_classification"("system");

-- CreateIndex
CREATE UNIQUE INDEX "ecoinvent_activity_classification_name_system_key" ON "ecoinvent_activity_classification"("name", "system");
