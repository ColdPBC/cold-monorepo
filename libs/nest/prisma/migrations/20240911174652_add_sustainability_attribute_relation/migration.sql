-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_sustainability_attribute_id_fkey" FOREIGN KEY ("sustainability_attribute_id") REFERENCES "sustainability_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
