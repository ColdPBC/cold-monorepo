
-- CreateTable
CREATE TABLE "organization_compliances_old" (LIKE organization_compliances INCLUDING ALL);
INSERT INTO "organization_compliances_old"
SELECT * FROM "organization_compliances";

-- CreateIndex
CREATE UNIQUE INDEX "organization_compliances_old_organization_id_compliance_id_key" ON "organization_compliances_old"("organization_id", "compliance_id");

-- AddForeignKey
ALTER TABLE "organization_compliances_old" ADD CONSTRAINT "organization_compliances_old_compliance_id_fkey" FOREIGN KEY ("compliance_id") REFERENCES "compliance_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliances_old" ADD CONSTRAINT "organization_compliances_old_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- DropForeignKey
ALTER TABLE "organization_compliances" DROP CONSTRAINT "organization_compliances_compliance_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_compliances" DROP CONSTRAINT "organization_compliances_organization_id_fkey";

-- DropTable
DROP TABLE "organization_compliances";
