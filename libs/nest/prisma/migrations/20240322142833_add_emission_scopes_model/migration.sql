-- CreateTable
CREATE TABLE "emission_scopes" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emission_scopes_pkey" PRIMARY KEY ("id")
);
