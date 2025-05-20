-- AddForeignKey
ALTER TABLE "material_emission_factors" ADD CONSTRAINT "material_emission_factors_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
