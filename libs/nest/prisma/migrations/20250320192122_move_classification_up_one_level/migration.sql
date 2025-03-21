-- AlterTable
ALTER TABLE "ecoinvent_activities" ADD COLUMN     "ecoinvent_classification_id" TEXT;

-- AddForeignKey
ALTER TABLE "ecoinvent_activities" ADD CONSTRAINT "ecoinvent_activities_ecoinvent_classification_id_fkey" FOREIGN KEY ("ecoinvent_classification_id") REFERENCES "ecoinvent_classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
